import { useState } from 'react';
import { Container } from 'react-bootstrap';

// local
import { RepositoryCategory } from '@YoSoloPersona/yo-shop-api';
import { List } from './list';
import { Add } from './add';
import { Category } from '@YoSoloPersona/yo-shop-model';

/** Свойства. */
type Props = {
    /** Список категорий товаров. */
    data: Category[];
};

/**  */
export type EditableCategory = Category & {
    /** Признак необходимости удалить категорию. */
    needRemove?: boolean;

    /** Признак необходимости отредактировать категорию. */
    needEdit?: boolean;
};

/**
 *
 * @param param0
 * @returns
 */
export const Main = ({ data }: Props) => {
    const [listCategories, setListCategories] =
        useState<EditableCategory[]>(data);

        const repositoryCategory = new RepositoryCategory({

        });

    // Добавляет новую категорию товаров
    const addCategory = (newCategory: Category) => {
        return (
            repositoryCategory
                // Отправляем категорию на сервер
                .create(newCategory)
                // Если категория была успешно добавлена на сервере,
                // обновляем и в списке
                .then((addedCategory) => {
                    setListCategories([
                        ...listCategories.slice(),
                        addedCategory
                    ]);

                    return addedCategory;
                })
        );
    };

    // Удаляет категорию товаров
    const removeCategory = (removedCategory: Category) => {
        return (
            repositoryCategory
                // Удаляем категорию товаров на сервере
                .delete(removedCategory)
                // После удаления на сервере обновляем список
                .then((count) => {
                    setListCategories(
                        listCategories.filter(
                            (category) => category.name !== removedCategory.name
                        )
                    );

                    return count;
                })
        );
    };

    // Редактирует категорию
    const updateCategory = (
        oldCategory: Category,
        newCategory: Partial<Category>
    ) => {
        return repositoryCategory
            .update(oldCategory, newCategory)
            .then((modifiedCategory) => {
                setListCategories(
                    listCategories.map(
                        (category) =>
                            category === oldCategory
                                ? { ...category, ...newCategory } // Редактируем категорию
                                : category // Остальные оставляем без изменений
                    )
                );

                return modifiedCategory;
            });
    };

    return (
        <Container className="m-2">
            {/* Форма для добавления новой категории. */}
            <Add pushCategory={addCategory} />

            {/* Список категорий. */}
            <List
                listCategories={listCategories}
                removeCategory={removeCategory}
                updateCategory={updateCategory}
            />
        </Container>
    );
};
