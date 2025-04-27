import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import InicioAdminScreen from '../screens/Admin/InicioAdmin';
import GestionarBarberosScreen from '../screens/Admin/GestionarBarberos';
import InventarioScreen from '../screens/Admin/Inventario';
import GestionDeInventarioScreen from '../screens/Admin/GestionDeInventario';
import { Ionicons } from '@expo/vector-icons'; 

const Drawer = createDrawerNavigator();

export default function NavigationAdmin() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#212529',
                    width: Dimensions.get('window').width * 0.6,
                },
                drawerInactiveTintColor: 'white',
            }}
        >
            <Drawer.Screen
                name="Inicio"
                component={InicioAdminScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Gestionar Barberos"
                component={GestionarBarberosScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="people-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Inventario"
                component={InventarioScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="cube-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Gestion De Inventario"
                component={GestionDeInventarioScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="clipboard-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}