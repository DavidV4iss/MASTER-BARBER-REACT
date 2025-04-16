import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts as useBebas, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa la biblioteca de íconos
import Login from './default/Login'; // Importa el componente Login
import Home from './default/Home'; // Importa el componente Home

export default function App() {
  const [fontsLoaded] = useBebas({
    BebasNeue_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Login />
      <Home />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});