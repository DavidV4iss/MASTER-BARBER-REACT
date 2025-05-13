import { showMessage } from "react-native-flash-message";
import API from "../config/api";

class PerfilRepository {
    static async traerUsuarios(email) {
        try {
            const response = await API.get("traerUsuarios", { params: { email } });
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al obtener los usuarios.";
            throw new Error(errorMessage);
        }
    }


    static async actualizarUsuario(email, formData) {
        return API.put(`actualizarUsuario/${email}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }



}

export default PerfilRepository;