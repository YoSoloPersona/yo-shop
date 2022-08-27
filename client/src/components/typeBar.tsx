import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';

// local
import { RootState, initCategories } from '../reducer';
import { repositoryCategory } from '../repositories/repositoryCategory';

const mapState = (state: RootState) => state.category;

const mapDispatch = { initCategories };

const connector = connect(mapState, mapDispatch);

type Props = {} & ConnectedProps<typeof connector>;

const TypeBar = (props: Props) => {
    useEffect(() => {
        repositoryCategory
            .getTypes()
            .then((newTypesDevice) => {
              props.initCategories(newTypesDevice)
            });
    }, []);

    return (
        <ListGroup>
            {props.listCategories.map((category) => (
                <ListGroup.Item key={category.name}>{category.name}</ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default connector(TypeBar);
