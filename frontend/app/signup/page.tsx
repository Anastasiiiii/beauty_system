'use client';

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
import { signIn } from "next-auth/react";
import { signupUser } from '@/lib/register';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async (event: any) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await signupUser({ name, email, password });

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.ok) {
        router.push('/');
      } 
    } catch (error: any) {
      alert(error.message || 'Сталася помилка. Спробуйте ще раз.');
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-start md:items-center p-8'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Реєстрація користувача</CardTitle>
          <CardDescription>
            Введіть ім'я, прізвище, електронну пошту та пароль.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form onSubmit={handleSignup} className='w-full'>
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
