import axios from "axios"
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
            const response = await axios.post("http://localhost:8080/CreateBarberos", barbero);
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al obtener los barberos.";
            throw new Error(errorMessage);
        }
    }
    static async UpdateBarberos(id) {
        try {
            const response = await axios.get(`http://localhost:8080/UpdateBarberos/${id}`);
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al obtener los barberos.";
            throw new Error(errorMessage);
        }
    }
    static async DeleteBarberos(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/DeleteBarberos/${id}`);
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al obtener los barberos.";
            throw new Error(errorMessage);
        }
    }

}

export default BarberosRepository