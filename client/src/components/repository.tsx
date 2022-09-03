import { Container, Spinner, Alert } from 'react-bootstrap';

// local
import { useRepository } from '../hooks/useRepository';

type Props<T> = {
    promiseData: Promise<T>;
    elementLoading?: JSX.Element;
    elementData?: ({ data }: { data: T }) => JSX.Element;
    elementError?: (err: string) => JSX.Element;
};

function DefaultData<T>(props: { data: T }) {
    return <Container>data</Container>;
}

function DefaultError(err: string) {
    return <Alert>{err}</Alert>;
}

export function Repository<T>({
    promiseData,
    elementLoading = <Spinner animation="border" />,
    elementData = DefaultData,
    elementError = DefaultError
}: Props<T>) {
    const { loading, data, error } = useRepository(promiseData);

    if (loading) {
        return elementLoading;
    }

    if (data) {
        return elementData({ data });
    }

    if (error) {
        return elementError(error);
    }

    return <div>Repository</div>
}
