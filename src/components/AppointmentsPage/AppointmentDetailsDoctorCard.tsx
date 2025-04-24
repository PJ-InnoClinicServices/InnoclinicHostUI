import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorById } from "../../shared/store/doctorStore/doctorSlice.ts";
import { AppDispatch, RootState } from "../../shared/store/store.ts";
import * as React from "react";

type AppointmentDetailsDoctorProps = {
    doctorId: string;
};

export const AppointmentDetailsDoctorCard = ({ doctorId }: AppointmentDetailsDoctorProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const doctor = useSelector((state: RootState) =>
        state.doctors.doctors.find((doc) => doc.id === doctorId)
    );
    const loading = useSelector((state: RootState) => state.doctors.loading);
    const error = useSelector((state: RootState) => state.doctors.error);

    const [showDetails, setShowDetails] = React.useState(false);
    const toggleDetails = () => {
        setShowDetails((prevState) => !prevState);
    };

    useEffect(() => {
        if (doctorId) {
            dispatch(fetchDoctorById(doctorId));
        }
    }, [dispatch, doctorId]);

    if (loading) {
        return <div>Loading doctor details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }



    return (
        <div>
            {doctor ? (
                <div className="p-10 border-b border-gray-300 backdrop-blur-md flex items-center justify-between gap-10">
                    <div>
                        <h3 className="font-semibold text-xl">{doctor.firstName} {doctor.lastName}</h3>
                        <p className="font-semibold italic">{doctor.specialty}</p>
                    </div>

                    <div className="relative">
                        <button
                            className="text-blue-500 text-sm cursor-pointer transition-all duration-200"
                            onClick={toggleDetails}
                        >
                            {showDetails ? 'Show Less 🔼' : 'Show More  🔽'}
                            <span className={`ml-1 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}>

                    </span>
                        </button>

                        <div
                            className={`transition-opacity duration-300 overflow-hidden ${showDetails ? 'opacity-100' : 'opacity-0'}`}
                            style={{ pointerEvents: showDetails ? 'auto' : 'none' }}
                        >
                            <div className="w-[10rem]">
                                <p className="text-gray-500 italic text-sm">License Number: {doctor.licenseNumber}</p>
                                <p className="text-gray-500 italic text-sm">Phone: {doctor.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-xl font-semibold">No doctor found</div>
            )}
        </div>
    );
};
