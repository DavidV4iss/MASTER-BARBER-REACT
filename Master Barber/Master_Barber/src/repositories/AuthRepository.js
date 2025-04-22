import axios from "axios";
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
}
export default AuthRepository