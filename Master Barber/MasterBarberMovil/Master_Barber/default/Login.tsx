import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Corrección de importación
import { useFonts } from "expo-font";
import { Anton_400Regular } from "@expo-google-fonts/anton";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    Anton: Anton_400Regular,
  });

  if (!fontsLoaded) {
    return null;
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
      <Image
        source={require("../assets/LOGO.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>¡ Bienvenido ! </Text>
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
      <Text style={styles.registrate}>
        ¿No tienes una cuenta?{" "}
        <Text style={styles.link} onPress={() => console.log("Navegar a registro")}>
          Regístrate
        </Text>
      </Text>
      <Text style={styles.olvidopassword} onPress={() => console.log("Navegar a recuperar contraseña")} >¿Olvidaste tu contraseña?</Text>
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
    marginBottom: 50,
    fontFamily: "BebasNeue_400Regular",
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
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
    marginTop: 50,
    marginBottom: 10,

  },
  buttonText: {
    color: "#FDFAF6",
    fontSize: 16,
    fontFamily: "Anton",
    marginBottom: 5,
  },

});