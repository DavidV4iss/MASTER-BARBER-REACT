import API from "../config/api";
import { getToken } from '../utils/Auth'
class AuthRepository {
    static async registrar(user) {
        try {
<<<<<<< Updated upstream
            const response = await axios.post("http://localhost:8080/registrar", user);
=======
            const response = await API.post("registrar", user);
>>>>>>> Stashed changes
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al registrar el usuario.";
            throw new Error(errorMessage);
        }
    }

    static async login(user) {
        try {
<<<<<<< Updated upstream
            const response = await axios.post("http://localhost:8080/login", user);
=======
            const response = await API.post("login", user);
>>>>>>> Stashed changes
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al iniciar sesión.";
            throw new Error(errorMessage);
        }
    }

    static async validarToken(token) {
        try {
            if (!token) return null;

<<<<<<< Updated upstream
            const response = await axios.get("http://localhost:8080/validarToken", {
=======
            const response = await API.get("validarToken", {
>>>>>>> Stashed changes
                headers: {
                    Authorization: token,
                },
            });

            return response;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                await AsyncStorage.removeItem('token');
            }
            throw error;
        }
    }
}
export default AuthRepository