import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useFonts } from "expo-font"; // Importa useFonts
import { Anton_400Regular } from "@expo-google-fonts/anton"; // Importa la fuente Anton

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Cargar la fuente
  const [fontsLoaded] = useFonts({
    Anton: Anton_400Regular,
  });

  if (!fontsLoaded) {
    return null; // Muestra un loader o nada mientras se carga la fuente
  }

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
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