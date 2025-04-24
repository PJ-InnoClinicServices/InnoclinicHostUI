import * as React from "react";

interface User {
    id: string;
    userName: string;
    email: string;
}

type Props = {
    user: User;
};

export const ActiveUser = ({ user}: Props) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className=" w-96 backdrop-blur-md">

            <div className="mb-4 text-center">
                <label className="block text-sm font-medium">Username</label>
                <input
                    type="text"
                    disabled
                    value={user.userName}
                    className="w-full p-2 border border-gray-100 rounded-md"
                />
            </div>

            <div className="mb-4 text-center">
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full p-2 border border-gray-100 rounded-md"
                />
            </div>

        </form>
    );
};
