import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DefaultLayout from '../../Layouts/DefaultLayout'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useFonts } from 'expo-font'
import { Anton_400Regular } from '@expo-google-fonts/anton'
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons'


export default function InicioUsuario() {
    const [activeStep, setActiveStep] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState(false);

    const onNextStep = () => {
        if (!isValid) {
            setErrors(true);
        } else {
            setErrors(false);
        }
    };

    LocaleConfig.locales['es'] = {
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        today: 'Hoy'
    }
    LocaleConfig.defaultLocale = 'es';

    const { logout } = useAuth()
    const [fontsLoaded] = useFonts({
        Anton: Anton_400Regular,
        BebasNeue: BebasNeue_400Regular,
    });

    const [selected, setSelected] = React.useState<string | null>(null);

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const handleLogout = () => {
        logout();
    }

    if (!fontsLoaded) {
        return null;
    }
    return (
        <DefaultLayout>
            <View style={styles.container}>
                <View style={styles.welcome}>
                    <Text style={styles.MB}>Master Barber</Text>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
                                <Icon name="user-circle" style={styles.icon} />
                            </TouchableOpacity >
                            {isDropdownVisible && (
                                <View style={styles.dropdownMenu} >
                                    <TouchableOpacity>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="person-outline" size={15} color="#ffc107"
                                                style={{ marginRight: 5}}
                                            />
                                            <Text style={{ ...styles.dropdownItem, fontFamily: 'BebasNeue_400Regular', color: '#ffc107' }}>Perfil</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Ionicons name="notifications-circle-outline" size={15} color="#ffc107"
                                                style={{ marginRight: 5}}
                                            />
                                            <Text style={{ ...styles.dropdownItem, fontFamily: 'BebasNeue_400Regular', color: '#ffc107' }}>Reservas</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleLogout}>
                                        <View style={{
                                            display: 'flex', flexDirection: 'row', marginBottom: 10,
                                            backgroundColor: '#dc3545', borderRadius: 5,
                                            padding: 'auto',
                                            width: 85,
                                            height: 47,
                                        }}>
                                            <Ionicons name="log-out" size={15} color="#ffffff"
                                                style={{ marginRight: 10, marginLeft: 10, marginTop: 15 }}
                                            />
                                            <Text style={{ ...styles.dropdownItem, fontFamily: 'BebasNeue_400Regular', color: '#ffffff', marginRight: 10 }}>Cerrar sesión</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <Text style={{ color: '#ffffff', fontFamily: 'BebasNeue', fontSize: 14 }}>
                            Cristian
                        </Text>
                    </View>
                </View>
                <Text style={styles.textReserva}>
                    Crea tu reserva ahora
                </Text>


                {/* Aqui va el paso a paso Step */}

                <View style={{ flex: 1 }}>
                    <ProgressSteps
                        activeStepIconBorderColor="#dc3545"
                        activeLabelColor="#dc3545"
                        completedStepIconColor="#ffc107"
                        completedProgressBarColor="#ffc107"
                        activeStepNumColor="#ffffff"
                        completedStepNumColor="#212529"
                        labelColor="#ffffff"
                    >
                        <ProgressStep
                            label="Paso 1"
                            buttonNextText="Continuar"
                            buttonPreviousText="Atrás"
                        >
                            <Text style={styles.textPaso}>
                                Selecciona el servicio que deseas
                            </Text>
                            <View style={styles.cardService}>
                                <View style={styles.card1Service}>
                                    <Text style={styles.cardTextService}>
                                        Corte basico
                                    </Text>
                                    <Image style={styles.cardImage} source={require('../../assets/cortepremium.jpg')} />
                                    <Text style={styles.textDescripcion}
                                        numberOfLines={3}
                                        ellipsizeMode='tail' >
                                        Incluye corte, barba, cejas, lineas dependiendo el gusto y mascarillas si lo deseas
                                    </Text>
                                </View>

                                <View style={styles.card2Service}>
                                    <Text style={styles.cardTextService}>
                                        Corte premium
                                    </Text>
                                    <Image style={styles.cardImage} source={require('../../assets/cortepremium.jpg')} />
                                    <Text style={styles.textDescripcion}
                                        numberOfLines={3}
                                        ellipsizeMode='tail' >
                                        Incluye corte, barba, cejas, lineas dependiendo el gusto y mascarillas si lo deseas
                                    </Text>
                                </View>
                            </View>
                        </ProgressStep>
                        <ProgressStep
                            label="Paso 2"
                            buttonNextText="Continuar"
                            buttonPreviousText="Atrás"
                        >
                            <Text style={styles.textPaso}>
                                Selecciona tu barbero preferido
                            </Text>
                            <View style={styles.cardBarbers}>
                                <View style={styles.card1Barbers}>
                                    <Text style={styles.cardTextBarbers}>
                                        Nixxon
                                    </Text>
                                    <Image style={styles.cardImage} source={require('../../assets/nixon.jpg')} />
                                    <Text style={styles.textDescripcion}
                                        numberOfLines={3}
                                        ellipsizeMode='tail' >
                                        Cortes Perfilados,
                                        Asesoria En Imagen,
                                        Buen Uso De Las Maquinas Y El Ambiente
                                    </Text>
                                </View>

                                <View style={styles.card2Barbers}>
                                    <Text style={styles.cardTextBarbers}>
                                        Deiby
                                    </Text>
                                    <Image style={styles.cardImage} source={require('../../assets/deiby.jpg')} />
                                    <Text style={styles.textDescripcion}
                                        numberOfLines={3}
                                        ellipsizeMode='tail' >
                                        Cortes Perfilados,
                                        Asesoria En Imagen,
                                        Buen Uso De Las Maquinas Y El Ambiente
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.card3Barbers}>
                                <Text style={styles.cardTextBarbers}>
                                    Jeison
                                </Text>
                                <Image style={styles.cardImage} source={require('../../assets/jeisson.jpg')} />
                                <Text style={styles.textDescripcion}
                                    numberOfLines={4}
                                    ellipsizeMode='tail' >
                                    Cortes Perfilados,
                                    Asesoria En Imagen,
                                    Buen Uso De Las Maquinas Y El Ambiente
                                </Text>
                            </View>
                        </ProgressStep>
                        <ProgressStep
                            label="Paso 3"
                            buttonPreviousText="Atrás"
                            buttonFinishText="Reservar"
                        >
                            <Text style={styles.textPaso}>
                                Selecciona la fecha y hora de tu reserva
                            </Text>
                            <View style={styles.calendarDate}>
                                <Calendar
                                    style={{
                                        borderWidth: 2,
                                        borderColor: '#6c757d',
                                        height: 360,
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                        justifyContent: 'center',

                                    }}
                                    current={'2025-04-26'}
                                    onDayPress={day => {
                                        setSelected(day.dateString);

                                    }}
                                    markedDates={{
                                        [selected]: { selected: true, disableTouchEvent: true, selectedColor: '#dc3545' }
                                    }}
                                />
                            </View>
                        </ProgressStep>
                    </ProgressSteps>
                </View>
                {/* Aqui termina el paso a paso Step */}

                <View style={styles.calificaciones}>
                    <Text style={{ color: '#dc3545', fontFamily: 'BebasNeue', fontSize: 20 }}>
                        Calificaciones
                    </Text>
                    <Text style={{ color: '#ffffff', fontFamily: 'BebasNeue', fontSize: 20 }}>
                        ||
                    </Text>
                    <Text style={{ color: '#ffc107', fontFamily: 'BebasNeue', fontSize: 20 }}>
                        Vip
                    </Text>

                </View>
                <AirbnbRating
                    count={5}
                    reviews={['Terrible', 'Malo', 'Regular', 'Bueno', 'Excelente']}
                    defaultRating={0}
                    reviewSize={20}
                    size={25}
                    starContainerStyle={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />
                <Text style={{ color: '#ffc107', fontFamily: 'BebasNeue', fontSize: 20, marginTop: 30 }}>
                    Comentarios
                </Text>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                />
                <TouchableOpacity style={{ backgroundColor: '#dc3545', borderRadius: 10, padding: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ color: '#ffffff', fontFamily: 'BebasNeue', fontSize: 20 }}>Enviar calificacion</Text>
                </TouchableOpacity>
            </View>
        </DefaultLayout>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 2,
        backgroundColor: '#212529',
        marginBottom: 1,
    },
    dropdownMenu: {
        width: 100,
        height: 120,
        position: 'absolute',
        right: Dimensions.get('window').width * 0.2,
        backgroundColor: '#343a40',
        padding: 10,
        borderRadius: 5,
        marginTop: Dimensions.get('window').height * 0.10,

    },
    dropdownItem: {
        color: '#ffffff',
        fontSize: Dimensions.get('window').width * 0.04,
        paddingVertical: 5,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#212529',
    },
    welcome: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        alignItems: 'center',
        width: '100%',
        height: 100,
        marginBottom: 10,
    },
    MB: {
        fontSize: 28,
        fontFamily: 'BebasNeue',
        color: '#ffc107',
        textAlign: 'center',
    },
    icon: {
        fontSize: 34,
        color: '#ffff',
        paddingTop: 10,
        borderRadius: 100,
        padding: 10,
        borderColor: '#ffffff',

    },
    welcomeText: {
        fontSize: 32,
        fontFamily: 'BebasNeue',
        color: '#dc3545',
    },
    welcomeName: {
        fontSize: 28,
        fontFamily: 'BebasNeue',
        color: '#ffc107',
    },
    textReserva: {
        fontSize: 30,
        fontFamily: 'Anton',
        color: '#ffc107',
        marginTop: 20,
    },
    textPaso: {
        fontSize: 20,
        fontFamily: 'BebasNeue',
        color: '#ffffff',
        marginTop: 40,
        textAlign: 'center'

    },
    cardService: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    card1Service: {
        width: 160,
        height: 250,
        borderRadius: 20,
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#ffc107',
        marginRight: 15

    },
    card2Service: {
        width: 160,
        height: 250,
        borderRadius: 20,
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#ffc107',
    },
    cardBarbers: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    card1Barbers: {
        width: 160,
        height: 250,
        borderRadius: 20,
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#dc3545',
        marginRight: 15

    },
    card2Barbers: {
        width: 160,
        height: 250,
        borderRadius: 20,
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#dc3545',
    },
    card3Barbers: {
        width: 160,
        height: 250,
        borderRadius: 20,
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#dc3545',
        marginLeft: 85,
        marginTop: 20
    },
    cardTextService: {
        fontSize: 20,
        fontFamily: 'BebasNeue',
        color: '#dc3545',
        marginTop: 8,
        marginBottom: 8,
    },
    cardTextBarbers: {
        fontSize: 20,
        fontFamily: 'BebasNeue',
        color: '#ffc107',
        marginTop: 8,
        marginBottom: 8,
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 12
    },
    textDescripcion: {
        fontSize: 14,
        fontFamily: 'BebasNeue',
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 25

    },
    calendarDate: {
        fontSize: 20,
        fontFamily: 'BebasNeue',
        color: '#ffffff',
        marginTop: 30,
        width: 300,
    },
    calificaciones: {
        flexDirection: 'row',
        fontSize: 24,
        fontFamily: 'BebasNeue',
        color: '#ffffff',
        marginTop: 30,
        width: 300,
        textAlign: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 300,
        height: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ffffff',
        borderRadius: 15,
        color: '#ffffff',
    },


})
