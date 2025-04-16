import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts as useBebas, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { Dimensions } from 'react-native';

export default function Home() {

  const [fontsLoaded] = useBebas({
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.contenedorIMG}>
          <View>
            <Image
              source={require('../assets/LOGO.png')}
              style={styles.logo}
            />
          </View>
          <Text style={{ ...styles.title, fontFamily: 'BebasNeue_400Regular' }}>¡¡BIENVENIDO A LA APP!!</Text>
        </View>

      </View>


      <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
          <Image
            source={require('../assets/barbero.jpg')}
            style={{
              width: Dimensions.get('window').width * 0.4, // 30% del ancho de la pantalla
              height: Dimensions.get('window').width * 0.4, // Mantiene proporción cuadrada
              marginRight: Dimensions.get('window').width * 0.04, // 5% del ancho de la pantalla como margen
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
            <Text style={{ ...styles.cardTitle }}>Corte Basico</Text>
            <Text style={styles.cardText}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
          </View>
        </View>
      </ScrollView>


      <Footer />
    </View>
  );
}



export function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.footerLine} />

      <View style={styles.iconContainer}>
        <Icon name="user-circle" size={30} color="#ffffff" />
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

  contenedorIMG: {
    backgroundColor: '#000000',
    width: Dimensions.get('window').width * 1.9,
    height: 230,
    borderBottomWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 10,
  },

  header: {
    paddingTop: 50,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#000000',
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
    width: 150,
    height: 150,
    left: 275,
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
    marginTop: Dimensions.get('window').height * 0.02,
    justifyContent: 'center',
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc3545',
    marginTop: Dimensions.get('window').height * 0, 
    textAlign: 'center',
  },

  cardText: {
    fontSize: Dimensions.get('window').width * 0.031, 
    color: '#ffffff',
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.7, 
    height: Dimensions.get('window').height * 0.2, 
    marginLeft: Dimensions.get('window').width * 0.09, 
  },
});
