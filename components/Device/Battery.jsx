import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from './../../constants/Colors';

export default function Battery() {
  const batteryLevel = 10; 
  const batteryStatus = batteryLevel > 75 ? 'Alto' : batteryLevel > 40 ? 'Medio' : 'Bajo';
  const statusColor = batteryStatus === 'Alto' ? 'green' : batteryStatus === 'Medio' ? 'yellow' : 'red';

  return (
    <View style={styles.container}>
      <View style={styles.batteryBox}>
        <Text style={styles.label}>Nivel de batería</Text>
        <Text style={styles.level}>{batteryLevel}%</Text>
      </View>
      <View style={styles.statusBox}>
        <Text style={styles.label}>Estado</Text>
        <Text style={[styles.status, { color: statusColor }]}>{batteryStatus}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  batteryBox: {
    width: '50%', 
    height: 90,  
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  statusBox: {
    width: '20%', 
    height: 90,  
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 15,
    fontFamily: 'inter-medium',
    color: 'black',
    marginBottom: 7,
  },
  level: {
    fontSize: 30,
    fontFamily: 'inter-medium',
    color: 'black',
  },
  status: {
    fontSize: 15,
    fontFamily: 'inter-medium',
    marginTop: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
