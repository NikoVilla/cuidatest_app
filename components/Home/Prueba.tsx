import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';  // Importando expo-location

// Función para generar un número aleatorio entre 1 y 10
const generateRandomNumber = (): number => Math.floor(Math.random() * 10) + 1;

// Definir tipo para la ubicación
interface LocationType {
  latitude: number;
  longitude: number;
}

const Prueba: React.FC = () => {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

  // Función para refrescar la ubicación
  const refreshLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permiso para acceder a la ubicación denegado');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  // Función para refrescar los números aleatorios
  const refreshNumbers = () => {
    setRandomNumbers(Array.from({ length: 4 }, generateRandomNumber));
  };

  useEffect(() => {
    // Refrescar ubicación y números cada 5 segundos
    const intervalId = setInterval(() => {
      refreshLocation();
      refreshNumbers();
    }, 10000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  // Llamamos a la función de refresco inicial cuando el componente se monte
  useEffect(() => {
    refreshLocation();
    refreshNumbers();
  }, []);

  return (
    <View style={styles.container}>
      {/* Cuatro cajas con números aleatorios */}
      <View style={styles.boxContainer}>
        {randomNumbers.map((number, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.number}>{number}</Text>
          </View>
        ))}
      </View>

      {/* Cadena de texto con la ubicación */}
      <Text style={styles.location}>
        {location ? `Ubicación: Lat: ${location.latitude}, Lon: ${location.longitude}` : errorMsg || 'Cargando ubicación...'}
      </Text>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  number: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Prueba;
