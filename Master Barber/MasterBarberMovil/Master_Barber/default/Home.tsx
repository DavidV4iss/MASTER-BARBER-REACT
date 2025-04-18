import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts as useBebas, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { Dimensions } from 'react-native';
import Register from './Registro';
import InicioAdmin from '../src/Views/Admin/InicioAdmin';
import GestionReservas from '../src/Views/barberos/GestionReservas';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const [fontsLoaded] = useBebas({
    BebasNeue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }


  if (currentScreen === 'register') {
    return <Register />;
  }

  if (currentScreen === 'admin') {
    return <InicioAdmin />;
  }
  if (currentScreen === 'gestionReservas') {
    return <GestionReservas />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>

      <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: Dimensions.get('window').height * 0.05 }}>

        <View>
          <Image
            source={require('../assets/LOGO.png')}
            style={{
              ...styles.logo,
              width: Dimensions.get('window').width * 0.40,
              height: Dimensions.get('window').width * 0.40,
            }}
          />
        </View>
        <Text style={{ ...styles.title, fontFamily: 'BebasNeue_400Regular', fontSize: Dimensions.get('window').width * 0.09, marginTop: 160 }}>
          ¡¡BIENVENIDO A LA APP!!
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height * 0.2 }}>
          <Image
            source={require('../assets/barbero.jpg')}
            style={{
              width: Dimensions.get('window').width * 0.4,
              height: Dimensions.get('window').width * 0.4,
              marginRight: Dimensions.get('window').width * 0.04,
            }}
          />
          <View style={{ alignItems: 'center', maxWidth: Dimensions.get('window').width * 0.5 }}>
            <Text style={{ ...styles.title2, fontSize: Dimensions.get('window').width * 0.09 }}>
              SOBRE NOSOTROS
            </Text>
            <Text style={{ color: '#ffffff', fontSize: Dimensions.get('window').width * 0.04, textAlign: 'center', marginTop: 10 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Dimensions.get('window').height * 0.2 }}>
          <Text style={{ ...styles.title2, fontSize: Dimensions.get('window').width * 0.12 }}>NUESTROS SERVICIOS</Text>

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: Dimensions.get('window').height * 0.08 }}>
          <View style={{
            ...styles.card,
            width: Dimensions.get('window').width * 0.4,
            height: Dimensions.get('window').width * 0.8,
            marginHorizontal: 10,
            alignItems: 'center',
          }}>
            <Image
              source={require('../assets/cortepremium.jpg')}
              style={{
                ...styles.cardImage,
              }}
            />
            <View style={styles.cardContent}>
              <Text style={{ ...styles.cardTitle, fontSize: Dimensions.get('window').width * 0.04 }}>Corte Basico</Text>
              <View style={{
                marginTop: 10,
                borderRadius: 5,
                overflow: 'hidden',
                maxHeight: Dimensions.get('window').height * 0.06,
                alignSelf: 'center',
              }}>
                <Button
                  title="VER"
                  color="#dc3545"
                  onPress={() => {/* Add your onPress logic here */ }}
                />
              </View>
            </View>
          </View>
          <View style={{
            ...styles.card,
            width: Dimensions.get('window').width * 0.4, // Ajusta el ancho de las cartas
            height: Dimensions.get('window').width * 0.8,
            marginHorizontal: 10,
            alignItems: 'center',
          }}>
            <Image
              source={require('../assets/cortepremium.jpg')}
              style={{
                ...styles.cardImage,
              }}
            />
            <View style={styles.cardContent}>
              <Text style={{ ...styles.cardTitle, fontSize: Dimensions.get('window').width * 0.04 }}>Corte Premium</Text>
              <View style={{
                marginTop: 10,
                borderRadius: 5,
                overflow: 'hidden',
                maxHeight: Dimensions.get('window').height * 0.06,
                alignSelf: 'center',
              }}>
                <Button
                  title="VER"
                  color="#dc3545"
                  onPress={() => {/* Add your onPress logic here */ }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: Dimensions.get('window').height * 0.1, }}>
          <Text style={{ ...styles.title3, fontSize: Dimensions.get('window').width * 0.12 }}>LISTA DE PRECIOS</Text>
          <Text style={{ color: '#ffffff', fontSize: Dimensions.get('window').width * 0.04, textAlign: 'center', marginTop: 10 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere pariatur mollitia illo perspiciatis velit tempora.
          </Text>
        </View>

        <View style={{ ...styles.priceListContainer, marginBottom: Dimensions.get('window').height * 0.2 }}>
          <View style={styles.priceRow}>
            <Text style={styles.serviceText}>Corte Basico</Text>
            <Text style={styles.priceText}>20.000</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.serviceText}>Cejas</Text>
            <Text style={styles.priceText}>5.000</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.serviceText}>Figuras</Text>
            <Text style={styles.priceText}>5.000</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.serviceText}>Mascarillas</Text>
            <Text style={styles.priceText}>25.000</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.serviceText}>Barbas</Text>
            <Text style={styles.priceText}>12.000</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.serviceText}>Tintes</Text>
            <Text style={styles.priceText}>Depende Del Tinte</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.serviceText}>Corte Premium</Text>
            <Text style={styles.priceText}>55.000</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: Dimensions.get('window').height * 0.1 }}>
          <Text style={{ ...styles.title3, fontSize: Dimensions.get('window').width * 0.1 }}>CONOCE A NUESTROS ESTILISTAS</Text>
          <Text style={{ color: '#ffffff', fontSize: Dimensions.get('window').width * 0.04, textAlign: 'center', marginTop: 10 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere pariatur mollitia illo perspiciatis velit tempora.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginTop: Dimensions.get('window').height * 0.07, marginBottom: Dimensions.get('window').height * 0.2 }}>
          <View style={styles.stylistCard}>
            <Image
              source={require('../assets/deiby.jpg')}
              style={styles.stylistImage}
            />
            <Text style={styles.stylistName}>DEIBY</Text>
            <Text style={styles.stylistDescription}>
              Cortes Perfilados, Accesoría En Imagen Buen Uso De Las Máquinas Y El Ambiente
            </Text>
          </View>
          <View style={styles.stylistCard}>
            <Image
              source={require('../assets/nixon.jpg')}
              style={styles.stylistImage}
            />
            <Text style={styles.stylistName}>NIXXON</Text>
            <Text style={styles.stylistDescription}>
              Cortes Perfilados, Accesoría En Imagen Buen Uso De Las Máquinas Y El Ambiente
            </Text>
          </View>
          <View style={styles.stylistCard}>
            <Image
              source={require('../assets/jeisson.jpg')}
              style={styles.stylistImage}
            />
            <Text style={styles.stylistName}>JEISSON</Text>
            <Text style={styles.stylistDescription}>
              Cortes Perfilados, Accesoría En Imagen Buen Uso De Las Máquinas Y El Ambiente
            </Text>
          </View>
          <View style={styles.stylistCard}>
            <Image
              source={require('../assets/jeisson.jpg')}
              style={styles.stylistImage}
            />
            <Text style={styles.stylistName}>JEISSON</Text>
            <Text style={styles.stylistDescription}>
              Cortes Perfilados, Accesoría En Imagen Buen Uso De Las Máquinas Y El Ambiente
            </Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: Dimensions.get('window').height * 0.0 }}>
          <Text style={{ ...styles.title3, fontSize: Dimensions.get('window').width * 0.1, color: '#dc3545' }}>¡¡MASTER SHOP!!</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: Dimensions.get('window').width * 0.05, marginTop: Dimensions.get('window').height * 0.05 }}
        >
          <View style={styles.productCard}>
            <Image
              source={require('../assets/cortepremium.jpg')}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>PORTA CUCHILLAS</Text>
            <Text style={styles.productDescription}>Corte Fino</Text>
            <Text style={styles.productStock}>Quedan 58 Unidades De Este Producto</Text>
            <Button title="Ver" color="#dc3545" onPress={() => { }} />
          </View>
          <View style={styles.productCard}>
            <Image
              source={require('../assets/cortepremium.jpg')}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>POLVOS TEXTURIZANTES</Text>
            <Text style={styles.productDescription}>Un Corte Texturizado</Text>
            <Text style={styles.productStock}>Quedan 34 Unidades De Este Producto</Text>
            <Button title="Ver" color="#dc3545" onPress={() => { }} />
          </View>
          <View style={styles.productCard}>
            <Image
              source={require('../assets/cortepremium.jpg')}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>LOCION DESINFECTANTE</Text>
            <Text style={styles.productDescription}>Desinfecta</Text>
            <Text style={styles.productStock}>Quedan 84 Unidades De Este Producto</Text>
            <Button title="Ver" color="#dc3545" onPress={() => { }} />
          </View>
          <View style={styles.productCard}>
            <Image
              source={require('../assets/cortepremium.jpg')}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>LOCION DESINFECTANTE</Text>
            <Text style={styles.productDescription}>Desinfecta</Text>
            <Text style={styles.productStock}>Quedan 84 Unidades De Este Producto</Text>
            <Button title="Ver" color="#dc3545" onPress={() => { }} />
          </View>
          <View style={styles.productCard}>
            <Image
              source={require('../assets/cortepremium.jpg')}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>LOCION DESINFECTANTE</Text>
            <Text style={styles.productDescription}>Desinfecta</Text>
            <Text style={styles.productStock}>Quedan 84 Unidades De Este Producto</Text>
            <Button title="Ver" color="#dc3545" onPress={() => { }} />
          </View>
          <View style={styles.productCard}>
            <Image
              source={require('../assets/cortepremium.jpg')}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>LOCION DESINFECTANTE</Text>
            <Text style={styles.productDescription}>Desinfecta</Text>
            <Text style={styles.productStock}>Quedan 84 Unidades De Este Producto</Text>
            <Button title="Ver" color="#dc3545" onPress={() => { }} />
          </View>
          <View style={styles.productCard}>
            <Image
              source={require('../assets/cortepremium.jpg')}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>LOCION DESINFECTANTE</Text>
            <Text style={styles.productDescription}>Desinfecta</Text>
            <Text style={styles.productStock}>Quedan 84 Unidades De Este Producto</Text>
            <Button title="Ver" color="#dc3545" onPress={() => { }} />
          </View>
        </ScrollView>

        <View style={{ alignItems: 'center', marginTop: Dimensions.get('window').height * 0.1, }}>
          <Text style={{ ...styles.title3, fontSize: Dimensions.get('window').width * 0.1 }}>LO QUE PIENSAN NUESTROS CLIENTES</Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: Dimensions.get('window').height * 0.05, marginBottom: Dimensions.get('window').height * 0.2 }}>
          <View style={styles.reviewCard}>
            <Image
              source={require('../assets/deiby.jpg')}
              style={styles.reviewImage}
            />
            <Text style={styles.reviewName}>FIDEL ESPITIA</Text>
            <Text style={styles.reviewText}>Excelente servicio y atención.</Text>
            <View style={styles.starsContainer}>
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
            </View>
          </View>
          <View style={styles.reviewCard}>
            <Image
              source={require('../assets/nixon.jpg')}
              style={styles.reviewImage}
            />
            <Text style={styles.reviewName}>MARÍA PÉREZ</Text>
            <Text style={styles.reviewText}>Muy profesionales y amables.</Text>
            <View style={styles.starsContainer}>
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star-half" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
            </View>
          </View>
          <View style={styles.reviewCard}>
            <Image
              source={require('../assets/jeisson.jpg')}
              style={styles.reviewImage}
            />
            <Text style={styles.reviewName}>JUAN LÓPEZ</Text>
            <Text style={styles.reviewText}>El mejor corte que he tenido.</Text>
            <View style={styles.starsContainer}>
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
              <Icon name="star" size={Dimensions.get('window').width * 0.05} color="#ffc107" />
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
    <View style={{
      ...styles.footer,
      paddingBottom: Dimensions.get('window').height * 0.03,
    }}>
      <View style={{
        ...styles.footerLine,
        height: Dimensions.get('window').height * 0.002,
      }} />
      <View style={styles.iconContainer}>
        <Icon name="user-circle" size={Dimensions.get('window').width * 0.08} color="#ffffff" onPress={() => navigateTo('register')} />
        <Icon name="calendar" size={Dimensions.get('window').width * 0.08} color="#ffffff" onPress={() => navigateTo('gestionReservas')} />
        <Icon name="bars" size={Dimensions.get('window').width * 0.08} color="#ffffff" onPress={() => navigateTo('admin')} />
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
    backgroundColor: '#212529',
  },

  title: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    opacity: 0.8,
  },

  title2: {
    color: '#dc3545',
    fontFamily: 'BebasNeue_400Regular',
  },

  title3: {
    color: '#ffffff',
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
    alignSelf: 'center',
    width: 50,
    position: 'absolute',
    zIndex: 10,
  },

  card: {
    borderRadius: 9,
    margin: 10,
    overflow: 'hidden',
    marginBottom: 150,
    backgroundColor: '#212529',
    borderWidth: 1,
    borderColor: '#6c757d',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9,

  },


  cardImageContainer: {
    overflow: 'hidden',
  },

  cardImage: {
    width: '100%',
    height: '70%',
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

  //CSS PARA LA LISTA DE PRECIOS
  priceListContainer: {
    marginTop: Dimensions.get('window').height * 0.05,
    width: '90%',
    borderWidth: 1,
    borderColor: '#6c757d',
    borderRadius: 10,
    overflow: 'hidden',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#6c757d',
    backgroundColor: '#212529',
  },
  serviceText: {
    color: '#ffffff',
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
  },
  priceText: {
    color: '#ffc107',
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
  },
  // FIN DE CSS PARA LA LISTA DE PRECIOS


  //CSS PARA LOS ESTILISTAS
  stylistCard: {
    width: Dimensions.get('window').width * 0.3,
    margin: 10,
    backgroundColor: '#212529',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6c757d',
  },
  stylistImage: {
    width: '100%',
    height: Dimensions.get('window').width * 0.4,
    resizeMode: 'cover',
  },
  stylistName: {
    color: '#dc3545',
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: 'bold',
    marginTop: 10,
  },
  stylistDescription: {
    color: '#ffffff',
    fontSize: Dimensions.get('window').width * 0.035,
    textAlign: 'center',
    padding: 10,
  },
  // FIN DE CSS PARA LOS ESTILISTAS


  //CSS PARA EL CARRUSEL DE PRODUCTOS
  productCard: {
    marginBottom: Dimensions.get('window').height * 0.20,
    width: Dimensions.get('window').width * 0.5,
    marginHorizontal: 10,
    backgroundColor: '#212529',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#6c757d',
  },
  productImage: {
    width: '100%',
    height: Dimensions.get('window').width * 0.5,
    resizeMode: 'contain',
  },
  productTitle: {
    color: '#dc3545',
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  productDescription: {
    color: '#ffffff',
    fontSize: Dimensions.get('window').width * 0.04,
    textAlign: 'center',
    marginTop: 5,
  },
  productStock: {
    color: '#6c757d',
    fontSize: Dimensions.get('window').width * 0.035,
    textAlign: 'center',
    marginVertical: 10,
  },
  // FIN DE CSS PARA EL CARRUSEL DE PRODUCTOS

  //CSS PARA LAS OPINIONES DE CLIENTES
  reviewCard: {
    width: Dimensions.get('window').width * 0.4,
    backgroundColor: '#212529',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#6c757d',
  },
  reviewImage: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    borderRadius: Dimensions.get('window').width * 0.1,
    marginBottom: 10,
  },
  reviewName: {
    color: '#dc3545',
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewText: {
    color: '#ffffff',
    fontSize: Dimensions.get('window').width * 0.04,
    marginVertical: 5,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  // FIN DE CSS PARA LAS OPINIONES DE CLIENTES
}); 