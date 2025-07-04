'use client';

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { MESSAGES } from "../helpers/messages";
import { LOGIN_ROUTE } from "../helpers/routes";

type User = {
    name: string;
    email: string;
};

export default function Header({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("session");

        if (stored) {
            try {
                const parsedUser = JSON.parse(stored) as User;
                setUser(parsedUser);
            } catch (error) {
                redirect(LOGIN_ROUTE);
            }
        } else
            redirect(LOGIN_ROUTE);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("session");
        window.location.href = LOGIN_ROUTE;
    };

    return (
        <div>
            <header className="bg-white text-white shadow-md px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-end">
                    {/* User Info */}
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="ml-2 px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                            >
                                {MESSAGES.LOGOUT}
                            </button>
                        </div>
                    ) : (
                        <a
                            href="/login"
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            {MESSAGES.LOGIN}
                        </a>
                    )}
                </div>
            </header>
            {children}
        </div>

    );
}
