import AuthRepository from "../repositories/AuthRepository";

class AuthService {
    static async registrar(user) {
        try {
            const response = await AuthRepository.registrar(user);
            return response;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Error al registrar el usuario.";
            throw new Error(errorMessage);
        }
    }

    
}

export default AuthService