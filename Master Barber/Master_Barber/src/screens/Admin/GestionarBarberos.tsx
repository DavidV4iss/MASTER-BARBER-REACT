import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultLayout from "../../Layouts/DefaultLayout";
import { useNavigation } from '@react-navigation/native';
import { Anton_400Regular } from "@expo-google-fonts/anton";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { useState } from 'react';
import { useFonts } from "expo-font";
import BarberosRepository from '../../repositories/BarberosRepository';



export default function GestionarBarberos() {
    const [fontsLoaded] = useFonts({
        Anton: Anton_400Regular,
        BebasNeue_400Regular,
    });


    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [barberos, setBarberos] = useState([]);
    const [barbero, setBarbero] = useState({

        nombre: "",
        email: "",
        contrasena: "",
        descripcion: "",
    });
    const [barberoEdit, setBarberoEdit] = useState({
        id_usuario: "",
        nombre_usuario: "",
        email: "",
        descripcion: "",
    });



    const handlesubmit = async () => {
        try {
            const response = await BarberosRepository.CreateBarberos(barbero);
            console.log(response);

            navigation.reset({
                index: 0,
                routes: [{ name: 'Gestionar Barberos' }],
            });

            setModalVisible(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handlesubmitEdit = async () => {
        try {
            const datos = {
                nombre: barberoEdit.nombre_usuario,
                email: barberoEdit.email,
                descripcion: barberoEdit.descripcion,
            };

            const response = await BarberosRepository.UpdateBarberos(barberoEdit.id_usuario, datos);
            console.log(response);

            navigation.reset({
                index: 0,
                routes: [{ name: 'Gestionar Barberos' }],
            });

            setModalVisibleEdit(false);
        } catch (error) {
            console.log(error);
        }
    };


    const handleChange = (data) => (value) => {
        setBarbero({ ...barbero, [data]: value });
    };

    const handleChangeEdit = (data) => (value) => {
        setBarberoEdit({ ...barberoEdit, [data]: value });
    };

    const fetchBarberos = async () => {
        try {
            const response = await BarberosRepository.GetBarberos();
            setBarberos(response.data);
        } catch (err) {
            console.log("Error al obtener los datos:", err);
        }
    };

    React.useEffect(() => {
        fetchBarberos();
    }, []);

    if (!fontsLoaded) return null;


    const DeleteBarberos = async (id) => {
        try {
            const response = await BarberosRepository.DeleteBarberos(id);
            console.log(response);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Gestionar Barberos' }],
            });
        } catch (error) {
            console.log(error);
        }
    };






    return (
        <DefaultLayout>
            <View style={{ flex: 1, backgroundColor: '#212529', padding: 20 }}>
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name="bars" size={Dimensions.get('window').width * 0.08} color="#ffffff" style={styles.iconBars} />
                    </TouchableOpacity>
                    <Text style={styles.welcomeText}>¡¡BIENVENIDO!!</Text>
                    <Icon name="user-circle" size={Dimensions.get('window').width * 0.08} color="#ffffff" style={styles.iconUser} />
                </View>
                <ScrollView>
                    <Text style={[styles.responsiveText, { marginBottom: 20, marginTop: Dimensions.get('window').height * 0.09 }]}>
                        HOLA, <Text style={{ color: '#dc3545' }}>ADMINISTRADOR</Text> | AQUÍ PODRÁS EDITAR, AÑADIR Y ELIMINAR BARBEROS
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#dc3545',
                            padding: 10,
                            borderRadius: 5,
                            alignSelf: 'flex-end',
                            marginBottom: 20,
                        }}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Añadir</Text>
                    </TouchableOpacity>

                    <View>
                        {barberos.map((barbero, index) => (
                            <View style={styles.card} key={index}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{barbero.nombre_usuario}</Text>
                                    <Text style={styles.cardText}>{barbero.email}</Text>
                                    <Text style={styles.cardText}>{barbero.descripcion}</Text>
                                    <View style={styles.cardActions}>
                                        <TouchableOpacity
                                            style={styles.editButton}
                                            onPress={() => {
                                                setBarberoEdit(barbero);
                                                setModalVisibleEdit(true);
                                            }}
                                        >
                                            <Icon name="pencil" size={16} color="#000000" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => DeleteBarberos(barbero.id_usuario)}
                                        >
                                            <Icon name="trash" size={16} color="#ffffff" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
            {/* ModalAñadir */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Añadir Nuevo Barbero</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre Del Barbero"
                            placeholderTextColor="#ccc"
                            onChangeText={handleChange("nombre")}
                            value={barbero.nombre}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#ccc"
                            onChangeText={handleChange("email")}
                            value={barbero.email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#ccc"
                            onChangeText={handleChange("contrasena")}
                            value={barbero.contrasena}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descripción"
                            placeholderTextColor="#ccc"
                            onChangeText={handleChange("descripcion")}
                            value={barbero.descripcion}
                        />


                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{ color: '#ffffff' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                            >
                                <Text style={{ color: '#ffffff' }} onPress={handlesubmit}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* FIN MODAL AÑADIR */}


            {/* MODAL EDITAR */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleEdit}
                onRequestClose={() => setModalVisibleEdit(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Barbero</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre Del Barbero"
                            placeholderTextColor="#ccc"
                            onChangeText={handleChangeEdit("nombre_usuario")}
                            value={barberoEdit.nombre_usuario}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#ccc"
                            onChangeText={handleChangeEdit("email")}
                            value={barberoEdit.email}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descripción"
                            placeholderTextColor="#ccc"
                            onChangeText={handleChangeEdit("descripcion")}
                            value={barberoEdit.descripcion}
                        />
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisibleEdit(false)}
                            >
                                <Text style={{ color: '#ffffff' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={handlesubmitEdit}
                            >
                                <Text style={{ color: '#ffffff' }}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* FIN MODAL EDITAR */}

        </DefaultLayout>
    )
}

const styles = StyleSheet.create({
    header2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#212529',
    },
    iconBars: {
        marginLeft: Dimensions.get('window').width * 0.07,
        marginTop: Dimensions.get('window').height * 0.02,
    },

    welcomeText: {
        color: '#ffc107',
        fontSize: Dimensions.get('window').width * 0.06,
        textAlign: 'center',
        flex: 1,
        marginTop: Dimensions.get('window').height * 0.03,
        fontFamily: 'BebasNeue_400Regular',
    },
    iconUser: {
        marginRight: Dimensions.get('window').width * 0.07,
        marginTop: Dimensions.get('window').height * 0.02,
    },
    responsiveText: {
        color: '#ffffff',
        fontSize: Dimensions.get('window').width * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#343a40',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden',
    },

    cardImage: {
        width: '100%',
        height: 150,
    },
    cardContent: {
        padding: 15,
    },
    cardTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        color: '#ffffff',
        fontSize: 14,
        marginBottom: 10,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    editButton: {
        backgroundColor: '#ffc107',
        padding: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#343a40',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#212529',
        color: '#ffffff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
})

