import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Dimensions, Platform, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from "./Login";
import Home from "./Home";

const { width, height } = Dimensions.get("window");

export default function Register({ navigation }: any) {
    const [currentScreen, setCurrentScreen] = useState("register");
    const navigateTo = (screen: string) => {
        setCurrentScreen(screen);
    };
    if (currentScreen === 'login') {
        return <Login />;
    }
    if (currentScreen === 'Home') {
        return <Home />;
    }



    return (
        <View style={styles.container}>
            <Icon name="arrow-left" size={Dimensions.get('window').width * 0.05} color="#ffffff" onPress={() => navigateTo('Home')} style={{
                marginTop: Dimensions.get('window').height * 0.05,
                marginRight: Dimensions.get('window').width * 0.8,
            }} />
            <Text style={styles.title}>¡ Bienvenido ! </Text>
            <Image
                source={require("../assets/LOGO.png")}
                style={styles.logo}
            />
            <Text style={styles.title}>Registro de Usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de Usuario"
                placeholderTextColor="#fff"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="NIT"
                placeholderTextColor="#fff"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                placeholderTextColor="#fff"
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#fff"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                placeholderTextColor="#fff"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
                ¿Ya tienes cuenta?{" "}
                <Text style={styles.link} onPress={() => navigateTo('login')} >
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
        paddingHorizontal: width * 0.05,
    },
    logo: {
        width: width * 0.4,
        height: width * 0.4,
        marginBottom: height * 0.02,
        borderRadius: (width * 0.4) / 2,
    },
    title: {
        fontSize: width * 0.06,
        color: "#ffc107",
        marginBottom: height * 0.02,
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        height: height * 0.06,
        backgroundColor: "#333",
        borderRadius: 8,
        paddingHorizontal: 10,
        color: "#fff",
        marginBottom: height * 0.015,
        borderWidth: 1,
        borderColor: "#fff",
    },
    button: {
        width: "100%",
        height: height * 0.06,
        backgroundColor: "#ffc107",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: height * 0.02,
    },
    buttonText: {
        color: "#212529",
        fontSize: width * 0.045,
        fontWeight: "bold",
    },
    footerText: {
        color: "#fff",
        marginTop: height * 0.02,
    },
    link: {
        color: "#ffc107",
        fontWeight: "bold",
    },
});
