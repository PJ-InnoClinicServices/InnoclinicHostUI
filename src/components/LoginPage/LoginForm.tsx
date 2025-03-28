import React, { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(''); // 'error' can be a string or null


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('All fields are required');
            return;
        }
        console.log('Logged in:', email);
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
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
                >
                    Sign in
                </button>

                <div className="mt-4 text-center">
                    <p>
                        Don't have an account?{' '}
                        <a href="/login/sign-up" className="text-green-600 hover:text-green-800 transition-all duration-300">
                            Sign up!
                        </a>
                    </p>
                    <p>
                        <a href="/forgot-password" className="text-green-600 hover:text-green-800 transition-all duration-300">
                            Forgot password?
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
