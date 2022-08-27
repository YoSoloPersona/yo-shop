import { combineReducers } from 'redux';

// local
import { reducer as auth } from './auth';
import { reducer as category } from './category';

/**  */
export const rootReducer = combineReducers({
    auth,
    category
});

/**  */
export type RootState = ReturnType<typeof rootReducer>;

export { setUserAction } from './auth';
export { initCategories, pushCategory, removeCategory } from './category';