import React from 'react';
import InicioAdminScreen from '../screens/Admin/InicioAdmin';
import { createStackNavigator } from '@react-navigation/stack';
import GestionarBarberosScreen from '../screens/Admin/GestionarBarberos';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InventarioScreen from '../screens/Admin/Inventario';
import GestionDeInventarioScreen from '../screens/Admin/GestionDeInventario';
import { Dimensions } from 'react-native';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const AuthStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="LoginScreen" component={LoginScreen} />
//       <Stack.Screen name="OlvidoContraseñaScreen" component={OlvidoContraseñaScreen} />
//       <Stack.Screen name="RestablecerContraseñaScreen" component={RestablecerContraseñaScreen} />
//    </Stack.Navigator>
//);
export default function NavigationAdmin() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#212529',
                    width: Dimensions.get('window').width * 0.6,
                    paddingTop: 20
                },
                drawerInactiveTintColor: 'white',
            }}
        >
            <Drawer.Screen name="Inicio" component={InicioAdminScreen} />
            <Drawer.Screen name="Gestionar Barberos" component={GestionarBarberosScreen} />
            <Drawer.Screen name="Inventario" component={InventarioScreen} />
            <Drawer.Screen name="Gestion De Inventario" component={GestionDeInventarioScreen} />
        </Drawer.Navigator>


    )
};