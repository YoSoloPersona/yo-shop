import { useState, useEffect } from 'react';

/**
 * Фук для выполнения промисов.
 * @param task выполняемый промис.
 * @param params параметры передаваемые промису.
 * @returns хук.
 */
export const useTask = <T>(task: (...params: any[]) => Promise<T>, params?: any[]) => {
    const [loading, setLoading] = useState(true);   // Обозначаем этап загрузки
    const [data, setData] = useState<T>();          // Для передачи загруженных данных
    const [error, setError] = useState<string>();   // Для передачи ошибки в случае возникновения

    useEffect(() => {
        // Запускаем промис
        task(...(params || [])) 
            // После получения данных передаём их через стейт
            .then((data) => setData(data))
            // Отлавливаем ошибки
            .catch((err) => setError(err.response?.data.message ||  err.message))
            // После получения данных или возникновения ошибки информируем об окончании работы промиса
            .finally(() => setLoading(false));
    }, []);

    return {
        loading,
        data,
        error
    };
};
