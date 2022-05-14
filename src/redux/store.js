import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import favReducer from "./reducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['favorites']
};

const rootReducer = combineReducers({
    favReducer: persistReducer(persistConfig, favReducer)
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
