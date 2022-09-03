import { useState, useEffect, useCallback } from 'react';

export const useRepository = <T>(promiseData: Promise<T>) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>();
    const [error, setError] = useState();

    useEffect(() => {
        promiseData
            .then((d) => setData(d))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return {
        loading,
        data,
        error
    };
};
