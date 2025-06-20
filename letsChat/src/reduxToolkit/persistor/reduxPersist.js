import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

export const persistAuthReducer = (authReducer) => {
    const persistConfig = {
        key: 'auth',
        storage: AsyncStorage,
        whitelist: ['user']
    }
    return persistReducer(persistConfig, authReducer);
}