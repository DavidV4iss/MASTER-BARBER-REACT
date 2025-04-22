import axios from "axios";
import { getToken } from '../utils/Auth'
class AuthRepository {
    static async registrar(user) {
        try {
            const response = await axios.post("http://localhost:8080/registrar", user);
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al registrar el usuario.";
            throw new Error(errorMessage);
        }
    }

    static async login(user) {
        try {
            const response = await axios.post("http://localhost:8080/login", user);
            console.log(`Respuesta de auth repository: ${JSON.stringify(response)}`);
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al iniciar sesión.";
            throw new Error(errorMessage);
        }
    }

    static async validarToken(token) {
        try {
            if (!token) {
                return null;
            }
            const response = await axios.get("http://localhost:8080/validarToken", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                await AsyncStorage.removeItem('token');
            }
            throw error;
        }
    }
}
export default AuthRepository