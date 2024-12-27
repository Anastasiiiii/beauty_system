import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CustomerList } from './customer';
import { getCustomers } from '@/lib/requestLib';
import { auth } from '@/lib/auth';

export default async function CustomersPage() {
  const session = await auth();
  const token = session?.user?.token;
  const customers = await getCustomers(token);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Користувачі</CardTitle>
        <CardDescription>Список користувачів</CardDescription>
      </CardHeader>
      <CardContent>
        <CustomerList customers={customers} />
      </CardContent>
    </Card>
  );
}
