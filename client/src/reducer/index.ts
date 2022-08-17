import { combineReducers } from 'redux';

// local
import { reducer as auth } from './auth';
import { reducer as device } from './product';

/**  */
export const rootReducer = combineReducers({
    auth,
    device
});

/**  */
export type RootState = ReturnType<typeof rootReducer>;

export { setUserAction, setTokenAction, setAuthAction } from './auth';
export { initTypesDevice, pushTypeDevice } from './product';