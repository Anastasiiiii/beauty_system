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
import { CreateAppointmentForm } from './createAppointmentForm';
import { getSalons } from '@/lib/requestLib';

export default async function AppointmentsPage() {
  let appointments = [];

  const session = await auth();
  const user = session?.user;
  const token = user?.token;
  const salons = await getSalons();

  if (user) {
    appointments = await getAppointments(token, user.userType);
  }

  return (
    <Card>
      <div className="flex items-center">
        <CardHeader>
          <CardTitle>Записи</CardTitle>
          <CardDescription>Заплановані записи на послугу/процедуру</CardDescription>
        </CardHeader>

        {user?.userType === 'client' &&
          <div className="ml-auto flex items-center gap-2">
            <CreateAppointmentForm salons={salons} token={token} clientId={user?.id} />
          </div>
        }
      </div>
      <CardContent>
        <AppointmentList appointments={appointments} />
      </CardContent>
    </Card>
  );
}