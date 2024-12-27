'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { createAppointment } from '@/lib/requestLib';

const ULTRA_LONG_SELECT_CLASS = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 mb-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50';

export function CreateAppointmentForm({ salons, token, clientId }: { salons: any[], token: string, clientId: string }) {
  const router = useRouter();
  const [openModal, setModal] = useState(false);
  const [masterVariants, setMasterVariants] = useState([]);
  const minDate = (new Date()).toISOString().split('T')[0];

  const handleModal = () => {
    setModal(!openModal)
  };

  const services = [
    'Стрижка',
    'Манікюр',
    'Педикюр',
    'Гаряча завивка',
    'Ламінування вій',
    'Корекція брів'
  ];

  const possibleTimeValues = Array.from({ length: 23 },
    (_, i) => (i % 2 === 0) ?
      `${8 + (i / 2)}:00` :
      `${8 + Math.trunc(i / 2)}:30`);

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    const fields = ['service', 'salon', 'master', 'appointmentDate', 'appointmentTime'];
    const fieldMapping = {};

    for (const field of fields) {
      fieldMapping[field] = event.target[field]?.value;
    }

    const appointmentTime = (new Date(`${fieldMapping.appointmentDate} ${fieldMapping.appointmentTime}Z`)).toISOString();

    const requestData = {
      token,
      clientId,
      serviceName: fieldMapping.service,
      salonId: fieldMapping.salon,
      masterId: fieldMapping.master,
      appointmentTime
    };

    const responseData = createAppointment(requestData);
    if (responseData) {
      setModal(false);
      router.refresh();
    } else {
      alert("Щось пішло не так... Спробуйте ще раз");
    }
  };

  const handleSalonChange = (event: any) => {
    const salonId = event.target.value;
    const foundSalon = salons.find((salon) => salon._id === salonId);

    if (foundSalon?.masters) {
      setMasterVariants(foundSalon.masters);
    }
  }

  return (
    <div>
      <Button size="sm" className="h-8 gap-1 mr-3" onClick={handleModal}>
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Створити запис
        </span>
      </Button>
      {openModal &&
        <div className='fixed top-0 left-0 w-full h-full backdrop-blur flex justify-center items-center'>
          <Card className='w-full max-w-sm'>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle className='text-2xl'>Запис на процедуру</CardTitle>
                <button type='button' onClick={handleModal}>
                  <X />
                </button>
              </div>
              <CardDescription>
                Оберіть бажану процедуру, салон, майстра та запланований час.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <form
                onSubmit={handleFormSubmit}
                className='w-full'
              >
                {/* Процедурки 💅🏻 */}
                <label htmlFor="service" className="block mb-1">Обери процедуру:</label>
                <select className={ULTRA_LONG_SELECT_CLASS} name="service" id="service">
                  <option hidden disabled selected value=''></option>
                  {services.map((value, index) => (
                    <option value={value} key={index}>{value}</option>
                  ))}
                </select>

                {/* Салон */}
                <label htmlFor="salon" className="block mb-1">Обери салон:</label>
                <select className={ULTRA_LONG_SELECT_CLASS} name="salon" id="salon" onChange={handleSalonChange}>
                  <option hidden disabled selected value=''></option>
                  {salons.map((value) => (
                    <option value={value._id} key={value._id}>{value.name} ({value.address})</option>
                  ))}
                </select>

                {/* Майстри та майстрині */}
                <label htmlFor="master" className="block mb-1">Обери майстра:</label>
                <select className={ULTRA_LONG_SELECT_CLASS} name="master" id="master" disabled={!masterVariants.length}>
                  <option hidden disabled selected value=''></option>
                  {masterVariants.map((value: any) => (
                    <option value={value._id} key={value._id}>{value.name}</option>
                  ))}
                </select>

                {/* День прийому */}
                <label htmlFor="appointmentDate" className="block mb-1">Обери день прийому:</label>
                <input className={ULTRA_LONG_SELECT_CLASS} name="appointmentDate" id="appointmentDate" type="date" min={minDate} />

                <label htmlFor="appointmentTime" className="block mb-1">Обери час прийому:</label>
                <select className={ULTRA_LONG_SELECT_CLASS} name="appointmentTime" id="appointmentTime">
                  {possibleTimeValues.map((value, index) => (
                    <option value={value} key={index}>{value}</option>
                  ))}
                </select>

                <Button className='w-full'>Подати заявку на запис</Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      }
    </div>
  );
};


