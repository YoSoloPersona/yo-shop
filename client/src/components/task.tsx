import { useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';

// local
import { useTask } from '../hooks/useTask';

/** Свойства. */
type Props<T> = {
    /** Функция возвращающая промис получения данных. */
    task: (...params: any[]) => Promise<T>;

    /** Параметры для функции. */
    params?: any[];

    /** Елемент для отображения процесса получения данных. */
    ElementLoading?: JSX.Element;

    /** Елемент для отображения полученных данных. */
    ElementData?: ({ data }: { data: T }) => JSX.Element;

    /** Елемент для отображения ошибки. */
    ElementError?: ({ message }: { message: string }) => JSX.Element;

    handlers?: {
        onData?: (data: T) => void;

        onError?: (message: string) => void;
    };
};

/**
 * Элемент по умолчанию для отображения процесса получения данных.
 * @param props
 * @returns
 */
function DefaultData<T>(props: { data: T }) {
    return <Container>data</Container>;
}

/**
 *
 * @param err
 * @returns
 */
function DefaultError({ message }: { message: string }) {
    return (
        <Alert className="m-2" variant="danger">
            {message}
        </Alert>
    );
}

/**
 * Элемент для отображения процесса получения данных, полученных данных и возникающих ошибок.
 * @param param0
 * @returns
 */
export function Task<T>({
    task,
    params,
    ElementLoading = <Spinner className="m-2" animation="border" />,
    ElementData = DefaultData,
    ElementError = DefaultError,
    handlers
}: Props<T>) {
        const { loading, data, error } = useTask(task, params);

    // При выполении промиса отображем спинер по умолчанию
    if (loading) {
        return ElementLoading;
    }

    // После выполнения проимиса отобрдаем полученные данные
    if (data) {
        handlers?.onData?.(data);

        return <ElementData data={data} />;
    }

    // В случае возникновения ошибки отобаржаем её
    if (error) {
        handlers?.onError?.(error);

        return <ElementError message={error} />;
    }

    return <div>Repository</div>;
}
