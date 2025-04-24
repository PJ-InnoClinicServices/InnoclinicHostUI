import * as React from 'react';
import { AppointmentStatus } from "../../shared/Enum/AppointmentStatus.ts";
import { Link } from "react-router-dom";

type AppointmentHistoryCardProps = {
    appointment: {
        id: string;
        appointmentDate: string;
        reason: string;
        status: number;
        doctorId: string;
        placeId: string;
    };
    showLink?: boolean;
};

export const AppointmentCard = ({ appointment, showLink = true }: AppointmentHistoryCardProps) => {
    // @ts-ignore
    const statusText = AppointmentStatus[appointment.status as keyof typeof AppointmentStatus] || "Unknown Status";

    return (
        <div className="p-10 border-b border-gray-300 flex items-center justify-between">
            <div>
                <h3 className="font-semibold text-xl italic">{appointment.reason}</h3>
                <p className="text-gray-400 italic">Date: {new Date(appointment.appointmentDate).toLocaleString()}</p>
                <p
                    className={`font-semibold 
                    ${appointment.status === AppointmentStatus.PENDING ? "text-yellow-500" : ""}
                    ${appointment.status === AppointmentStatus.COMPLETED ? "text-green-500" : ""}
                    ${appointment.status === AppointmentStatus.CANCELLED ? "text-red-500" : ""}
                    ${appointment.status === AppointmentStatus.RESCHEDULED ? "text-blue-500" : ""}
                    ${appointment.status !== AppointmentStatus.PENDING &&
                    appointment.status !== AppointmentStatus.COMPLETED &&
                    appointment.status !== AppointmentStatus.CANCELLED &&
                    appointment.status !== AppointmentStatus.RESCHEDULED ? "text-gray-500" : ""}
                `}
                >
                    {statusText}
                </p>
            </div>


            {showLink && (
                <Link
                    to={`/appointments/patient/${appointment.id}`}
                    className="flex items-center justify-center flex-col gap-1 cursor-pointer transition duration-300 hover:text-gray-400 hover:scale-105">
                    <p className="font-semibold">Appointment</p>
                    <p className="text-3xl">➡️</p>
                </Link>
            )}
        </div>
    );
};
