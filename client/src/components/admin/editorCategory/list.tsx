import React from 'react';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';

import { Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// local
import { Category } from '@YoSoloPersona/yo-shop-model';
import { Task } from '../../task';
import { Edit } from './edit';
import { EditableCategory } from './main';

/** Свойства. */
type Props = {
    /** Список категорий товаров. */
    listCategories: EditableCategory[];

    /** Удаляет категорию. */
    removeCategory: (removedCategory: Category) => Promise<number>;

    /** Редактирует категорию. */
    updateCategory: (
        oldCategory: Category,
        newCategory: Partial<EditableCategory>
    ) => Promise<Category>;
};

/**
 * Компонент для отображения списка категорий товаров.
 * @param props
 * @returns
 */
export const List = ({
    listCategories,
    removeCategory,
    updateCategory
}: Props) => {
    const { t } = useTranslation();

    return (
        <Table>
            {/* Заголовок. */}
            <thead>
                <tr>
                    <th>#</th>
                    {/* Колонка для отображения названий категорий товаров. */}
                    <th>{t('admin.category.list.columns.name')}</th>
                    {/* Колонка для кнопок с действия на категориями. */}
                    <th>{t('admin.category.list.columns.action')}</th>
                </tr>
            </thead>

            {/* Список категорий. */}
            <tbody>
                {listCategories.map((category, i) => [
                    <React.Fragment key={category.name}>
                        <tr>
                            <td>{++i}</td>
                            <td>{category.name}</td>
                            <td>
                                {/* Редактировать категорию. */}
                                <Button
                                    onClick={() => {
                                        // Устанавливаем признак необходимости удалить категорию
                                        updateCategory(category, {
                                            needEdit: category.needEdit
                                                ? !category.needEdit
                                                : true
                                        });
                                    }}
                                    variant="outline-primary"
                                >
                                    <AiOutlineEdit />
                                </Button>

                                <div className="vr"></div>

                                {/* Удалить категорию. */}
                                <Button
                                    onClick={() => {
                                        // Устанавливаем признак необходимости удалить категорию
                                        updateCategory(category, {
                                            needRemove: true
                                        });
                                    }}
                                    variant="outline-primary"
                                >
                                    <AiFillDelete />
                                </Button>
                            </td>
                            {/* Если установили признак необходимости удалить категорию. */}
                            {category.needRemove ? (
                                <td>
                                    <Task
                                        task={removeCategory}
                                        params={[category]}
                                    />
                                </td>
                            ) : (
                                <></>
                            )}
                        </tr>
                        {category.needEdit ? (
                            <tr>
                                <td colSpan={3}>
                                    <Edit updateCategory={updateCategory} />
                                </td>
                            </tr>
                        ) : (
                            <></>
                        )}
                    </React.Fragment>
                ])}
            </tbody>
        </Table>
    );
};
