import { Anton_400Regular } from '@expo-google-fonts/anton';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { useFonts } from 'expo-font';
import React, { use, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultLayout from '../../Layouts/DefaultLayout';
import useAuth from '../../hooks/useAuth';
import ReservasClientesRepository from '../../repositories/ReservasClientesRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GestionReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingFinal, setIsLoadingFinal] = useState(false);
    const [isLoadingCancel, setIsLoadingCancel] = useState(false);
    const [isLoadingAccept, setIsLoadingAccept] = useState(false);
    const [finalizedReservations, setFinalizedReservations] = useState([]);
    const [barberoId, setBarberoId] = useState("");
    const [email, setEmail] = useState("");
    const [cancelTimers, setCancelTimers] = useState({});


    const fetchReservas = async () => {
        try {
            const response = await ReservasClientesRepository.GetBarberosDisponibles(barberoId);
            setReservas(response.data);
        } catch (err) {
            console.log("Error al obtener las reservas del barbero:", err);
        }   
    }

    const fetchTraerUsuarios = async () => {
        try {
            const response = await ReservasClientesRepository.TraerUsuario(email);
            setClientes(response.data);
            
        } catch (err) {
            console.log("Error al obtener los datos del barbero:", err);
        }   
    }

    const fetchServicios = async () => {
        try {
            const response = await ReservasClientesRepository.GetServicios();
            setServicios(response.data);
        } catch (err) {
            console.log("Error al obtener los servicios:", err);
        }   
    }

    const fetchGetClientes = async () => {
        try {
            const response = await ReservasClientesRepository.GetClientes();
            setClientes(response.data);
        } catch (err) {
            console.log("Error al obtener los clientes:", err);
        }   
    }

    useEffect(() => {
        fetchReservas();
        fetchTraerUsuarios();
        fetchServicios();
        fetchGetClientes();
    }, []);

    const handleAccept = (id) => {
            setIsLoadingAccept(true);
        const response = ReservasClientesRepository.UpdateReservasEstado(id, 'Aceptada');
        response
            .then(response => {
                console.log(response.data);
                setReservas(reservas.map(reserva => reserva.id_reserva === id ? { ...reserva, estado: 'Aceptada' } : reserva));
                // Limpiar temporizador si existe
                if (cancelTimers[id]) {
                    clearTimeout(cancelTimers[id]);
                    setCancelTimers(prev => {
                        const updatedTimers = { ...prev };
                        delete updatedTimers[id];
                        return updatedTimers;
                    });
                }
            })
            .catch(error => {
                console.error('Hubo un error al aceptar la reserva:', error);
            })
            .finally(() => {
                setIsLoadingAccept(false);
            });
    };
    
    const handleCancel = (id) => {
        setIsLoadingCancel(true);
        const response = ReservasClientesRepository.UpdateReservasEstado(id, 'Cancelada');
        response
            .then(response => {
                console.log(response.data);
                setReservas(reservas.map(reserva => reserva.id_reserva === id ? { ...reserva, estado: 'Cancelada' } : reserva));
                // Iniciar temporizador de 1 hora
                const timer = setTimeout(() => {
                    handleDelete(id);
                }, 60 * 60 * 1000);
                setCancelTimers(prev => ({ ...prev, [id]: timer }));
            })
            .catch(error => {
                console.error('Hubo un error al cancelar la reserva:', error);
            })
            .finally(() => {
                setIsLoadingCancel(false);
            });
    };

    const handleDelete = (id) => {
        const response = ReservasClientesRepository.DeleteReservas(id);
        response
            .then(response => {
                console.log(response.data);
                setReservas(reservas.filter(reserva => reserva.id_reserva !== id));
                // Limpiar temporizador si existe
                if (cancelTimers[id]) {
                    clearTimeout(cancelTimers[id]);
                    setCancelTimers(prev => {
                        const updatedTimers = { ...prev };
                        delete updatedTimers[id];
                        return updatedTimers;
                    });
                }
            })
            .catch(error => {
                console.error('Hubo un error al eliminar la reserva:', error);
            });
    };

    const handleFinalize = (id) => {
        setIsLoadingFinal(true);
        const response = ReservasClientesRepository.UpdateReservasEstado(id, 'finalizada');
        response
            .then(response => {
                console.log(response.data);
                setReservas(reservas.map(reserva => reserva.id_reserva === id ? { ...reserva, estado: 'finalizada' } : reserva));
                setFinalizedReservations([...finalizedReservations, id]);
            })
            .catch(error => {
                console.error('Hubo un error al finalizar la reserva:', error);
            })
            .finally(() => {
                setIsLoadingFinal(false);
            });
    };


    const getServiceName = (id) => {
        const servicio = servicios.find(servicio => servicio.id_tipo_servicio === id);
        return servicio ? servicio.nombre : 'Desconocido';
    }

    const getClientName = (id) => {
        const cliente = clientes.find(cliente => cliente.id_cliente === id);
        return cliente ? cliente.nombre : 'Desconocido';

    }






    const [fontsLoaded] = useFonts({
        Anton: Anton_400Regular,
        BebasNeue: BebasNeue_400Regular,
    });
    const { logout } = useAuth()
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
        const handleLogout = () => {
            logout();
    }

    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={{ color: '#ffffff', marginTop: 10 }}>Cargando fuentes...</Text>
            </View>
        );
    }




    return (
        <DefaultLayout>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                                                        <Text style={{ ...styles.dropdownItem, marginBottom: 5, fontFamily: 'BebasNeue_400Regular', color: '#ffc107' }}>Perfil</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={handleLogout}>
                                                        <Text style={{ ...styles.dropdownItem, padding: 10, backgroundColor: '#dc3545', fontFamily: 'BebasNeue_400Regular' }}>Cerrar Sesión</Text>
                                                    </TouchableOpacity>
                
                                                </View>
                                            )}
                                        </View>
                                        <Text style={{ color: '#ffffff', fontFamily: 'BebasNeue', fontSize: 14 }}>
                                            Cristian
                                        </Text>
                                    </View>
                </View>
                <Text style={styles.welcomeText}>
                    BIENVENIDO BARBERO
                    <Text style={styles.welcomeName}> "Nixxon"</Text>
                </Text>
                <Text style={styles.textInfo}>
                    Desde este apartado, podras revisar todos los turnos agendados, aceptarlos, cancelarlos o finalizarlos según sea necesario. Manten tu agenda organizada y asegurate de brindar un mejor servicio a tus clientes
                </Text>
                    <Text style={styles.title}>Gestiona ya tus reservas</Text>
                    <View style={styles.card}>
                    <Image source={require('../../assets/deiby.jpg')} style={styles.image} />
                    <View style={styles.cardText}>
                            <Text style={styles.cardClientServiceFhReserva}>
                            Cliente:
                            <Text style={styles.cardText2}></Text>
                        </Text>
                        <Text style={styles.cardClientServiceFhReserva}>
                            Servicio:
                            <Text style={styles.cardText2}> "Corte Premium"</Text>
                        </Text>
                        <Text style={styles.cardClientServiceFhReserva}>
                            Fecha y hora:
                            <Text style={styles.cardText2}> "2023-08-15, 14:00 pm"</Text>
                        </Text>
                        <Text style={styles.cardClientServiceFhReserva}>
                            Estado de la reserva:
                            <Text style={styles.cardText2}> "Pendiente"</Text>
                        </Text>
                    </View>
                    <View style={styles.botones}>
                        <TouchableOpacity style={styles.button1}>
                            <Text style={styles.styleBtext}>Aceptar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2}>
                            <Text style={styles.styleBtext}>Finalizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button3}>
                            <Text style={styles.styleBtext}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
            </View>
            </ScrollView>
        </DefaultLayout>
    );
};

