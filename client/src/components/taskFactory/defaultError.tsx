import { Alert } from 'react-bootstrap';

/** Свойства. */
type Props = {
    /** Cообщение возникшей ошибки Promise. */
    message: string 
};

/**
 * Элемент по умолчанию для отображения возникшей ошибки Promise.
 * @param param0 сообщение возникшей ошибки Promise.
 * @returns JSX.Element.
 */
export function DefaultError({ message }: Props) {
    return (
        <Alert className="m-2" variant="danger">
            {message}
        </Alert>
    );
}
