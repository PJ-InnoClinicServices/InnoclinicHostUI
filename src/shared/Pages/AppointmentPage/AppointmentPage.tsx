import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { filterAppointmentsByQuery } from '../../store/appointmentStore/appointmentSlice.ts';
import { AppointmentCardsList } from "../../../components/AppointmentsPage/AppointmentCardsList.tsx";
import { AppDispatch } from '../../store/store.ts';
import {useEffect} from "react";

export const AppointmentPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user) ?? { id: "", userName: "Guest", email: "guest@example.com" };
    const { appointments, loading, error } = useSelector((state: RootState) => state.appointments);

    useEffect(() => {
        if (user.id) {
            dispatch(filterAppointmentsByQuery({ 'patientId': user.id }));
        }
    }, [dispatch, user.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-5">
            <AppointmentCardsList appointments={appointments} />
        </div>
    );
};
