import * as React from "react";
import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.ts";
import { fetchDoctors } from "../../store/doctorStore/doctorSlice.ts";
import { createAppointment } from "../../Services/appointmentService.ts";
import { ToastContainer, toast } from "react-toastify";

const appointmentReasons = ["Check-up", "Consultation", "Surgery", "Follow-up", "Emergency"];
const appointmentPlaces = [
    { id: "113e2233-e44b-55d6-c901-627614174002", name: "Clinic A" },
    { id: "114e2233-e44b-55d6-c901-627614174002", name: "Clinic B" },
    { id: "115e2233-e44b-55d6-c901-627614174002", name: "Hospital X" }
];

export const BookingPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
    const [selectedDoctor, setSelectedDoctor] = useState<string>("");
    const [selectedReason, setSelectedReason] = useState<string>("");
    const [selectedPlace, setSelectedPlace] = useState<string>("");

    const user = useSelector((state: RootState) => state.user.user) ?? { id: "", userName: "Guest", email: "guest@example.com" };
    const { doctors, loading, error } = useSelector((state: any) => state.doctors);

    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch]);

    const specialties: string[] = Array.from(new Set(doctors.map((doctor: any) => String(doctor.specialty))));
    const filteredDoctors = doctors.filter((doctor: any) => doctor.specialty === selectedSpecialty);

    const isFormValid = date && time && selectedSpecialty && selectedDoctor && selectedReason && selectedPlace;

    const handleBookAppointment = async () => {
        if (!isFormValid) {
            alert("Please fill in all fields!");
            return;
        }


        if (date && time) {
            const combinedDate = new Date(date);
            combinedDate.setHours(time.getHours(), time.getMinutes(), 0, 0);


            const appointmentDto = {
                appointmentDate: combinedDate.toISOString(),
                reason: selectedReason,
                patientId: user.id,
                doctorId: selectedDoctor,
                placeId: selectedPlace,
            };

            try {
                await createAppointment(appointmentDto);
                toast.success("Appointment booked successfully!");
            } catch (error) {
                toast.error("Error booking appointment. Please try again.");
            }
        } else {
            toast.error("Please select both date and time.");
        }
    };

    return (
        <div className="p-5 flex flex-col items-center justify-center gap-5">
            <div className="w-full max-w-md p-5 space-y-5">

                <div>
                    <label htmlFor="appointment-date" className="block text-lg font-semibold mb-2 text-center">Date</label>
                    <div className="bg-gray-100 p-3 rounded-4xl">
                        <Calendar
                            id="appointment-date"
                            value={date}
                            onChange={(e) => setDate(e.value as Date)}
                            showIcon
                            className="w-full text-center font-semibold"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="appointment-time" className="block text-lg font-semibold mb-2 text-center">Estimated Hour</label>
                    <div className="bg-gray-100 p-3 rounded-4xl">
                        <Calendar
                            id="appointment-time"
                            value={time}
                            onChange={(e) => setTime(e.value as Date)}
                            showIcon
                            timeOnly
                            className="w-full text-center font-semibold"
                        />
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="specialty" className="block text-lg font-semibold mb-2 text-center">Select Specialty</label>
                        <div className="bg-gray-100 p-3 rounded-4xl">
                            <select
                                id="specialty"
                                className="w-full p-2 rounded-lg"
                                value={selectedSpecialty}
                                onChange={(e) => setSelectedSpecialty(e.target.value)}
                            >
                                <option value="">Select a specialty</option>
                                {specialties.map((specialty: string) => (
                                    <option key={specialty} value={specialty}>{specialty}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="doctor" className="block text-lg font-semibold mb-2 text-center">Select Doctor</label>
                        <div className="bg-gray-100 p-3 rounded-4xl">
                            <select
                                id="doctor"
                                className="w-full p-2 rounded-lg"
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                                disabled={!selectedSpecialty}
                            >
                                <option value="">Select a doctor</option>
                                {loading ? (
                                    <option disabled>Loading doctors...</option>
                                ) : error ? (
                                    <option disabled>Error loading doctors</option>
                                ) : (
                                    filteredDoctors.map((doctor: any) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.firstName} {doctor.lastName}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <label htmlFor="reason" className="block text-lg font-semibold mb-2 text-center">Reason for Appointment</label>
                        <div className="bg-gray-100 p-3 rounded-4xl">
                            <select
                                id="reason"
                                className="w-full p-2 rounded-lg"
                                value={selectedReason}
                                onChange={(e) => setSelectedReason(e.target.value)}
                            >
                                <option value="">Select a reason</option>
                                {appointmentReasons.map((reason) => (
                                    <option key={reason} value={reason}>{reason}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="place" className="block text-lg font-semibold mb-2 text-center">Place of Appointment</label>
                        <div className="bg-gray-100 p-3 rounded-4xl">
                            <select
                                id="place"
                                className="w-full p-2 rounded-lg"
                                value={selectedPlace}
                                onChange={(e) => setSelectedPlace(e.target.value)}
                            >
                                <option value="">Select a place</option>
                                {appointmentPlaces.map((place) => (
                                    <option key={place.id} value={place.id}>{place.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        onClick={handleBookAppointment}
                        disabled={!isFormValid}
                        className={`w-full p-3 rounded-lg ${isFormValid ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                    >
                        Book an Appointment
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default BookingPage;
