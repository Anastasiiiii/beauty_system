import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { auth } from '@/lib/auth';

export default async function MainPage() {
  const session = await auth();
  const user = session?.user;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Домашня сторінка</CardTitle>
        <CardDescription>
          {user ?
            `Вітаємо, ${user.name}! Ваш тип користувача: ${user.userType}` :
            'Вітаємо! Будь-ласка, увійдіть в систему для можливості надання послуг.'
            }
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
