import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { getAppointments } from '@/lib/requestLib';
import { AppointmentList } from './appointment';

export default async function AppointmentsPage() {
  let appointments = [];

  const session = await auth();
  const user = session?.user;

  if (user) {
    appointments = await getAppointments(user.token, user.userType);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Записи</CardTitle>
        <CardDescription>Заплановані записи на послугу/процедуру</CardDescription>
      </CardHeader>
      <CardContent>
        <AppointmentList appointments={appointments} />
      </CardContent>
    </Card>
  );
}
