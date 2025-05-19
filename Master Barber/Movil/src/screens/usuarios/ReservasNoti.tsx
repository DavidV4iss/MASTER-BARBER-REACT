import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import { useFonts } from "expo-font";
import { Anton_400Regular } from "@expo-google-fonts/anton";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import DefaultLayout from "../../Layouts/DefaultLayout";
import ReservasClientesRepository from "../../repositories/ReservasClientesRepository";
export default function ReservasNoti() {
    const [user, setUser] = useState("");
    const [notificaciones, setNotificaciones] = useState("");
    const [fontsLoaded] = useFonts({
        Anton: Anton_400Regular,
        BebasNeue: BebasNeue_400Regular,
    });

    return (
        <DefaultLayout>
            <View style={styles.container}>
                <Text style={styles.tittle}>Reservas notificadas</Text>
                <View style={styles.cardNotificacion}>
                    <Text style={styles.Texto}>Hola USUARIO 1, te informamos que el estado de tu reserva ha sido actualizado:</Text>
                    <Text style={styles.detallesReserva}>Estado:</Text>
                    <Text style={styles.detallesReserva}>Servicio:</Text>
                    <Text style={styles.detallesReserva}>Fecha y hora:</Text>
                    <TouchableOpacity style ={styles.button} onPress={() => Alert.alert("Reserva eliminada")}>
                        <Text style={styles.textButton}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DefaultLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#212529",
        alignContent: "center",
        alignItems: "center",
    },
    tittle: {
        marginTop: 40,
        marginBottom: 30,
        textAlign: "center",
        fontSize: 34,
        fontFamily: "BebasNeue",
        color: "#dc3545",
    },
    cardNotificacion: {
        backgroundColor: "#343a40",
        width: "90%",
        height: 200,
        borderEndColor: "#dc3545",
        borderEndWidth: 5,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,

    },
    Texto: {
        fontSize: 20,
        fontFamily: "BebasNeue",
        color: "#ffc107",
        marginBottom: 10,
        
    },
    detallesReserva: {
        fontSize: 14,
        fontFamily: "Anton",
        color: "#d3d3d3",
    },
    button: {
        width: "35%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dc3545",
        borderRadius: 5,
        padding: 10,
        marginLeft: 190,
        position: "absolute",
        bottom: 10,
    },
    textButton: {
        color: "#ffffff",
        fontSize: 16,
        fontFamily: "Anton",
    },


})
