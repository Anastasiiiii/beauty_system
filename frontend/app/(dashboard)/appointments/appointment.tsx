import { MapPin, User, Scissors, Calendar } from 'lucide-react';

const formatDate = (appointmentTime: string) => {
  const date = new Date(appointmentTime);
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
  const isCurrentYear = date.getFullYear() === now.getFullYear();

  // If it's not the current year, show it
  if (!isCurrentYear) {
    options.year = 'numeric';
  }

  const formattedDate = date.toLocaleDateString('uk-UA', options);

  return formattedDate;
};

export function AppointmentCard({ appointment }: { appointment: any }) {
  const { serviceName, appointmentTime, clientId, salonId, masterId } = appointment;

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
      {/* Назва послуги */}
      <h2 className="text-xl font-bold text-gray-800 flex items-center">
        <Scissors className="w-5 h-5 mr-2 text-blue-500" />
        {serviceName}
      </h2>

      {/* Дата та час послуги */}
      <p className="text-gray-600 flex items-center mt-2">
        <Calendar className="w-5 h-5 mr-2 text-red-500" />
        {formatDate(appointmentTime)}
      </p>

      {/* Дані про салон */}
      <div className="mt-3">
        <p className="flex items-center text-gray-700">
          <MapPin className="w-5 h-5 mr-2 text-green-500" />
          <span className="font-medium">{salonId.name}</span>
        </p>
        <p className="flex items-center text-gray-600 ml-7">{salonId.address}</p>
      </div>

      {/* Дані про клієнта */}
      {clientId && typeof clientId === "object" && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <User className="w-5 h-5 mr-2 text-purple-500" />
            Клієнт
          </h3>
          <p className="ml-7 text-gray-700">{clientId.name}</p>
          <p className="ml-7 text-gray-600 text-sm">{clientId.email}</p>
        </div>
      )}

      {/* Дані про майстра */}
      {masterId && typeof masterId === "object" && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold flex items-center text-gray-800">
            <User className="w-5 h-5 mr-2 text-orange-500" />
            Майстер
          </h3>
          <p className="ml-7 text-gray-700">{masterId.name}</p>
          <p className="ml-7 text-gray-600 text-sm">{masterId.email}</p>
        </div>
      )}
    </div>
  );
};

export function AppointmentList({ appointments }: { appointments: any[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};
