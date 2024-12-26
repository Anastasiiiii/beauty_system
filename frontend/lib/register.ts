const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export interface SignupData {
  name: string;
  email: string;
  password: string;
  userType?: string;
  reviews?: any[];
}

export async function signupUser(data: SignupData) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        userType: data.userType || 'client',
        reviews: data.reviews || [],
      }),
      credentials: 'same-origin',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Помилка реєстрації');
    }

    return response.json();
  } catch (error) {
    console.error('Помилка запиту:', error);
    throw error;
  }
}
