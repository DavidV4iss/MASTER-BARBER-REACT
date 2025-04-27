import React, { useState } from 'react';
import { Anton_400Regular } from '@expo-google-fonts/anton';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { useFonts } from 'expo-font';
import Login from './Login';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import DefaultLayout from '../../Layouts/DefaultLayout';

const RestablecerContraseña = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentScreen, setCurrentScreen] = useState("RestablecerContraseña");

  const navigateTo = (screen: string) => {
    setCurrentScreen(screen);
  };

  const [fontsLoaded] = useFonts({
    Anton_400Regular,
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  if (currentScreen === 'login') {
    return <Login />;
  }

  const handlePasswordReset = () => {
    if (newPassword.length < 6) {
      alert('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    alert('Contraseña restablecida con éxito.');
    navigateTo('login');
  };

  return (
    <DefaultLayout>
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>
      <Image style={styles.image} source={require("../../assets/restablecer.png")} />
      <Text style={styles.textinfo}>Asegurate de que tu contraseña sea segura y facil de recordar si deseas agrega caracteres especiales</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        placeholderTextColor="#aaa"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Restablecer Contraseña</Text>
      </TouchableOpacity>
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: "#212529",
        alignContent: "center",
        alignItems: "center",
    },
    title:{
        marginTop: 150,
        marginBottom: 40,
        textAlign: 'center',
        fontSize:34,
        fontFamily: 'BebasNeue_400Regular',
        color: '#ffc107',

    },
    image: {
        width: 150,
        height: 120,
        marginBottom: 15,
        marginTop: 15,
        borderRadius: 600,
        boxShadow: "px 1px 5px 5px  rgba(255, 255, 255, 0.3)",
    },

    textinfo: {
        fontSize: 15,
        fontFamily: 'Anton',
        color: '#ffffff',
        marginBottom: 30,
        marginTop: 50,
        textAlign: 'center',
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
      button: {
        width: 200,
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

export default RestablecerContraseña;