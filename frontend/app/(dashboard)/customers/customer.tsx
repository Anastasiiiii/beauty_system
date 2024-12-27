'use client';
import { MailCheck, User } from 'lucide-react';

export function Customer({ customer }: { customer: any }) {
    return (
        <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
            <div className="flex flex-col text-gray-600 mt-2">
                <h3 className="text-gray-600 flex items-center mt-2"><User className="w-5 h-5 mr-2 text-gray-500" />{customer.name}</h3>
                <p className="text-gray-600 flex items-center mt-2"><MailCheck className="w-5 h-5 mr-2 text-blue-500" />{customer.email}</p>
            </div>
        </div>
    );
}

export function CustomerList({ customers }: { customers: any[] }) {
    // Filter customers by userType
    const clients = customers.filter((customer) => customer.userType === 'client');
    const masters = customers.filter((customer) => customer.userType === 'master');
    const managers = customers.filter((customer) => customer.userType === 'manager');
    const administrators = customers.filter((customer) => customer.userType === 'administrator');

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Clients section */}
            {clients.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Клієнти</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clients.map((customer) => (
                            <Customer key={customer._id} customer={customer} />
                        ))}
                    </div>
                </div>
            )}

            {/* Masters section */}
            {masters.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Майстри</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {masters.map((customer) => (
                            <Customer key={customer._id} customer={customer} />
                        ))}
                    </div>
                </div>
            )}

            {/* Managers section */}
            {managers.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Менеджери</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {managers.map((customer) => (
                            <Customer key={customer._id} customer={customer} />
                        ))}
                    </div>
                </div>
            )}


            {/* Administrator section */}
            {administrators.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Адміністратори</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {administrators.map((customer) => (
                            <Customer key={customer._id} customer={customer} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
