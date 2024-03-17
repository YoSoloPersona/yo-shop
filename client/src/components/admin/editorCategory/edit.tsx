import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GrUpdate } from 'react-icons/gr';
import { Category } from '@YoSoloPersona/yo-shop-model';

// local
import { useInput } from '../../../hooks/useInput';
import { Task } from '../../task';
import { EditableCategory } from './main';

type Props = {
    updateCategory: (
        oldCategory: Category,
        newCategory: Partial<EditableCategory>
    ) => Promise<Category>;
};

export const Edit = ({ updateCategory }: Props) => {
    const { t } = useTranslation();
    const nameProps = useInput('');
    const [needUpdate, setNeedUpdate] = useState(false); // Признак неоходимости отправки новой категории на сервер

    // Закрывает данные об отправке
    const closeSendInfo = () => {
        setTimeout(() => {
            setNeedUpdate(false);
        }, 2000);
    };

    const onUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        // Отключаем отправку даннных по умолчанию
        e.preventDefault();
        // Устанавливает признак необходимости отправки данных на сервер
        setNeedUpdate(true);
    };

    // Обрабатывает успешную отправку изменений категории на сервер
    const onUpdateCategorySuccessfull = () => {
        closeSendInfo();
    };

    // Обрабатывает ошибку при отправке изменений категории на сервер
    const onUpdateCategoryError = (message: string) => {
        closeSendInfo();
    };

    return (
        <Form onSubmit={onUpdate}>
            <Form.Group>
                <Form.Control
                    placeholder={t('admin.category.add.placeholder')}
                    {...nameProps}
                />
            </Form.Group>

            <Container className="mt-2 d-flex flex-columns">
                <Button variant="outline-primary" type="submit">
                    {/* <GrUpdate /> */}
                    {t('admin.category.edit.button')}
                </Button>
                0
                {needUpdate ? (
                    <Task
                        task={updateCategory}
                        params={[{ name: nameProps.value }]}
                    />
                ) : (
                    <></>
                )}
            </Container>
        </Form>
    );
};
