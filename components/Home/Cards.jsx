import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

function Card({ title, number, range, status }) {
  // Define el color según el estado
  const statusColor = status === 'Normal' ? 'green' : 'red';

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.range}>{range}</Text>
      <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
    </View>
  );
}

export default function Cards() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Última medición: 11/11/1111 - 20:00</Text>
        <View style={styles.middleSpacer} />
        <Ionicons name="analytics" size={20} color={Colors.primary} />
        <TouchableOpacity>
          <Text style={styles.historyButton}>Ver historial</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Card title="Frecuencia cardíaca (Bpm)" number="99" range="100-200" status="Normal" />
        <Card title="Saturación de oxígeno (SpO2%)" number="99" range="400-500" status="Crítico" />
        <Card title="Temperatura corporal (°C)" number="99" range="700-800" status="Normal" />
        <Card title="Velocidad angular (dps)" number="99" range="100-200" status="Normal" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  headerText: {
    fontSize: 11,
    fontFamily: 'inter-regular',
    textAlign: 'center',
  },
  historyButton: {
    fontSize: 11,
    fontFamily: 'inter-medium',
    textDecorationLine: 'underline',
    marginLeft: 3,
  },
  middleSpacer: {
    flex: 0.55,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  card: {
    width: '38%',
    height: 200,
    backgroundColor: Colors.tertiary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'space-evenly',
  },
  title: {
    fontFamily: 'inter-medium',
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'center',
  },
  number: {
    fontSize: 45,
    fontFamily: 'inter-semibold',
    marginBottom: 4,
  },
  range: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'inter-regular',
    textAlign: 'center',
  },
  status: {
    fontFamily: 'inter-semibold',
    fontSize: 14,
    textAlign: 'center',
  },
});
