import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const requestBody = JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          });

          const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          };

          // Send login request to the local server
          const response = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
            method: 'POST',
            headers,
            body: requestBody,
            credentials: 'same-origin'
          });

          // Check if login was successful
          if (response.ok) {
            const responseData = await response.json();
            const cookies = response.headers.getSetCookie();

            const token = cookies
              .find((cookie) => cookie.startsWith('Authentication'))
              ?.match(/Authentication=([^;]+);/)?.[1];

            const { name, email, userType } = responseData;

            // Return user data to store in the session
            return {
              id: responseData._id,
              name,
              email,
              userType,
              token
            };
          }
          return null;
        } catch (error: any) {
          console.error('Login failed', error.response?.data || error.message);
          return null;
        }
      },
    }),
  ],

  // Callbacks to handle session and token management
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add tokens to the JWT if available
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      // Pass additional user info to the session object
      if (token.user) {
        session.user = token.user;
      }

      return session;
    },
  },

  // Custom pages for login
  pages: {
    signIn: '/login',
  },

  session: {
    // Use JWT for managing sessions
    strategy: 'jwt',
  },

  // Turn on debug mode for easier development
  debug: true,

  // Trust the host
  trustHost: true
});
