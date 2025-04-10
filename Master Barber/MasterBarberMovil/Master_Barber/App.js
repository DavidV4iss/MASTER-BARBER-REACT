import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa la biblioteca de íconos
import Login from './Login'; // Importa el componente Login

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#000000" />
      <Text style={{ color: '#ffffff', fontSize: 20, marginTop: 40, marginBottom: 20  }}>Bienvenido a Master Barber</Text>
      <Login />
      <View style={styles.footer}>
        <Icon name="home" size={30} color="#ffffff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333333',
    width: '100%',
    padding: 10,
    position: 'absolute',
    bottom: 0,
  },
});