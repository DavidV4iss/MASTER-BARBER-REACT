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
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';




export default function GestionDeInventario() {
    const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
    const navigation = useNavigation();
    const [rango, setRango] = React.useState('Diario');
    const [inventario, setInventario] = React.useState<any[]>([]);
    const [ventasProcesadas, setVentasProcesadas] = React.useState([]);
    const [venta, setVenta] = React.useState<any[]>([]);

    const { logout } = useAuth();

    const [fontsLoaded] = useFonts({
        Anton: Anton_400Regular,
        BebasNeue_400Regular,
    });

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



    const calcularTotal = () => {
        return venta.reduce((total, item) => total + (item.PrecioUnitario * item.cantidad), 0);
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
                description: `El Producto ${""} ${ventasConFecha[0].nombre} ${""} Fue Vendido Por Un Valor De: ${" "} ${ventasConFecha[0].PrecioUnitario} Fue Restado Del Inventario Correctamente.`,
                type: 'success',
                duration: 7000,
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

    const generarPDF = async () => {
        try {
            const response = await GestionInvRepository.GetVentas(rango);
            const ventas = response.data;

            const ventasAgrupadas = ventas.reduce((acc, venta) => {
                const key = venta.id_producto;
                if (!acc[key]) {
                    acc[key] = { ...venta, cantidad: 0 };
                }
                acc[key].cantidad += venta.cantidad;
                return acc;
            }, {});

            const ventasArray = Object.values(ventasAgrupadas);

            ventasArray.sort((a, b) => b.cantidad - a.cantidad);

            let htmlContent = `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { text-align: center; color: #dc3545; }
                    table, th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
            
                <div style="text-align:center; margin-bottom: 20px;">
                    <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.facebook.com%2Fp%2FMaster-Barber-VIP-100078723720363%2F&psig=AOvVaw0OaFMu6ChdIcL8SOtZ8em0&ust=1746883430177000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIiPvoS-lo0DFQAAAAAdAAAAABAE" alt="Logo" style="width:120px; height:auto;" />
                </div>
            
                <h1>Reporte de Ventas</h1>
                <p><strong>Rango:</strong> ${rango}</p>
                <p><strong>Fecha de Generación:</strong> ${new Date().toLocaleString()}</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
            `;

            if (ventasArray.length === 0) {
                htmlContent += `
                    <tr><td colspan="4">No hay ventas en este rango</td></tr>`;
            }

            let totalGeneral = 0;

            ventasArray.forEach((venta) => {
                const total = venta.PrecioUnitario * venta.cantidad;
                totalGeneral += total;
                htmlContent += `
                    <tr>
                        <td>${venta.nombre}</td>
                        <td>${venta.cantidad}</td>
                        <td>$${venta.PrecioUnitario.toFixed(2)}</td>
                        <td>$${total.toFixed(2)}</td>
                    </tr>`;
            });

            htmlContent += `
                </table>
                <h3>Total General: $${totalGeneral.toFixed(2)}</h3>
            </body>
            </html>
            `;

            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error('Error al generar el PDF:', error);
            showMessage({
                message: 'Error al generar el PDF',
                description: error.message,
                type: 'danger',
            });
        }
    };




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
                        selectedValue={rango}
                        onValueChange={(itemValue) => setRango(itemValue)}
                        dropdownIconColor="#fff"
                        style={styles.picker}
                    >
                        <Picker.Item label="Diario" value="Diario" />
                        <Picker.Item label="Semanal" value="Semanal" />
                        <Picker.Item label="Mensual" value="Mensual" />
                    </Picker>
                </View>



                <TouchableOpacity onPress={generarPDF} style={{ ...styles.pdfButton, marginBottom: 40, marginTop: 25 }}>
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
