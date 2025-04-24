import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../shared/store/doctorStore/doctorSlice.ts';
import { DoctorCard } from './DoctorCard';
import { useEffect } from "react";
import { AppDispatch } from '../../shared/store/store.ts';
import { Spinner } from "../../shared/Components/Spinner.tsx";

export const DoctorsCardsList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { doctors, loading, error } = useSelector((state: any) => state.doctors);
    const [selectedSpecialty, setSelectedSpecialty] = React.useState<string>('');


    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch]);


    const filteredDoctors = selectedSpecialty
        ? doctors.filter((doctor: any) => doctor.specialty === selectedSpecialty)
        : doctors;

    // @ts-ignore
    const specialties:string[] = [...new Set(doctors.map((doctor: any) => doctor.specialty))];

    if (loading || error) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Spinner loading={true} />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center p-10 border-b border-gray-300 w-[90vw]">
                <p className="font-semibold text-xl">Found {filteredDoctors.length} doctors</p>
                <div>
                    <label htmlFor="specialty" className="mr-2 text-blue-500">Filter by Specialty</label>
                    <select
                        id="specialty"
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="border p-2 rounded-md text-blue-500 border-blue-500"
                    >
                        <option value="">All Specialties</option>
                        {specialties.map((specialty, index) => (
                            <option key={index} value={specialty}>
                                {specialty}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {filteredDoctors.map((doctor: any) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};
