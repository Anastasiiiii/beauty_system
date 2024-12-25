import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function AppointmentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Записи</CardTitle>
        <CardDescription>Заплановані записи на послугу/процедуру</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
