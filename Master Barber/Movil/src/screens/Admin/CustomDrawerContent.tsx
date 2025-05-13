// components/CustomDrawerContent.js
import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <DrawerItemList {...props} />

                <View style={{ flex: 1 }} />
                
                <DrawerItem
                    label="Perfil"
                    icon={({ co
                        
                        
                        lor, size }) => (
                        <Ionicons name="person-circle" size={size} color={color} />
                    )}
                    onPress={() => props.navigation.navigate('Perfil')}
                    labelStyle={{ color: 'white' }}
                />
            </View>
        </DrawerContentScrollView>
    );
}
