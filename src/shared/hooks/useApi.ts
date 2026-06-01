import { useState, useEffect } from 'react';

type FetchFunction<T> = () => Promise<T>;

export function useApi<T>(fetchFn: FetchFunction<T>, deps: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetchFn()
            .then((result) => {
                if (!cancelled) {
                    setData(result);
                    setError(null);
                }
            })
            .catch((err: any) => {
                if (!cancelled) {
                    setError(err.message);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, deps);

    return { data, loading, error };
}