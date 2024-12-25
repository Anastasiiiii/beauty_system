import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signIn } from '@/lib/auth';

export default function LoginPage() {
  const handleLogin = async (event: any) => {
    'use server';

    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    await signIn('credentials', {
      email,
      password,
      redirect: true
    });
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
            action={handleLogin}
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
