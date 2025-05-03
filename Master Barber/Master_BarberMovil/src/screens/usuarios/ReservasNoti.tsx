import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from "react-native";
import { useFonts } from "expo-font";
import { Anton_400Regular } from "@expo-google-fonts/anton";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import DefaultLayout from "../../Layouts/DefaultLayout";
export default function ReservasNoti() {

    const [fontsLoaded] = useFonts({
            Anton: Anton_400Regular,
            BebasNeue: BebasNeue_400Regular,
        });
    return (
        <DefaultLayout>
            <View style={styles.container}>
                <Text style={styles.tittle}>Reservas notificadas</Text>
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
        color: "#ffc107",
    },
 

})
