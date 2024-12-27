import moment from 'moment';

export function AppointmentCalendar({ appointmentsData }: { appointmentsData: any[] }) {
  const workingHours = Array.from({ length: 22 }, (_, i) => 8 * 2 + i).map((i) => {
    const hour = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minutes}`;
  }); // 8:00 AM to 7:00 PM, 30-minute intervals

  const startOfWeek = moment().startOf('week').add(1, 'days'); // Start from Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'days').format('dddd'));

  const getAppointmentsForSlot = (day: string, time: string) => {
    return appointmentsData.filter((appointment) => {
      const appointmentDate = moment(appointment.appointmentTime);
      const appointmentDay = appointmentDate.format('dddd');
      const appointmentTime = appointmentDate.format('H:mm');
      return appointmentDay === day && appointmentTime === time;
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Time</th>
            {weekDays.map((day) => (
              <th key={day} className="border border-gray-300 px-4 py-2 bg-gray-100">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {workingHours.map((time) => (
            <tr key={time}>
              <td className="border border-gray-300 px-4 py-2 text-center bg-gray-50">
                {time}
              </td>
              {weekDays.map((day) => (
                <td key={day} className="border border-gray-300 px-4 py-2 align-top">
                  {getAppointmentsForSlot(day, time).map((appointment, index) => (
                    <div
                      key={appointment._id}
                      className={`mb-2 p-2 ${getColor(index)} rounded shadow-sm text-sm`}
                    >
                      <div className="font-medium">{appointment.serviceName}</div>
                      <div>{appointment.clientId.name}</div>
                      <div>{appointment.appointmentTime}</div>
                      <div className="text-xs text-gray-500">{appointment.clientId.email}</div>
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-orange-100'];
const getColor = (index: number) => colors[index % colors.length];
