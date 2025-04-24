import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentById } from "../../shared/store/appointmentStore/appointmentSlice.ts";
import { AppDispatch, RootState } from "../../shared/store/store.ts";
import { useParams } from "react-router-dom";
import { AppointmentReview } from "./AppointmentReview.tsx";
import { AppointmentDetailsDoctorCard } from "./AppointmentDetailsDoctorCard.tsx";
import { AppointmentCard } from "./AppointmentCard.tsx";

export const AppointmentDetailsForPatient = () => {
    const { appointmentId } = useParams<{ appointmentId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const appointment = useSelector((state: RootState) => state.appointments.appointments[0]);
    const loading = useSelector((state: RootState) => state.appointments.loading);
    const error = useSelector((state: RootState) => state.appointments.error);
    const doctorId = appointment?.doctorId;

    useEffect(() => {
        if (appointmentId) {
            dispatch(fetchAppointmentById(appointmentId));
        } else {
            console.log("Appointment ID is undefined");
        }
    }, [dispatch, appointmentId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col p-10 items-center min-w-[50vw]">
            {appointment ? (
                <div>
                    <AppointmentCard appointment={appointment} showLink={false} />
                </div>
            ) : (
                <div>No appointment found</div>
            )}
            <AppointmentDetailsDoctorCard doctorId={doctorId} />
            {appointmentId ? <
                AppointmentReview
                appointmentId={appointmentId}
                doctorId={doctorId}
            /> : null}
        </div>
    );
};
