import * as React from 'react';
import {TopNavbarItem} from "./TopNavbarItem";
import {LoginRegisterButtons} from "./LoginRegisterButtons";

type Props = {

};
export const TopNavbar = (props: Props) => {

    const navbarItems = ["Home", "About", "Contact"];

    return (
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center px-10 py-3">
            <h1 className="font-bebas text-2xl cursor-pointer">Inno<span className="text-green-500" >Clinic</span></h1>
        <div className="flex  items-center justify-center gap-5">
            {navbarItems.map((item, index) => (
                <TopNavbarItem key={index} text={item} />
            ))}
        </div>
            <LoginRegisterButtons></LoginRegisterButtons>
</div>
    );
};