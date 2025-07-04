import { useEffect, useState } from "react";

export const useFetchData = (url: string) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async <T>(body: T, method: 'POST' | 'GET' = 'POST') => {
        // return new Promise<string>(async (resolve, reject) => {
        //     setTimeout(() => {
        //         resolve('Data fetched successfully');
        //     }, 3000);
        // });
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: method === 'POST' ? JSON.stringify(body) : undefined,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === "string") {
                setError(err);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return { error, loading, fetchData };


};
