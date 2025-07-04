import { useEffect, useState } from "react";

export const useFetchData = (url: string) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async <T>(body: T, method: 'POST' | 'GET' = 'POST') => {
        return new Promise<{status: number, message: string}>(async (resolve, reject) => {
            setTimeout(() => {
                resolve({status:200, message: "ok"});
            }, 3000);
        });
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: method === 'POST' ? JSON.stringify(body) : undefined,
            });
            if (response.status >= 400  ) {
                return new Error(`HTTP error! status: ${response.status} `);
            }
            return await response.json();
        } catch (err) {
           return Promise.reject(err)
        } finally {
            setLoading(false);
        }
    };

    return { error, loading, fetchData };


};
