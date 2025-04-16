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
          <Text style={styles.title}>¡¡BIENVENIDO!!</Text>
        </View>

      </View>


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
    marginTop: 30,
    width: Dimensions.get('window').width * 1.9,
    height: 290,
    borderBottomWidth: 1,
    borderColor: '#6c757d',
    borderRadius: 10,
  },
  header: {
    paddingTop: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginTop: 230,
    fontFamily: 'BebasNeue_400Regular',
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
    width: 200,
    height: 200,
    marginTop: 20,
  },

});
