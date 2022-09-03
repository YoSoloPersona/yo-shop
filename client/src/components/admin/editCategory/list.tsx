import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';

import { Button, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// local
import { repositoryCategory } from '../../../repositories';
import { Category } from '../../../../../server/src/models';
import { Repository } from '../../repository';

type Props = {
    listCategories: Category[];
};

/**
 * Компонент для работы с категориями товаров.
 * @param props
 * @returns
 */
export const List = ({ listCategories }: Props) => {
    const { t } = useTranslation();
    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t('admin.category.list.columns.name')}</th>
                    <th>{t('admin.category.list.columns.action')}</th>
                </tr>
            </thead>
            <tbody>
                {listCategories.map((category, i) => [
                    <tr key={category.name}>
                        <td>{++i}</td>
                        <td>{category.name}</td>
                        <td>
                            {/* Редактировать категорию */}
                            <Button
                                onClick={() => {
                                    //editCategory(category);
                                }}
                                variant="outline-primary"
                            >
                                <AiOutlineEdit />
                            </Button>
                            <div className="vr"></div>
                            {/* Удалить категорию */}
                            <Button
                                onClick={() => {
                                    //deleteCategory(category);
                                }}
                                variant="outline-primary"
                            >
                                <AiFillDelete />
                            </Button>
                        </td>
                    </tr>
                ])}
            </tbody>
        </Table>
    );
};
