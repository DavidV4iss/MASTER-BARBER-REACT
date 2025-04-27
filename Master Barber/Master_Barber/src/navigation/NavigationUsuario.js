import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InicioUsuario from '../screens/usuarios/InicioUsuario';

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
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
          if (route.name === "InicioUsuario") {
            iconName = focused ? "home-sharp" : "home-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#B0B0B0",
      })}
    >
      <Tab.Screen name="InicioUsuario" component={InicioUsuario} />
    </Tab.Navigator>
  )
};