const styles = StyleSheet.create({
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
    dropdownMenu: {
        position: 'absolute',
        right: Dimensions.get('window').width * 0.2,
        backgroundColor: '#343a40',
        padding: 10,
        borderRadius: 5,
        marginTop: Dimensions.get('window').height * 0.05,
    },
    dropdownItem: {
        color: '#ffffff',
        fontSize: Dimensions.get('window').width * 0.04,
        paddingVertical: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 2,
        backgroundColor: '#212529',
        marginBottom: 1,
    },
    welcomeText: {
        fontSize: 32,
        fontFamily: 'BebasNeue',
        color: '#dc3545',
        marginTop: 30
    },
    welcomeName: {
        fontSize: 28,
        fontFamily: 'BebasNeue',
        color: '#ffc107',
    },
    textInfo: {
        margin: 30,
        fontSize: 15,
        color: '#ffffff',
        marginBottom: 25,
        fontFamily: 'BebasNeue',
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'BebasNeue',
        color: '#ffffff',
        marginTop: 35,
    },
    card: {
        width: 320,
        height: 400,
        borderRadius: 20,
        margin: 30,
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#212529',
        borderWidth: 2,
        borderColor: '#ffffff',
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 10,
        alignSelf: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#6c757d',
    },
    cardText: {
        marginTop: 20,
    },
    cardClientServiceFhReserva: {
        fontSize: 18,
        color: '#ffc107',
        marginLeft: 45,
        fontFamily: 'BebasNeue',
    },
    cardText2: {
        fontSize: 18,
        color: '#ffffff',
    },
    botones: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    button1: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    button2: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    button3: {
        backgroundColor: '#ffc107',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    styleBtext: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default GestionReservas;

function logout() {
    throw new Error('Function not implemented.');
}
