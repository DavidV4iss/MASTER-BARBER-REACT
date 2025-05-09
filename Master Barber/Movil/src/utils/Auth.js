import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.error('Error al guardar el token:', error);
    }
};

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem('token');
    } catch (error) {
        console.error('Error al obtener el token:', error);
        return null;
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.error('Error al eliminar el token:', error);
    }
};

// Verifica si el token es válido (puedes añadir más lógica aquí)
export const isAuthenticated = async () => {
    const token = await getToken();
    return token !== null;
};