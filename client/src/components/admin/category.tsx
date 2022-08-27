import {
    ChangeEventHandler,
    FormEventHandler,
    useState,
    useEffect
} from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { connect, ConnectedProps } from 'react-redux';
import { Button, Form, Table, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// local
import {
    RootState,
    initCategories,
    pushCategory,
    removeCategory
} from '../../reducer';
import { repositoryCategory } from '../../repositories';

//
const mapState = (state: RootState) => state.category;

//
const mapDispatch = {
    initCategories,
    pushCategory,
    removeCategory
};

const connector = connect(mapState, mapDispatch);

type Props = {} & ConnectedProps<typeof connector>;

const Category = (props: Props) => {
    const { t } = useTranslation();

    const [category, setCategory] = useState('');

    useEffect(() => {
        repositoryCategory
            .getTypes()
            .then((listCategories) => {
                props.initCategories(listCategories);
            })
            .catch((err) => {});
    }, []);

    // Отслеживает изменение наименование категории
    const changeCategory: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCategory(e.currentTarget.value);
    };

    // Добавляет новую категорию
    const addCategory: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (!category) {
            return;
        }

        repositoryCategory
            .pushCategory({ name: category })
            .then((category) => {
                props.pushCategory(category);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Удаляет категорию
    const deleteCategory = (category: Parameters<typeof removeCategory>[0]) => {
        if (!category) {
            return;
        }
        repositoryCategory
            .removeCategory(category)
            .then((countRemoved) => {
                props.removeCategory(category);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
            <Form onSubmit={addCategory}>
                <Form.Group>
                    <Form.Control
                        placeholder={t('admin.category.add.placeholder')}
                        onChange={changeCategory}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit">{t('admin.category.add.button')}</Button>
            </Form>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Название</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listCategories.map((category, i) => [
                        <tr key={category.name}>
                            <td>{++i}</td>
                            <td>{category.name}</td>
                            <td>
                                <Button
                                    onClick={() => {
                                        deleteCategory(category);
                                    }}
                                    variant="outline-secondary"
                                >
                                    <AiFillDelete />
                                </Button>
                            </td>
                        </tr>
                    ])}
                </tbody>
            </Table>
        </Container>
    );
};

export default connector(Category);
