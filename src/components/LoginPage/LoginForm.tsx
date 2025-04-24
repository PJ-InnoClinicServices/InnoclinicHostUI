import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {fetchUser, login} from "../../shared/store/userStore/userSlice";
import { RootState, AppDispatch } from "../../shared/store/store";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); // 🔹 Hook do przekierowania
    const { user, loading, error } = useSelector((state: RootState) => state.user);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password })).then((result) => {
            if (login.fulfilled.match(result)) {
                dispatch(fetchUser());
            }
        });
    };

    useEffect(() => {
        if (user) {
            navigate("/menu");
        }
    }, [user, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-center">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Email"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2 text-center">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Password"
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-all duration-300"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Sign in"}
                </button>

                <div className="mt-4 text-center">
                    <p>
                        Don't have an account?{' '}
                        <a href="/login/sign-up" className="text-green-600 hover:text-green-800 transition-all duration-300">
                            Sign up
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
