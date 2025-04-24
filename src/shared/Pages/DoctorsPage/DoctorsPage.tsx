import * as React from "react";
import { DoctorsCardsList } from "../../../components/DoctorPage/DoctorsCardsList.tsx";

const DoctorsPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <DoctorsCardsList />
        </div>
    );
};

export default DoctorsPage;
