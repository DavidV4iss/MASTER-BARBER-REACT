import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultLayout from "../../Layouts/DefaultLayout";
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';



export default function GestionarBarberos() {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

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
                        <View style={styles.card}>
                            <Image
                                source={require('../../assets/deiby.jpg')}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Deiby</Text>
                                <Text style={styles.cardText}>Email: Deiby30@gmail.com</Text>
                                <Text style={styles.cardText}>
                                    Cortes Perfilados, Accesoria En Imagen Buen Uso De Las Maquinas Y El Ambiente
                                </Text>
                                <View style={styles.cardActions}>
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => alert('Editar Deiby')}
                                    >
                                        <Icon name="pencil" size={16} color="#000000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => alert('Eliminar Deiby')}
                                    >
                                        <Icon name="trash" size={16} color="#ffffff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Image
                                source={require('../../assets/nixon.jpg')}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Nixxon</Text>
                                <Text style={styles.cardText}>Email: nixxon30@gmail.com</Text>
                                <Text style={styles.cardText}>
                                    Cortes Perfilados, Accesoria En Imagen Buen Uso De Las Maquinas Y El Ambiente
                                </Text>
                                <View style={styles.cardActions}>
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => alert('Editar Nixxon')}
                                    >
                                        <Icon name="pencil" size={16} color="#000000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => alert('Eliminar Nixxon')}
                                    >
                                        <Icon name="trash" size={16} color="#ffffff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Image
                                source={require('../../assets/jeisson.jpg')}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Jeisson</Text>
                                <Text style={styles.cardText}>Email: jeisson30@gmail.com</Text>
                                <Text style={styles.cardText}>
                                    Cortes Perfilados, Accesoria En Imagen Buen Uso De Las Maquinas Y El Ambiente
                                </Text>
                                <View style={styles.cardActions}>
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => alert('Editar Jeisson')}
                                    >
                                        <Icon name="pencil" size={16} color="#000000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => alert('Eliminar Jeisson')}
                                    >
                                        <Icon name="trash" size={16} color="#ffffff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
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
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#ccc"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#ccc"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Descripción"
                            placeholderTextColor="#ccc"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Imagen Del Barbero"
                            placeholderTextColor="#ccc"
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
                                <Text style={{ color: '#ffffff' }}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* FIN MODAL AÑADIR */}

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
