import * as React from "react";
import { useNavigate } from "react-router-dom";

type MenuPageCardProps = {
    title: string;
    icon: string;
    route: string;
};

export const MenuPageCard = ({ title, icon, route }: MenuPageCardProps) => {
    const navigate = useNavigate();

    return (
        <div
            className="group w-56 h-56 border rounded-lg shadow-sm hover:shadow-xl flex flex-col items-center cursor-pointer transition-all duration-300 justify-center backdrop-blur-md "
            onClick={() => navigate(route)}
        >
            <span className="text-5xl drop-shadow-lg transition-all duration-300">{icon}</span>
            <h2 className="text-xl font-semibold mt-2 group-hover:text-green-500 transition-all duration-300">{title}</h2>
        </div>
    );
};
