import { Container } from 'react-bootstrap';

/** Свойства. */
type Props<T> = {
    /** Полученные через Promise данные. */
    data: T 
};

/**
 * Элемент по умолчанию для отображения полученны через Promise данных.
 * @param param0 полученные через Promise данные.
 * @returns JSX.Element.
 */
export function DefaultData<T>({ data }: Props<T>) {
    return <Container>data.toString()</Container>;
}
