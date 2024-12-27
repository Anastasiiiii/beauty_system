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

export async function createAppointment(requestBody: any): Promise<any> {
  const requestUrl = `${BACKEND_API_URL}/api/appointments`;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Report-related
export async function createReport(token: string, report: string): Promise<any> {
  const requestUrl = `${BACKEND_API_URL}/api/reports`;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ token, text: report }),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

//get reports
export async function getReports(token: string): Promise<any[]> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/reports`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch reports:', response.status, response.statusText);
      return [];
    }

    const reports = await response.json();
    console.log('Reports data:', reports);

    return Array.isArray(reports) ? reports : [];
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
}

//get customers
export async function getCustomers(token: string): Promise<any[]> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch users:', response.status, response.statusText);
      return [];
    }

    const users = await response.json();
    console.log('Reports data:', users);

    return Array.isArray(users) ? users : [];
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
}

//get products
export async function getProducts(token: string): Promise<any[]> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch users:', response.status, response.statusText);
      return [];
    }

    const products = await response.json();
    console.log('Reports data:', products);

    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error('Error fetching reports:', error);
    return [];
  }
}

//add products
export async function addProduct(token: string, productData: any): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      console.error('Failed to add product:', response.status, response.statusText);
      return false;
    }

    console.log('Product added successfully');
    return true;
  } catch (error) {
    console.error('Error adding product:', error);
    return false;
  }
}
