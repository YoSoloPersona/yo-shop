import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { RiAddCircleLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

// local
import { useInput } from '../../../hooks/useInput';
import { Task } from '../../task';
import { Category } from 'yo-shop-model';

/** Свойства. */
type Props = {
    /** Отправляет новую категорию товаров на сервер и обновляет отображаемый список категорий товаров. */
    pushCategory: (newCategory: Category) => Promise<Category>;
};

/**
 * Форма для добавления новой категории товаров.
 * @param param0 метод для добавления новой категории товаров.
 * @returns
 */
export const Add = ({ pushCategory }: Props) => {
    const { value: name, onChange: onChangeName } = useInput(''); // Имя новой категории
    const [needAdd, setNeedAdd] = useState(false); // Признак неоходимости отправки новой категории на сервер

    const { t } = useTranslation();

    // Закрывает данные об отправке
    const closeSendInfo = () => {
        setTimeout(() => {
            setNeedAdd(false);
        }, 2000);
    };

    const onSend = (e: React.FormEvent<HTMLFormElement>) => {
        // Отключаем отправку даннных по умолчанию
        e.preventDefault();
        // Устанавливает признак необходимости отправки данных на сервер
        setNeedAdd(true);
    };

    // Обрабатывает успешную отправку новой категории на сервер
    const onSendCategorySuccessfull = () => {
        closeSendInfo();
    };

    // Обрабатывает ошибку при отправке новой категории на сервер
    const onSendCategoryError = (message: string) => {
        closeSendInfo();
    };

    return (
        <>
            {/* // Форма для добавления новой категории товаров */}
            <Form
                onSubmit={onSend}
            >
                <Form.Group>
                    {/* Название категории */}
                    <Form.Control
                        placeholder={t('admin.category.add.placeholder')}
                        onChange={onChangeName}
                    ></Form.Control>
                </Form.Group>

                <Container className="d-flex flex-columns">
                    {/* Кнопка для отправки данных на сервер */}
                    <Button
                        className="mt-2"
                        variant="outline-primary"
                        type="submit"
                    >
                        {/* <RiAddCircleLine /> */}
                        {t('admin.category.add.button')}
                    </Button>

                    {/* Отображает процесс отправки данных, если установлен признак необходимости отправки данных. */}
                    {needAdd ? (
                        <Task
                            task={pushCategory}
                            ElementData={({data}) => (<div></div>)}
                            params={[{ name }]}
                            handlers={{
                                onData: onSendCategorySuccessfull,
                                onError: onSendCategoryError
                            }}
                        />
                    ) : (
                        <></>
                    )}
                </Container>
            </Form>
        </>
    );
};
