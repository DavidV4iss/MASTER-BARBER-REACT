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

      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>

        </View>
        <View style={{ marginTop: 20, alignItems: 'center', marginBottom: 120 }}>
          <Text style={{ color: '#dc3545', fontSize: 40, fontFamily: 'BebasNeue_400Regular' }}>SOBRE NOSOTROS</Text>
          <Image
            source={require('../assets/LOGO.png')}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              marginTop: 20,}}
          />
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>
          <Text style={{ color: '#ffc107', fontSize: 20 }}>¡Disfruta de nuestros servicios!</Text>

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
    borderColor: '#6c757d',
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

});
