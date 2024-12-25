import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const { BACKEND_API_URL } = process.env;

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
        console.log({ credentials });

        try {
          const requestBody = JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          });

          // Send login request to the local server
          const response = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
            body: requestBody,
            credentials: 'same-origin'
          });

          // Check if login was successful
          if (response.ok) {
            const responseData = await response.json();
            response.headers.getSetCookie
            // Return user data to store in the session
            return {
              id: responseData._id,
              name: responseData.name,
              email: responseData.email
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
      if (token && token.email === 'string') {
        session.user.email =  token.email;
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
});
