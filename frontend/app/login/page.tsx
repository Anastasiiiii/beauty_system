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

import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (result?.ok) {
      router.push('/');
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-start md:items-center p-8'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Вхід у систему</CardTitle>
          <CardDescription>
            Введіть елекронну пошту та пароль для входу в систему.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form
            onSubmit={handleLogin}
            className='w-full'
          >
            <Input type="email" name="email" placeholder="Email" required />
            <Input type="password" name="password" placeholder="Password" required />
            <Button className='w-full'>Sign in</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
