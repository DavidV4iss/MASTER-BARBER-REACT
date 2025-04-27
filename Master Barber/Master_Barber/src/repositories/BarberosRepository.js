import axios from "axios"
import { showMessage } from "react-native-flash-message";
class BarberosRepository {

    static async GetBarberos() {
        try {
            const response = await axios.get("http://localhost:8080/GetBarberos");
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al obtener los barberos.";
            throw new Error(errorMessage);
        }
    }



    static async CreateBarberos(barbero) {
        try {
            const response = await axios.post("http://localhost:8080/CreateBarberos", barbero, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            showMessage({
                message: "Barbero creado exitosamente",
                type: "success",
                icon: "success",
                duration: 2000,
            });
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data || "Error al crear el barbero.";
            showMessage({
                message: "Error al crear el barbero",
                description: errorMessage,
                type: "danger",
                icon: "danger",
            });
            throw new Error(errorMessage);
        }
    }
    static async UpdateBarberos(id, barberoEdit) {
        try {
            const response = await axios.put(`http://localhost:8080/UpdateBarberos/${id}`, barberoEdit);
            showMessage({
                message: "Barbero actualizado exitosamente",
                type: "success",
                icon: "success",
                duration: 2000
            })
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al actualizar el barbero.";
            throw new Error(errorMessage);
        }
    }
    static async DeleteBarberos(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/DeleteBarberos/${id}`);
            showMessage({
                message: "Barbero eliminado exitosamente",
                type: "success",
                icon: "success",
                duration: 2000
            })
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al eliminar el barbero.";
            showMessage({
                message: "Error al eliminar el barbero",
                description: errorMessage,
                type: "danger",
                icon: "danger",
            })
            throw new Error(errorMessage);
        }
    }

}

export default BarberosRepository