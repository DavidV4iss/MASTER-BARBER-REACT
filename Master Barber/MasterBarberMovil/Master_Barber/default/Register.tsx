import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import axios from "axios";

export default function Register({ navigation }: any) {
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        email: '',
        nit: '',
        telefono: '',
        contraseña: '',
        confirmar_contraseña: ''
    });

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (formData.contraseña !== formData.confirmar_contraseña) {
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await axios.post("http://10.0.2.2:8080/registrar", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            }); // Cambiar 10.0.2.2 por la IP de tu máquina si usas un dispositivo físico
            if (response.status === 200) {
                Alert.alert("Cuenta creada", "Cuenta creada correctamente", [
                    {
                        text: "Continuar",
                        onPress: () => navigation.navigate("Login"),
                    },
                ]);
                setFormData({
                    nombre_usuario: '',
                    email: '',
                    nit: '',
                    telefono: '',
                    contraseña: '',
                    confirmar_contraseña: ''
                });
            }
        } catch (error: any) {
            console.error("Error al registrar:", error);
            const errorMessage = error.response?.data || "Error al registrar el usuario";
            Alert.alert("Error", errorMessage);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/LOGO.png")}
                style={styles.logo}
            />
            <Text style={styles.title}>Registro de Usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de Usuario"
                placeholderTextColor="#fff"
                value={formData.nombre_usuario}
                onChangeText={(value) => handleChange("nombre_usuario", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                value={formData.email}
                onChangeText={(value) => handleChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="NIT"
                placeholderTextColor="#fff"
                value={formData.nit}
                onChangeText={(value) => handleChange("nit", value)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                placeholderTextColor="#fff"
                value={formData.telefono}
                onChangeText={(value) => handleChange("telefono", value)}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#fff"
                value={formData.contraseña}
                onChangeText={(value) => handleChange("contraseña", value)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                placeholderTextColor="#fff"
                value={formData.confirmar_contraseña}
                onChangeText={(value) => handleChange("confirmar_contraseña", value)}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
                ¿Ya tienes cuenta?{" "}
                <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
                    Inicia sesión
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212529",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 75,
    },
    title: {
        fontSize: 24,
        color: "#ffc107",
        marginBottom: 20,
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#333",
        borderRadius: 8,
        paddingHorizontal: 10,
        color: "#fff",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#ffc107",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#212529",
        fontSize: 16,
        fontWeight: "bold",
    },
    footerText: {
        color: "#fff",
        marginTop: 20,
    },
    link: {
        color: "#ffc107",
        fontWeight: "bold",
    },
});
