import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon from the appropriate library
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Corrección de importación
import { useFonts } from "expo-font";
import { Anton_400Regular } from "@expo-google-fonts/anton";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import axios from "axios";
import Register from "./Registro"; // Asegúrate de que la ruta sea correcta
import OlvidoContraseña from "./OlvidoContraseña";




export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentScreen, setCurrentScreen] = useState("login");
  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };

  const [fontsLoaded] = useFonts({
    Anton: Anton_400Regular,
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  if (currentScreen === 'register') {
    return <Register />;
  }
  if (currentScreen === 'OlvidoContraseña') {
    return <OlvidoContraseña />;
  }


  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/login", { email, password });
      const { token, user } = response.data;

      // Guardar el token en el almacenamiento local
      await AsyncStorage.setItem("authToken", token);
      Alert.alert("Inicio de sesión exitoso", `Bienvenido, ${user.email}`);
      console.log("Token:", token);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Error al iniciar sesión";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="arrow-left" size={Dimensions.get('window').width * 0.05} color="#ffffff" onPress={() => navigateTo('register')} style={{
                      marginTop: Dimensions.get('window').height * 0,
                      marginRight: Dimensions.get('window').width * 0.8,
                      marginBottom: Dimensions.get('window').height * 0.1
                  }} />
      <Text style={styles.title}>¡ Bienvenido ! </Text>
      <Image
        source={require("../assets/LOGO.png")}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>Inicia Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#fff"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.registrate} >
        ¿No tienes una cuenta?{" "}
        <Text style={styles.link} onPress={() => navigateTo('register')}>
          Regístrate
        </Text>
      </Text>
      <Text
        style={styles.olvidopassword}
        onPress={() => navigateTo("OlvidoContraseña")}
      >
        ¿Olvidaste tu contraseña?
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 38,
    fontFamily: "Anton",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 15,
    fontFamily: "BebasNeue_400Regular",
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 25,
    borderRadius: 300,
    boxShadow: "px   5px 5px  rgba(255, 255, 255, 0.3)",
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  registrate: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Anton",
    marginTop: 5,
  },
  link: {
    color: "#5495ff",
    textDecorationLine: "underline",
    fontFamily: "Anton",
  },
  olvidopassword: {
    color: "#5495FF",
    fontSize: 12,
    fontFamily: "Anton",
    marginBottom: 10,
    textDecorationLine: "underline",

  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "#ffc107",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,

  },
  buttonText: {
    color: "#FDFAF6",
    fontSize: 16,
    fontFamily: "Anton",
    marginBottom: 5,
  },

});