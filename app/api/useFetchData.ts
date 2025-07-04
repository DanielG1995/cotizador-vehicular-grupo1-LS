'use client';
import { redirect } from "next/navigation";
import { useState } from "react";
import { LOGIN_ROUTE } from "../helpers/routes";
import { toast } from "sonner";

export const useFetchData = (url: string) => {
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async <T>(body: T, method: 'POST' | 'GET' = 'POST') => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: method === 'POST' ? JSON.stringify(body) : undefined,
            });
             const data = await response.json();
            if (response.status >= 400) {
                if (data?.error?.message)
                    return new Error(data.error.message);
                return new Error(`HTTP error! status: ${response.status} `);
            }
            return data;
        } catch (err) {
            return Promise.reject(err)
        } finally {
            setLoading(false);
        }
    };

    const fetchDataPrivate = async <T>(body: T, method: 'POST' | 'GET' = 'POST') => {
        const session = localStorage.getItem("session");

        try {
            const userSession = session ? JSON.parse(session) : null;
            if (!userSession || !userSession.token) {
                toast.error("You must be logged in to perform this action.");
                redirect(LOGIN_ROUTE)
            }
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
                method,
                headers: {
                    "Authorization": `Bearer ${userSession.token}`,
                    "Content-Type": "application/json",
                },
                body: method === 'POST' ? JSON.stringify(body) : undefined,
            })
            const data = await response.json();
            if (response.status >= 400) {
                if (data?.error?.message)
                    return new Error(data.error.message);
                return new Error(`HTTP error! status: ${response.status} `);
            }
            return data;
        } catch (err) {
            return Promise.reject(err)
        } finally {
            setLoading(false);
        }
    };

    return { loading, fetchData, fetchDataPrivate };


};
