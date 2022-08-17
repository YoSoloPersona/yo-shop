import { Action, Reducer } from 'redux';

// local
import { Category as Model } from '../../../server/src/models';

type Category = Omit<Model, 'id'>;

type Device = {
    listCategories: Category[];
};

type DeviceAction = {
    newCategory?: Category;
    newListCategories?: Category[];
} & Action<'PUSH_CATEGORY' | 'INIT_LIST_CATEGORIES'>;

const initialState: Device = {
    listCategories: []
};

export const pushTypeDevice = (newCategory: Category) => {
    return {
        type: 'PUSH_TYPE_DEVICE',
        newTypeDevice: newCategory
    }
}

export const initTypesDevice = (newListCategories: Category[]) => {
    return {
        type: 'INIT_LIST_CATEGORIES',
        newListCategories
    }
}

export const reducer: Reducer<Device, DeviceAction> = (
    state = initialState,
    { type, newCategory, newListCategories }
) => {
    switch (type) {
        case 'PUSH_CATEGORY':
            return {
                ...state,
                listCategories: [
                    ...state.listCategories.slice(),
                    newCategory || { name: ''}
                ]
            };

        case 'INIT_LIST_CATEGORIES':
            return {
                ...state,
                listCategories: [...(newListCategories || [])]
            };

        default:
            return state;
    }
};
