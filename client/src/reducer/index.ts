import { combineReducers } from 'redux';

// local
import { reducer as auth } from './auth';

/**  */
export const rootReducer = combineReducers({
    auth
});

/**  */
export type RootState = ReturnType<typeof rootReducer>;

export { setUserAction, setTokenAction, setAuthAction } from './auth';