const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// Salon-related
export async function getSalons(): Promise<any[]> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/salons`);
    const salons = await response.json();

    return salons;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Appointment-related
export async function getAppointments(token: string, userType: string): Promise<any[]> {
  const appendedUserTypes = ['client', 'master'];
  const urlSuffix = appendedUserTypes.includes(userType) ? userType : '';
  const requestUrl = `${BACKEND_API_URL}/api/appointments/${urlSuffix}`;

  const headers = {
    Authorization: `Bearer ${token}`
  };

  try {
    const response = await fetch(requestUrl, {
      headers
    });

    const appointments = await response.json();
    return appointments;
  } catch (error) {
    console.error(error);
    return [];
  }
}

