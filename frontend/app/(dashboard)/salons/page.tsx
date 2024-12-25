import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { SalonList } from './salon';
import { getSalons } from '@/lib/requestLib';

export default async function SalonsPage() {
  const salons = await getSalons();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Салони</CardTitle>
        <CardDescription>Дані про усі салони мережі</CardDescription>
      </CardHeader>
      <CardContent>
        <SalonList salons={salons} />
      </CardContent>
    </Card>
  );
}
