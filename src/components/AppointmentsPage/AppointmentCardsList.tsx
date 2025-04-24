import * as React from 'react';
import { AppointmentCard } from './AppointmentCard.tsx';

type Props = {
    appointments: {
        id: string;
        appointmentDate: string;
        reason: string;
        status: number;
        doctorId: string;
        placeId: string;
    }[];
};

export const AppointmentCardsList = ({ appointments }: Props) => {
    return (
        <div className="space-y-4">
            {appointments.length === 0 ? (
                <p className="text-center text-gray-500">Nie ma wizyt</p>
            ) : (
                appointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
            )}
        </div>
    );
};
