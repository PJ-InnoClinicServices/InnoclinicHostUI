import * as React from "react";
// @ts-ignore
import PlatformImage from "../../../assets/images/HeroSection-PlatformExample.png";
import {useNavigate} from "react-router-dom";

type HeroSectionProps = {
    onImageLoad: () => void;
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onImageLoad }) => {

    const navigate = useNavigate()

    return (
        <section className="min-h-[80vh] flex items-center justify-center flex-wrap animate__animated animate__fadeIn">
            <div className="min-w-[350px] w-[40%] h-[65vh] p-3 flex flex-col items-center justify-center grow">
                <p className="text-3xl md:text-6xl font-bold text-center w-[80%] p-5">
                    Welcome to <br />
                    <span className="text-green-500 italic">trusted</span><br />
                    medical care
                </p>
                <p className="text-center text-lg w-[70%] p-5 drop-shadow-md font-semibold">
                    A modern clinic offering comprehensive medical services.
                    Experienced doctors, advanced diagnostics, and personalized treatment plans.
                </p>
                <button
                    onClick={() => navigate("/menu")}
                    className="text-white text-xl bg-gradient-to-r from-green-600 via-green-600 to-green-600 py-3 px-10 font-bold rounded-md tracking-wider transition-all duration-300 hover:shadow-xl hover:scale-105">
                    Book an Appointment
                </button>
            </div>
            <div className="w-[55%] min-h-[50vh] min-w-[350px] relative flex items-center justify-center">
                <div className="w-[60%] min-w-[300px]">
                    <img
                        src={PlatformImage}
                        alt="Medical clinic"
                        className="w-[60vw] h-auto border border-gray-100 shadow-md rounded-md overflow-hidden bg-white"
                        onLoad={onImageLoad}
                        onError={onImageLoad}
                    />
                </div>
            </div>
        </section>
    );
};
