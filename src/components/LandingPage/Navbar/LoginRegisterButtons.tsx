import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginRegisterButtons: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex gap-3">
            <button
                className="font-semibold text-xl transition-all duration-700 hover:bg-green-500 hover:border-green-500 cursor-pointer border-2 border-green-600 px-2 py-1 rounded-md text-white bg-green-600"
                onClick={() => navigate("/login/sign-in")}
            >
                Sign in
            </button>

            <button
                className="font-semibold text-xl transition-all duration-300 hover:text-gray-500 cursor-pointer"
                onClick={() => navigate("/login/sign-up")}
            >
                Sign up
            </button>
        </div>
    );
};
