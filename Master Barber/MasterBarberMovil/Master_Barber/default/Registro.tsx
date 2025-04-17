import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Dimensions, Platform, Button } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from "./Login";
import Home from "./Home";
import { useFonts } from "expo-font";
import { Anton_400Regular } from "@expo-google-fonts/anton";

const { width, height } = Dimensions.get("window");

export default function Register({ navigation }: any) {
    const [currentScreen, setCurrentScreen] = useState("register");
    const navigateTo = (screen: string) => {
        setCurrentScreen(screen);
    };
    const [fontsLoaded] = useFonts({
        Anton: Anton_400Regular,
      });
      
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
            <Text style={styles.subtitle}>Registro de Usuario</Text>
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
            <Text style={styles.footerText}>
                ¿Ya tienes cuenta?{" "}
                <Text style={styles.link} onPress={() => navigateTo('login')} >
                    Inicia sesión
                </Text>
            </Text>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
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
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 300,
        boxShadow: "px   5px 5px  rgba(255, 255, 255, 0.3)",
    },
    title: {
        fontSize: width * 0.08,
        fontFamily: "Anton",
        color: "#fff",
        marginBottom: height * 0.01,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 15,
        fontFamily: "BebasNeue_400Regular",
        color: "#fff",
    },

    input: {
        width: 300,
        height: 50,
        backgroundColor: "#333",
        borderRadius: 8,
        paddingHorizontal: 10,
        color: "#fff",
        marginBottom: height * 0.015,
        borderWidth: 2,
        borderColor: "#fff",
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: "#ffc107",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: "#FDFAF6",
        fontSize: 16,
        fontFamily: "Anton",
        marginBottom: 5,
    },
    footerText: {
        color: "#fff",
        fontSize: 12,
        fontFamily: "Anton",
        marginBottom: 10,
    },
    link: {
        color: "#5495ff",
        textDecorationLine: "underline",
        fontFamily: "Anton",
    },
});
