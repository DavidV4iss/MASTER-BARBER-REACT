import { showMessage } from "react-native-flash-message";
import API from "../config/api";

class ReservasClientesRepository {
     static async GetReservas () {
         try {
             const response = await API.get("GetReservas");
             return response;
         } catch (error) {
             const errorMessage = error?.response?.data?.message || "Error al obtener las reservas.";
             throw new Error(errorMessage);
         }
    }
    
    static async CrearReservas(reserva) {
        try {
            const response = await API.post("CreateReservas", reserva, { headers: { "Content-Type": "multipart/form-data" } });
            showMessage({
                message: "Reserva creada exitosamente",
                type: "success",
                icon: "success",
                duration: 2000,
            });
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data || "Error al crear la reserva.";
            showMessage({
                message: "Error al crear la reserva",
                description: errorMessage,
                type: "danger",
                icon: "danger",
            });
            throw new Error(errorMessage);
        }
    }

    static async UpdateReservas(id, reservaEditar) {
        try {
            const response = await API.put(`UpdateReservas/${id}`, reservaEditar, { headers: { "Content-Type": "multipart/form-data" } });
            showMessage({
                message: "Reserva actualizada exitosamente",
                type: "success",
                icon: "success",
                duration: 2000
            })
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al actualizar la reserva.";
            throw new Error(errorMessage);
        }
    }

    static async DeleteReservas(id) {
        try {
            const response = await API.delete(`DeleteReservas/${id}`);
            showMessage({
                message: "Reserva eliminada exitosamente",
                type: "success",
                icon: "success",
                duration: 2000
            })
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al eliminar la reserva.";
            showMessage({
                message: "Error al eliminar la reserva",
                description: errorMessage,
                type: "danger",
                icon: "danger",
            })
            throw new Error(errorMessage);
        }
    }
}

export default ReservasClientesRepository;