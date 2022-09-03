import { useState } from 'react';
import { Container } from 'react-bootstrap';

// local
import { repositoryCategory } from '../../../repositories';
import { Repository } from '../../repository';
import { List } from './list';
import { Add } from './add';
import { Category } from '../../../../../server/src/models';

type Props = {};

/**
 * Компонент для работы с категориями товаров.
 * @param props
 * @returns JSX.Element.
 */
const EditCategory = (props: Props) => {
    const [listCategories, setListCategories] = useState<Category[]>([]);

    const pushCategory = (newCategory: Category) => {
        return repositoryCategory
            .push(newCategory)
            .then((addedCategory) => {
                setListCategories([
                          ...listCategories.slice(),
                          addedCategory
                      ])
                
                return addedCategory
            });
    };

    const removeCategory = (removedCategory: Category) => {
        setListCategories(
            listCategories.filter(
                (category) => category.name !== removeCategory.name
            )
        );
    };

    // Через компонент Repository загружаем данные с сервера и передаём в виде пропса для отображения в дочерний элемент
    return (
        <Repository
            promiseData={repositoryCategory.all()}
            elementData={({ data }: { data: Category[] }) => {
                setListCategories(listCategories);

                return (
                    <Container className="m-2">
                        {/* Форма для добавления новой категории. */}
                        <Add pushCategory={pushCategory} />
                        {/* Список уже бодавленных категорий. */}
                        <List listCategories={data} />
                    </Container>
                );
            }}
        />
    );
};

export default EditCategory;
