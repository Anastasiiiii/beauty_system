'use client';
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (event: any) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch(`${BACKEND_API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          userType: 'client',
          reviews: []
        }),
        credentials: 'same-origin',
      });
  
      if (response.ok) { 
        router.push('/');
      } else {
        const errorData = await response.json();
        console.error('Помилка реєстрації:', errorData);
        alert('Не вдалося зареєструватися. Спробуйте ще раз.');
      }
    } catch (error) {
      console.error('Помилка під час запиту:', error);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-start md:items-center p-8'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Реєстрація користувача</CardTitle>
          <CardDescription>
            Введіть ім'я, прізвище, елекронну пошту та пароль.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form
            onSubmit={handleSignup}
            className='w-full'
          >
            <Input type="name" name="name" placeholder="Ім'я та Прізвище" required />
            <Input type="email" name="email" placeholder="Електронна пошта" required />
            <Input type="password" name="password" placeholder="Пароль" required />
            <Button className='w-full'>Sign up</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
