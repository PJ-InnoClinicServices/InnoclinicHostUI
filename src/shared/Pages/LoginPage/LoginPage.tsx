import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../../../components/LoginPage/LoginForm";
import RegisterForm from "../../../components/LoginPage/RegisterForm";
import HeroImage from "../../../assets/images/Landing-Page-Background.png";
import { Spinner } from "../../Components/Spinner";

export const LoginPage: React.FC = () => {
    const location = useLocation();
    const isSignUp = location.pathname.includes("sign-up");

    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <section className="flex flex-col h-[100vh] items-center justify-between bg relative">
            {loading && (
                <div className="flex items-center justify-center h-screen mt-5">
                    <Spinner loading={true} color="#22c55e" />
                </div>
            )}

            <img
                src={HeroImage}
                className="absolute max-h-full mx-auto opacity-30"
                alt=""
                onLoad={handleImageLoad}
                onError={handleImageLoad}
                style={{ display: loading ? "none" : "block" }}
            />

            {!loading && (
                <div className="flex flex-col items-center justify-center h-screen backdrop-blur-sm">
                    {isSignUp ? <RegisterForm /> : <LoginForm />}
                </div>
            )}
        </section>
    );
};
