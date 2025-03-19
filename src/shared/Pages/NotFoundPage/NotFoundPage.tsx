import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../../../assets/images/Landing-Page-Background.png";

export const NotFoundPage: React.FC = () => {
    return (

        <section className="flex flex-col h-[100vh] items-center justify-between bg relative">
            <img
                src={HeroImage}
                className="absolute max-h-full mx-auto opacity-30"
                alt=""
            />

            <div className="h-fit my-auto p-20 rounded-full flex flex-col items-center justify-center text-center backdrop-blur-md w-fit ">
                <h1 className="text-6xl font-bold text-green-500 ">404</h1>
                <p className="text-xl font-semibold mt-2">Oops! You got lost...</p>
                <Link to="/" className="mt-4 text-green-500 underline italic">
                    Go back home
                </Link>


            </div>


        </section>


    );
};