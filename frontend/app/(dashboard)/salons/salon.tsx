'use client';

import { useState } from "react";

export function Salon({ salon }: { salon: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
      {/* Назва салону */}
      <h2 className="text-xl font-bold text-gray-800">{salon.name}</h2>

      {/* Адреса салону */}
      <p className="text-gray-600 mt-2">{salon.address}</p>

      {/* Кнопка для розгортання списку працівників */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
      >
        {isExpanded ? "Сховати працівників" : "Показати працівників"}
      </button>

      {/* Список працівників */}
      {isExpanded && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Працівники:</h3>
          <ul className="mt-2 space-y-2">
            {salon.masters.map((master: any) => (
              <li
                key={master._id}
                className="p-2 border border-gray-200 rounded-lg bg-gray-50"
              >
                <p className="font-medium text-gray-800">{master.name}</p>
                <p className="text-sm text-gray-600">{master.email}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export function SalonList({ salons }: { salons: any[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {salons.map((salon) => (
          <Salon key={salon._id} salon={salon} />
        ))}
      </div>
    </div>
  );
};
