import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Anton_400Regular } from "@expo-google-fonts/anton";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { useFonts } from "expo-font";
import useAuth from '../../hooks/useAuth';
import { Picker } from '@react-native-picker/picker';
import InventarioRepository from '../../repositories/InventarioRepository';
import { getBaseURL } from '../../config/api';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { showMessage } from 'react-native-flash-message';
import GestionInvRepository from '../../repositories/GestionInvRepository';



export default function GestionDeInventario() {
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = React.useState('Diario');
    const [inventario, setInventario] = React.useState<any[]>([]);
    const [ventasProcesadas, setVentasProcesadas] = React.useState<any[]>([]);
    const [venta, setVenta] = React.useState<any[]>([]);

    const { logout } = useAuth();

    const [fontsLoaded] = useFonts({
        Anton: Anton_400Regular,
        BebasNeue_400Regular,
    });

    const agregarProducto = (id_producto: number) => {
        setInventario((prevInventario) => {
            const productoInventario = prevInventario.find(item => item.id_producto === id_producto);
            if (!productoInventario || productoInventario.cantidad <= 0) {
                alert(`No hay más ${productoInventario?.nombre} en stock.`);
                return prevInventario;
            }

            setVenta((prevVenta) => {
                const productoExistente = prevVenta.find(item => item.id_producto === id_producto);
                if (productoExistente) {
                    return prevVenta.map(item =>
                        item.id_producto === id_producto
                            ? { ...item, cantidad: item.cantidad + 1 }
                            : item
                    );
                } else {
                    return [...prevVenta, { ...productoInventario, cantidad: 1 }];
                }
            });

            return prevInventario.map(item =>
                item.id_producto === id_producto
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            );
        });
    };


    const handleSubmit = async () => {
        try {
            const ventasConFecha = venta.map((producto) => ({
                ...producto,
                fecha: new Date(),
            }));

            for (const producto of ventasConFecha) {
                await GestionInvRepository.RestarInventario(producto.id_producto, producto.cantidad);

            }

            await GestionInvRepository.GuardarVentas(ventasConFecha);


            showMessage({
                message: `Venta exitosa`,
                description: `El Producto <span style="color: yellow">${ventasConFecha[0].nombre}</span> Fue Restado Del Inventario Correctamente, Realizaste Una Venta Por Un Valor De: <span style="color: yellow">${calcularTotal()}</span>`,
                type: 'success',
                duration: 3000,
            });

            setVenta([]);
        } catch (error) {
            console.error('Error al procesar la venta:', error);
            showMessage({
                message: 'Error al procesar la venta',
                description: error.message,
                type: 'danger',
            });
        }
    };



    const calcularTotal = () => {
        return venta.reduce((total, item) => total + (item.PrecioUnitario * item.cantidad), 0);
    };



    const fetchInventario = async () => {
        try {
            const response = await InventarioRepository.GetInventario();
            setInventario(response.data);
        } catch (err) {
            console.log("Error al obtener los datos:", err);
        }
    };
    React.useEffect(() => {
        fetchInventario();
    }, []);


    if (!fontsLoaded) return null;

    const handleLogout = () => {
        logout();
    }


    return (
        <DefaultLayout>
            <View style={{ flex: 1, backgroundColor: '#212529', padding: 20 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Icon name="bars" size={Dimensions.get('window').width * 0.08} color="#ffffff" style={styles.iconBars} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
                        <Icon name="user-circle" size={Dimensions.get('window').width * 0.08} color="#ffffff" style={styles.iconUser} />
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

                <Text style={styles.title}>
                    HOLA, <Text style={styles.admin}>ADMINISTRADOR</Text> | ESTE ES EL INVENTARIO DE LOS PRODUCTOS QUE SALEN DE LA BARBERÍA
                </Text>



                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                        dropdownIconColor="#fff"
                        style={styles.picker}
                    >
                        <Picker.Item label="Diario" value="Diario" />
                        <Picker.Item label="Semanal" value="Semanal" />
                        <Picker.Item label="Mensual" value="Mensual" />
                    </Picker>
                </View>



                <TouchableOpacity style={{ ...styles.pdfButton, marginBottom: 40, marginTop: 25 }}>
                    <Text style={styles.pdfButtonText}>GENERAR PDF</Text>
                </TouchableOpacity>

                <View>
                    {inventario.map((item, id_producto) => (
                        <TouchableOpacity key={item.id_producto} onPress={() => agregarProducto(item.id_producto)}
                            style={styles.card}>
                            <View style={styles.cardContent}>
                                <Image
                                    source={{ uri: `${getBaseURL()}ImagesInventario/${item.Foto}` }}
                                    style={styles.cardImage}
                                />
                                <Text style={styles.cardTitle}>{item.nombre}</Text>
                                <Text style={styles.cardText}>
                                    <Text style={{ fontWeight: 'bold', color: '#dc3545' }}>Cantidad: </Text> {item.cantidad} Unidades
                                </Text>
                                <Text style={styles.cardText}>
                                    <Text style={{ fontWeight: 'bold', color: '#dc3545' }}>Precio: </Text> {item.PrecioUnitario} Pesos
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.tableContainer}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={[styles.tableCell, styles.cellCantidad]}>Cantidad</Text>
                        <Text style={styles.tableCell}>ID</Text>
                        <Text style={styles.tableCell}>Nombre Producto</Text>
                        <Text style={styles.tableCell}>Precio</Text>
                    </View>

                    {venta.length > 0 ? (
                        venta.map((item) => (
                            <View key={item.id_producto} style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.cellCantidad]}>{item.cantidad}</Text>
                                <Text style={styles.tableCell}>{item.id_producto}</Text>
                                <Text style={styles.tableCell}>{item.nombre}</Text>
                                <Text style={styles.tableCell}>{item.PrecioUnitario}</Text>
                            </View>
                        ))
                    ) : (
                        <View style={styles.tableRow}>
                            <Text style={styles.noDataText}>No hay productos</Text>
                        </View>
                    )}
                </View>


                <Text style={styles.total}>Total: ${calcularTotal().toFixed(2)}</Text>
                <TouchableOpacity style={styles.subtractButton} onPress={handleSubmit}>
                    <Text style={styles.subtractButtonText}>RESTAR DEL INVENTARIO</Text>
                </TouchableOpacity>
            </ View>
        </DefaultLayout>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Dimensions.get('window').width * 0.00,
        paddingTop: 20,
        backgroundColor: '#212529',
        marginBottom: 15,
    },
    iconBars: {
        marginLeft: Dimensions.get('window').width * 0.07,
        marginTop: Dimensions.get('window').height * 0.02,
    },
    iconUser: {
        marginRight: Dimensions.get('window').width * 0.07,
        marginTop: Dimensions.get('window').height * 0.02,
    },
    dropdownMenu: {
        position: 'absolute',
        right: Dimensions.get('window').width * 0.2,
        backgroundColor: '#343a40',
        padding: 10,
        borderRadius: 5,
    },
    dropdownItem: {
        color: '#ffffff',
        fontSize: Dimensions.get('window').width * 0.04,
        paddingVertical: 5,
    },
    title: {
        fontFamily: 'Anton',
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center',
        marginHorizontal: 15,
        marginVertical: 10,
    },
    admin: {
        color: '#dc3545',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#6c757d',
        borderRadius: 5,
        backgroundColor: '#212529',
        overflow: 'hidden',
        marginBottom: 15
    },

    picker: {
        color: '#fff',
        height: 48,
        paddingHorizontal: 10,
    },

    pdfButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#28a745',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginRight: 15,
    },
    pdfButtonText: {
        color: '#fff',
        fontFamily: 'BebasNeue_400Regular',
        fontSize: 16,
    },
    productsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    card: {
        backgroundColor: '#343a40',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden',
    },
    cardContent: {
        padding: 15,
    },
    cardTitle: {
        color: '#dc3545',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
        marginTop: 10,
        fontFamily: 'BebasNeue_400Regular',
    },
    cardText: {
        color: '#ffffff',
        fontSize: 14,
        marginBottom: 10,
    },
    tableContainer: {
        marginTop: 30,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#6c757d',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#2a2a2a',
    },
    tableHeader: {
        backgroundColor: '#1f1f1f',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    tableCell: {
        flex: 1,
        padding: 10,
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    },
    cellCantidad: {
        color: '#ffc107',
        fontWeight: 'bold',
    },
    noDataText: {
        color: '#fff',
        textAlign: 'center',
        padding: 15,
        width: '100%',
    },

    total: {
        color: '#ffc107',
        fontFamily: 'BebasNeue_400Regular',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    },
    subtractButton: {
        backgroundColor: '#ffc107',
        padding: 10,
        margin: 20,
        borderRadius: 5,
    },
    subtractButtonText: {
        textAlign: 'center',
        fontFamily: 'BebasNeue_400Regular',
        fontSize: 16,
    },
    cardImage: {
        width: '100%',
        height: 270,
        resizeMode: 'cover',
    },

})
