import * as React from "react";
import { MenuPageCard } from "./MenuPageCard";

export const MenuPageCardsList = () => {
    const menuItems = [
        { title: "Home", icon: "🏠", route: "/" },
        { title: "Appointments", icon: "📅", route: "/appointments" },
        { title: "Patients", icon: "🧑‍⚕️", route: "/patients" },
        { title: "Doctors", icon: "🩺", route: "/doctors" },
        { title: "Services", icon: "📋", route: "/services" },
        { title: "Payments", icon: "💳", route: "/payments" },
        { title: "Settings", icon: "⚙️", route: "/settings" }
    ];

    return (

        <div className="flex gap-10 p-10  flex-wrap h-screen w-screen items-center justify-center ">
            {menuItems.map((item) => (
                <MenuPageCard key={item.route} {...item} />
            ))}
        </div>
    );
};
