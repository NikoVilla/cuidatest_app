import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Alertas from './Alerts';

export default function Panel() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectangulo}>
        <Text style={styles.titulo}>Alertas emitidas</Text>
        <Text style={styles.texto}>8</Text>
      </View>
      <View style={styles.rectangulo}>
        <Text style={styles.titulo}>Mediciones realizadas</Text>
        <Text style={styles.texto}>100</Text>
        <TouchableOpacity style={styles.botonOjo} onPress={openModal} >
          <Ionicons name="eye" size={15} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal con la lista de alertas */}
      <Alertas visible={modalVisible} onClose={closeModal} signos={[]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 60,
  },
  rectangulo: {
    width: 150,
    height: 70,
    backgroundColor: '#3D5AFE',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
  },
  titulo: {
    position: 'absolute',
    top: 5,
    color: 'white',
    fontSize: 10,
  },
  texto: {
    color: 'white',
    fontSize: 25,
    marginTop: 14,
    fontWeight: 'semibold',
  },
  botonOjo: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    marginRight: 5,
    fontSize: 12,
  },
});
