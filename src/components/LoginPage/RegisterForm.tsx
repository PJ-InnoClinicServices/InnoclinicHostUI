import React, { useState } from 'react';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !repeatPassword) {
            setError('All fields required');
            return;
        }

        if (password !== repeatPassword) {
            setError('Passwords do not match');
            return;
        }
        console.log('Registration successful:', email);

        setEmail('');
        setPassword('');
        setRepeatPassword('');
        setError('');
        setSuccess(true);
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Sign up</h2>


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

                <div className="mb-4">
                    <label htmlFor="repeatPassword" className="block text-gray-700 font-medium mb-2 text-center">
                        Repeat password
                    </label>
                    <input
                        type="password"
                        id="repeatPassword"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Repeat password"
                        required
                    />
                </div>


                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}


                {success && <p className="text-green-500 text-sm text-center mb-4">Registration successful!</p>}

                <button
                    type="submit"
                    className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                >
                    Sign up!
                </button>

                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{' '}
                        <a href="/login/sign-in" className="text-green-600 hover:text-green-800 transition-all duration-300">
                            Sign in
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
