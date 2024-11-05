import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Colors from './../../constants/Colors';

export default function Conextion() {
  const [isConnected, setIsConnected] = useState(false);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estado: {isConnected ? 'Conectado' : 'Desconectado'}</Text>
      
      <TouchableOpacity style={styles.button} onPress={toggleConnection}>
        <Text style={styles.buttonText}>{isConnected ? 'Desconectar' : 'Conectar'}</Text>
      </TouchableOpacity>
      
      <Text style={styles.infoText}>Pulsa el botón para conectar o desconectar el dispositivo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontFamily: 'inter-medium',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 35,
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.negro,
    fontSize: 20,
    fontFamily: 'inter-semibold',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 13,
    textAlign: 'center',
  },
});
