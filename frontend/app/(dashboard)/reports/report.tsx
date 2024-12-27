'use client';
import { Calendar, MailCheck, User } from 'lucide-react';

const formatDate = (complaintTime: string) => {
    const date = new Date(complaintTime);
    const now = new Date();

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
    const isCurrentYear = date.getFullYear() === now.getFullYear();

    if (!isCurrentYear) {
        options.year = 'numeric';
    }

    return date.toLocaleDateString('uk-UA', options);
};

export function Report({ report }: { report: any }) {

    return (
        <div className="border border-gray-300 rounded-lg shadow-lg p-4 bg-white">
            <div className="flex flex-col text-gray-600 mt-2">
                <p className="text-gray-600 flex items-center mt-2"><User className="w-5 h-5 mr-2 text-gray-500" />{report.userId.name}</p>
                <p className="text-gray-600 flex items-center mt-2"><MailCheck className="w-5 h-5 mr-2 text-blue-500" />{report.userId.email}</p>
            </div>
            <p className="text-gray-600 flex items-center mt-2">
                <Calendar className="w-5 h-5 mr-2 text-red-500" />
                {formatDate(report.createdAt)}
            </p>
            <p className="text-gray-600 mt-2">{report.text}</p>
        </div>
    );
}

export function ReportList({ reports }: { reports: any[] }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <Report key={report._id} report={report} />
                ))}
            </div>
        </div>
    );
}