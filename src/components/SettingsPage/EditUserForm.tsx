// @flow
import * as React from 'react';
import { useState } from 'react';

type User = {
    id: string;
    username: string;
    email: string;
};

type Props = {
    user: User;
    updateUser: (updatedUser: User) => void;
};

export const EditUserForm = ({ user, updateUser }: Props) => {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser({ ...user, username, email });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border border-gray-100 rounded-lg shadow-md w-96 backdrop-blur-md ">
            <div className="mb-4 text-center">
                <label className="block text-sm font-medium">ID</label>
                <input
                    type="text"
                    value={user.id}
                    disabled
                    className="w-full p-2 border  bg-gray-100 text-gray-500 border-gray-100 rounded-md "
                />
            </div>

            <div className="mb-4 text-center">
                <label className="block text-sm font-medium">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-100 rounded-md"
                />
            </div>

            <div className="mb-4 text-center">
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-100 rounded-md"
                />
            </div>

            <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
                Update
            </button>
        </form>
    );
};
