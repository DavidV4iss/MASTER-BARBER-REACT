import React from 'react';
import InicioAdmin from '../screens/Admin/InicioAdmin';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const AuthStack = () => (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="RegistrarScreen" component={RegistroScreen} />
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         <Stack.Screen name="OlvidoContraseñaScreen" component={OlvidoContraseñaScreen} />
//         <Stack.Screen name="RestablecerContraseñaScreen" component={RestablecerContraseñaScreen} />
//     </Stack.Navigator>
// );
export default function NavigationAdmin() {
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
                    if (route.name === "Inicio") {
                        iconName = focused ? "home-sharp" : "home-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#B0B0B0",
            })}
        >

            <Tab.Screen name="Inicio" component={InicioAdmin} />
        </Tab.Navigator>
    )
};