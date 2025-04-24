import * as React from "react";
import { MenuPageCard } from "./MenuPageCard";

export const MenuPageCardsList = () => {
    const menuItems = [
        { title: "Booking", icon: "📅", route: "/booking" },
        { title: "Appointments", icon: "📋", route: "/appointments" },
        { title: "Doctors", icon: "🩺", route: "/doctors" },
        { title: "Settings", icon: "⚙️", route: "/settings" }
    ];

    return (

        <div className="flex flex-col gap-10 p-10 mt-[5rem]  flex-wrap h-screen w-screen items-center justify-center ">

            <div className="flex gap-10 p-10 items-center justify-center flex-wrap ">
                {menuItems.map((item) => (
                    <MenuPageCard key={item.route} {...item} />
                ))}
            </div>

        </div>
    );
};
