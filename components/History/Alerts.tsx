import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Modal, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors'; 
import appFirebase from './../../app/auth/credentials';
import { getFirestore, collection, onSnapshot, getDocs } from 'firebase/firestore';

const db = getFirestore(appFirebase);

type AlertasProps = {
  visible: boolean;
  onClose: () => void;
  signos: { id: number, heartRate: number, temperature: number, timestamp: string, angularVelocity: number }[];
};

type Signal = {
  id: string;
  heartRate: number;
  temperature: number;
  timestamp: string;
  angularVelocity: number;
};

const Alertas = ({ visible, onClose, signos }: AlertasProps) => {
  if (!visible) return null;

  const [signals, setSignals] = useState<Signal[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'Usuarios'),
      async (snapshot) => {
        const usersData: Signal[] = [];
  
        for (const docSnapshot of snapshot.docs) {
          const userId = docSnapshot.id;
          const userData = docSnapshot.data();
  
          try {
            const signoSnapshot = await getDocs(collection(db, `Usuarios/${userId}/signosvital`));
  
            signoSnapshot.forEach((signoDoc) => {
              const signoData = signoDoc.data();
              
              // Aquí estamos usando el timestamp como el ID
              usersData.push({
                id: signoData.timestamp || signoDoc.id,  // Si no hay timestamp, usamos el ID del documento
                heartRate: signoData.heartRate || 0,
                temperature: signoData.temperature || 0,
                timestamp: signoData.timestamp || '',
                angularVelocity: signoData.angularVelocity || 0,
              });
            });
          } catch (error) {
            console.error(`Error al obtener los signos vitales para el usuario ${userId}:`, error);
          }
        }
  
        setSignals(usersData);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  
    return () => unsubscribe();
  }, []);
  

  
  const onRefresh = () => {
    setRefreshing(true);
    // Refrescar datos, si es necesario
    setRefreshing(false);
  };

  const renderSignalCard = (signal: Signal) => {
    return (
      <View key={signal.id} style={styles.card}>
        {/* <Text style={styles.cardTitle}>Signo Vital {signal.id}</Text> */}
        <Text style={styles.cardText}>Frecuencia Cardiaca: {signal.heartRate} bpm</Text>
        <Text style={styles.cardText}>Temperatura: {signal.temperature} °C</Text>
        <Text style={styles.cardText}>Velocidad Angular: {signal.angularVelocity}°/s</Text>
        <Text style={styles.cardText}>
          Fecha y hora: {new Date(signal.timestamp).toLocaleString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </Text>

      </View>
    );
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Signos Vitales</Text>
        <ScrollView
          style={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {signals.length > 0 ? (
            signals.map(renderSignalCard)
          ) : (
            <Text style={styles.noDataText}>No hay signos vitales disponibles.</Text>
          )}
        </ScrollView>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary || '#f9f9f9', // Usa tu color preferido de fondo
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary || '#3D5AFE',  // Usa tu color primario
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary || '#333',
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
    color: Colors.primary || '#666',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#3D5AFE',
    padding: 10,
    borderRadius: 50,
  },
});

export default Alertas;