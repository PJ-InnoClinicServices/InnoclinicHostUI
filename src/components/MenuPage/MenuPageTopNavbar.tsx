import * as React from 'react';
import {Link} from "react-router-dom";

export const MenuPageTopNavbar = () => {
    return (
        <div className="p-5  w-[100vw]">
            <Link to="/">
                <h1 className="font-bebas text-2xl cursor-pointer">
                    Inno<span className="text-green-500">Clinic</span>
                </h1>
            </Link>
        </div>
    );
};