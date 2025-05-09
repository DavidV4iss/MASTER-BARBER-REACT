import { showMessage } from "react-native-flash-message";
import API from "../config/api";

class GestionInvRepository {

    static async GetVentas() {
        try {
            const response = await API.get("GetVentas");
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al obtener las ventas.";
            throw new Error(errorMessage);
        }
    }


    static async GuardarVentas(ventasConFecha) {
        try {
            const response = await API.post("GuardarVentas", { ventasConFecha });

            showMessage({
                message: "Venta creada exitosamente",
                type: "success",
                icon: "success",
                duration: 2000,
            });
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data || "Error al crear la venta";
            showMessage({
                message: "Error al crear la venta",
                description: errorMessage,
                type: "danger",
                icon: "danger",
            });
            throw new Error(errorMessage);
        }
    }

    static async RestarInventario(id, cantidad) {
        try {
            const response = await API.put(`RestarInventario/${id}`, { cantidad });

            showMessage({
                message: "Inventario actualizado exitosamente",
                type: "success",
                icon: "success",
                duration: 2000
            })
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al actualizar el producto.";
            throw new Error(errorMessage);
        }
    }

}

export default GestionInvRepository
