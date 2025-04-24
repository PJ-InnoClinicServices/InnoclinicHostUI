import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../shared/store/userStore/userSlice.ts";
import { RootState, AppDispatch } from "../../shared/store/store";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state: RootState) => state.user);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!email || !password || !repeatPassword) {
            setFormError("All fields are required.");
            return;
        }

        if (password !== repeatPassword) {
            setFormError("Passwords do not match.");
            return;
        }

        dispatch(register({ email, password })).then((result) => {
            if (register.fulfilled.match(result)) {
                navigate("/menu");
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
                <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
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
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
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

                <div className="mb-4">
                    <label htmlFor="repeatPassword" className="block text-gray-700 font-medium mb-2">Repeat Password</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Repeat Password"
                        required
                    />
                </div>

                {formError && <p className="text-red-500 text-sm text-center mb-4">{formError}</p>}
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-all duration-300"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Sign Up"}
                </button>

                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{' '}
                        <a href="/login/sign-in" className="text-green-600 hover:text-green-800 transition-all duration-300">
                            Sign in
                        </a>{' '}
                        or{' '}
                        <a href="/" className="text-green-600 hover:text-green-800 transition-all duration-300">
                            go back home
                        </a>.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;