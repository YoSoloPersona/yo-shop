import { Action, Reducer } from 'redux';

// local
import { Category as Model } from '../../../server/src/models';

// Убираем id из типа, он нам не нужен
type Category = Omit<Model, 'id'>;

/**
 * Состояние.
 */
type State = {
    /** Список категорий товаров. */
    listCategories: Category[];
};

// --------
// Действия
// --------

/**
 * Инициализирует список категорий товаров.
 */
type ActionInitCategories = {
    newListCategories?: Category[];
} & Action<'INIT_CATEGORIES'>;

/**
 * Добавляет новую категорию товаров.
 */
type ActionPushCategory = {
    newCategory?: Category;
} & Action<'PUSH_CATEGORY'>;

/** Удаляет категорию. */
type ActionRemoveCategory = {
    removedCategory: Category;
} & Action<'REMOVE_CATEGORY'>;

// --------------
// Фабрики команд
// --------------

/**
 * Добавляет категорию товаров.
 * @param newCategory добавляемая категория товаров.
 * @returns ActionPushCategory команду для добавления новой категории товаров.
 */
export const pushCategory = (newCategory: Category) => {
    return {
        type: 'PUSH_CATEGORY',
        newCategory: newCategory
    };
};

/**
 * Инициализирует список категорий товаров.
 * @param newListCategories список категорий товаров.
 * @returns ActionInitCategories команду для инициализации списка категорий товаров.
 */
export const initCategories = (newListCategories: Category[]) => {
    return {
        type: 'INIT_CATEGORIES',
        newListCategories
    };
};

export const removeCategory = (removedCategory: Category) => {
    return {
        type: 'REMOVE_CATEGORY',
        removedCategory
    };
};

// Начальное состояние.
const initialState: State = {
    listCategories: []
};

/**
 * Редюсер.
 * @param state
 * @param action
 * @returns
 */
export const reducer: Reducer<
    State,
    ActionInitCategories | ActionPushCategory | ActionRemoveCategory
> = (state = initialState, action) => {
    switch (action.type) {
        // Добавляет категорию
        case 'PUSH_CATEGORY':
            return action.newCategory
                ? {
                      ...state,
                      listCategories: [
                          ...state.listCategories.slice(),
                          action.newCategory
                      ]
                  }
                : state;

        // Инициализирует список категорий
        case 'INIT_CATEGORIES':
            return action.newListCategories
                ? {
                      ...state,
                      listCategories: [...(action.newListCategories || [])]
                  }
                : state;

        // Удаляет категорию
        case 'REMOVE_CATEGORY':
            return action.removedCategory
                ? {
                      ...state,
                      listCategories: state.listCategories.filter(
                          (category) =>
                              category.name !== action.removedCategory.name
                      )
                  }
                : state;

        // Текущее состояние
        default:
            return state;
    }
};
