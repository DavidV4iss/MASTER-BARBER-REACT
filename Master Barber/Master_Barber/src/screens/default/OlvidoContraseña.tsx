import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import { useFonts } from "expo-font";
import { Anton_400Regular } from "@expo-google-fonts/anton";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import Login from './Login';
import RestablecerContraseña from "./RestablecerContraseña";


const OlvidoContraseña = () => {

    const [email, setEmail] = useState("");
    const [currentScreen, setCurrentScreen] = useState("OlvidoContraseña");
    const navigateTo = (screen: string) => {
      setCurrentScreen(screen);
    };

    const [fontsLoaded] = useFonts({
      Anton: Anton_400Regular,
      BebasNeue_400Regular,
    });

    if (currentScreen === 'login') {
      return <Login />;
    }
    if (currentScreen === 'RestablecerContraseña') {
      return <RestablecerContraseña />;
    }




  return (

    <View style={styles.container}>
      <Text style={styles.tittle}>¿Olvidaste tu contraseña?</Text>
      <Image style={styles.image} source={require("../../assets/recuperar.png")} /> 
      <Text style={styles.textinfo}>Ingrese su correo electronico para poder enviar un codigo de recuperacion de contraseña</Text>
      <Text style={styles.textinput}>Correo electronico</Text>
      <TextInput
              style={styles.input}
              placeholderTextColor="#fff"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

        <TouchableOpacity style={styles.button1} onPress={() => navigateTo('OlvidoContraseña')}>
        <Text style={styles.buttonText1}>Enviar</Text>
        </TouchableOpacity>

       <View style={styles.codigoContainer}>
        {[...Array(6)].map((_, index) => (
            <TextInput
                key={index}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="numeric"
                textAlign="center"
                placeholderTextColor="#fff"
        />
        ))}
       </View>

       <TouchableOpacity style={styles.button2} onPress={() => navigateTo('RestablecerContraseña')}>
        <Text style={styles.buttonText2}>Continuar</Text>
      </TouchableOpacity>
    </View>


  )
}



const styles = StyleSheet.create({

    container : {
        flex: 1,
        backgroundColor: "#212529",
        alignContent: "center",
        alignItems: "center",
    },
    image: {
        width: 250,
        height: 200,
        alignSelf: 'center',


       },
    tittle:{
        marginTop: 90,
        textAlign: 'center',
        fontSize:34,
        fontFamily: 'BebasNeue_400Regular',
        color: '#ffc107',

    },
    textinfo: {
        fontSize: 15,
        fontFamily: 'Anton',
        color: '#ffffff',
        marginTop: 10,
        paddingHorizontal: 35,
    },
    textinput: {
        fontSize: 12,
        fontFamily: 'Anton',
        color: '#ffffff',
        marginTop: 40,
        marginBottom: 2,
        paddingHorizontal: 35,
    },
    input: {
        width: 270,
        height: 50,
        backgroundColor: "#333",
        borderRadius: 8,
        paddingHorizontal: 10,
        color: "#fff",
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "white",
    },
    button1: {
        width: 150,
        height: 50,
        backgroundColor: "#ffc107",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    buttonText1: {
        color: "#FDFAF6",
        fontSize: 16,
        fontFamily: "Anton",
        marginBottom: 5,
    },
    codigoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        paddingHorizontal: 20,
    },
    codeInput: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#333",
        color: "#",
        fontSize: 20,
        borderWidth: 2,
        borderColor: "#ffc107",
        textAlign: "center",
        marginHorizontal: 2,
    },
    button2: {
        width: 150,
        height: 50,
        backgroundColor: "#008000",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    
    },
    buttonText2: {
        color: "#FDFAF6",
        fontSize: 16,
        fontFamily: "Anton",
        marginBottom: 5,
    },

      
})
export default OlvidoContraseña
