import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
export default function PerfilAdmin() {

        const { logout } = useAuth()
        const [isDropdownVisible, setIsDropdownVisible] = useState(false);
        const navigation = useNavigation();

        const handleLogout = () => {
            logout()
        }
    
  return (
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
})
