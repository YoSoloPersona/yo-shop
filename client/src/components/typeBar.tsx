import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';

// local
import { RootState, initTypesDevice } from '../reducer';
import { repositoryDevice } from '../repositories/repositoryDevice';

const mapState = (state: RootState) => state.device;

const mapDispatch = { initTypesDevice };

const connector = connect(mapState, mapDispatch);

type Props = {} & ConnectedProps<typeof connector>;

const TypeBar = (props: Props) => {
    useEffect(() => {
        repositoryDevice
            .getTypes()
            .then((newTypesDevice) => {
              console.log(newTypesDevice);
              props.initTypesDevice(newTypesDevice)
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
