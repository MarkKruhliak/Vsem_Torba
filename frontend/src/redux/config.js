import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import {OneProductReducer} from "./slices/OneProductSlice";
import {LoginReducer} from "./slices/LoginSlice";
import {CartReducer} from "./slices/CartSlice";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['LoginReducer']
}

const rootReducer = combineReducers({
    OneProductReducer,
    LoginReducer,
    CartReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export const persistore = persistStore(store)
export default store
