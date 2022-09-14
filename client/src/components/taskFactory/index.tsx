import { Container, Spinner, Alert } from 'react-bootstrap';

// local
import { useTask } from '../../hooks/useTask';
import { DefaultData } from './defaultData';
import { DefaultError } from './defaultError';

/** Свойства. */
type ElementsInfo<T> = {
    /** Елемент для отображения процесса получения данных. */
    ElementLoading?: JSX.Element;

    /** Елемент для отображения полученных данных. */
    ElementData?: ({ data }: { data: T }) => JSX.Element;

    /** Елемент для отображения ошибки. */
    ElementError?: ({ message }: { message: string }) => JSX.Element;
};

type Props<T> = {
    /** Функция возвращающая промис получения данных. */
    task: (...params: any[]) => Promise<T>;

    /** Параметры для функции. */
    params?: any[];

    handlers?: {
        onData?: (data: T) => void;

        onError?: (message: string) => void;
    };
};

/**
 * Элемент для отображения процесса получения данных, полученных данных и возникающих ошибок.
 * @param param0
 * @returns
 */
export function TaskFactory<T>({
    ElementLoading = <Spinner animation="border" />,
    ElementData = DefaultData,
    ElementError = DefaultError
}: ElementsInfo<T>) {
    return ({ task, params, handlers }: Props<T>) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
    };
}
