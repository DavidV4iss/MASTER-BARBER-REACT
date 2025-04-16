import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts as useBebas, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { Dimensions } from 'react-native';
import Login from './Login';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const [fontsLoaded] = useBebas({
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  if (currentScreen === 'Login') {
    return <Login />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>


      <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
        <View>
          <View>
            <Image
              source={require('../assets/LOGO.png')}
              style={styles.logo}
            />
          </View>
        </View>
        <Text style={{ ...styles.title, fontFamily: 'BebasNeue_400Regular' }}>¡¡BIENVENIDO A LA APP!!</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
          <Image
            source={require('../assets/barbero.jpg')}
            style={{
              width: Dimensions.get('window').width * 0.4,
              height: Dimensions.get('window').width * 0.4,
              marginRight: Dimensions.get('window').width * 0.04,
            }}
          />
          <View style={{ alignItems: 'center', maxWidth: Dimensions.get('window').width * 0.5 }}>
            <Text style={styles.title2}>
              SOBRE NOSOTROS
            </Text>
            <Text style={{ color: '#ffffff', fontSize: Dimensions.get('window').width * 0.04, textAlign: 'center', marginTop: 10 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 160 }}>
          <Text style={styles.title2}>NUESTROS SERVICIOS</Text>

        </View>
        <View style={styles.card}>
          <Image
            source={require('../assets/barbero.jpg')}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={{ ...styles.cardTitle, }}>Corte Basico</Text>
            <View style={{ marginTop: 10, borderRadius: 5, overflow: 'hidden', maxHeight: 50, width: '50%', alignSelf: 'center' }}>
              <Button
                title="VER"
                color="#dc3545"
                onPress={() => {/* Add your onPress logic here */ }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer navigateTo={setCurrentScreen} />
    </View>
  );
}

function Footer({ navigateTo }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerLine} />
      <View style={styles.iconContainer}>
        <Icon name="user-circle" size={30} color="#ffffff" onPress={() => navigateTo('Login')} />
        <Icon name="calendar" size={30} color="#ffffff" />
        <Icon name="bars" size={30} color="#ffffff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#212529',
    alignItems: 'center',
  },


  header: {
    paddingTop: 60,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#212529',
  },

  title: {
    textAlign: 'center',
    marginTop: 160,
    letterSpacing: 1,
    fontSize: 28,
    color: '#ffc107',
    fontWeight: 'bold',
    opacity: 0.8,
  },

  title2: {
    color: '#dc3545',
    fontSize: 30,
    fontFamily: 'BebasNeue_400Regular',
  },

  footerLine: {
    height: 1,
    backgroundColor: '#6c757d',
    width: '100%',
    marginBottom: 10,
  },

  footer: {
    backgroundColor: '#212529',
    width: '100%',
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },

  logo: {
    opacity: 0.6,
    position: 'absolute',
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },

  card: {
    borderRadius: 9,
    margin: 10,
    overflow: 'hidden',
    marginBottom: 150,
    backgroundColor: '#212529',
    borderWidth: 1,
    borderColor: '#6c757d',
    marginTop: 65,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.6,

  },

  cardImageContainer: {
    overflow: 'hidden',
  },

  cardImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },

  cardContent: {
    justifyContent: 'center',
  },

  cardTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc3545',
    textAlign: 'center',
  },

});
