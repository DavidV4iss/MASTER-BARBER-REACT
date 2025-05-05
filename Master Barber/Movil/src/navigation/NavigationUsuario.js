import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InicioUsuario from '../screens/usuarios/InicioUsuario';
import ReservasNoti from '../screens/usuarios/ReservasNoti';

const Tab = createBottomTabNavigator();
export default function NavigationUsuario() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#2B3035",
          height: 60,
          paddingBottom: 5,
          borderTopColor: "#444",
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === "Usuario") {
            iconName = focused ? "skull" : "skull-outline";
          }else if (route.name === "Raservas-Notificadas") {
            iconName = focused ? "notifications-sharp" : "notifications-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#B0B0B0",
      })}
      initialRouteName="Usuario"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#2B3035" }}
    >
      <Tab.Screen name="Usuario" component={InicioUsuario} />
      <Tab.Screen name="Raservas-Notificadas" component={ReservasNoti} />
    </Tab.Navigator>
  )
};