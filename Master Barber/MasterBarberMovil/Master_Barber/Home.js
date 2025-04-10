import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.title}>Master Barber</Text>
      </View>


      <Footer />
    </View>
  );
}

export function Footer() {
  return (
    <View style={styles.footer}>
      <Icon name="calendar" size={30} color="#ffffff" />
      <Icon name="cut" size={30} color="#ffffff" />
      <Icon name="clock" size={30} color="#ffffff" />
      <Icon name="phone" size={30} color="#ffffff" />
      <Icon name="bars" size={30} color="#ffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  header: {
    paddingTop: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    color: 'red',
    fontWeight: 'bold',
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
