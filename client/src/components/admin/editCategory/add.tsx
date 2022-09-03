import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { RiAddCircleLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

// local
import { Repository } from '../../repository';
import { Category } from '../../../../../server/src/models';

/**
 * 
 */
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
    const [name, setName] = useState('');               // Имя новой категории
    const [sendData, setSendData] = useState(false);    // Признак неоходимости отправки новой категории на сервер
    const { t } = useTranslation();

    // Отслеживает изменение имени новой категории товаров
    const changeName = (newName: string) => {
        setName(newName);
    };

    return (
        // Форма для добавления новой категории товаров
        <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                // Отключаем отправку даннных по умолчанию
                e.preventDefault();
                // Устанавливает признак необходимости отправки данных на сервер
                setSendData(true);
            }}
        >
            <Form.Group>
                {/* Название категории */}
                <Form.Control
                    placeholder={t('admin.category.add.placeholder')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        changeName(e.currentTarget.value);
                    }}
                >
                </Form.Control>
            </Form.Group>

            <Container className="d-flex flex-columns">
                {/* Кнопка для отправки данных на сервер */}
                <Button
                    className="mt-2"
                    type="submit"
                    variant="outline-primary"
                >
                    <RiAddCircleLine />
                </Button>
                {/* Отображает процесс отправки данных, если установлен признак необходимости отправки данных. */}
                { sendData ? (<Repository promiseData={pushCategory({name, id: 0})} />) : (<></>) }
            </Container>
        </Form>
    );
};
