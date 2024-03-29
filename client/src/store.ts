import { configureStore } from '@reduxjs/toolkit';

// local
// Экспортируем редусеры
import { rootReducer as reducer } from './reducer';

/** Redux хранилище. */
const store = configureStore({ reducer });

export default store;