import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { ReportForm } from './reportForm';

export default async function ComplaintPage() {
  const session = await auth();
  const token = session?.user?.token;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Відгуки</CardTitle>
        <CardDescription>Пропозиції та скарги</CardDescription>
      </CardHeader>
      <CardContent>
        <ReportForm token={token} />
      </CardContent>
    </Card>
  );
}
