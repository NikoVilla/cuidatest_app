import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../../constants/Colors';

export default function Panel({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={24} />
      </TouchableOpacity>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>NV</Text>
        </View>
        <Text style={styles.nameText}>Nicolas Villanueva</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={() => navigation.navigate('profile')}>
        <Ionicons name="person-circle-outline" size={20} color={Colors.primary} />
        <Text style={styles.panelButtonText}>Ver perfil</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.panelButton} onPress={() => navigation.navigate('history')}>
        <Ionicons name="analytics" size={20} color={Colors.primary} />
        <Text style={styles.panelButtonText}>Historial</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.panelButton} onPress={() => navigation.navigate('contacts')}>
        <Ionicons name="people-circle" size={20} color={Colors.primary} />
        <Text style={styles.panelButtonText}>Contactos de emergencia</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.panelButton} onPress={() => navigation.navigate('device')}>
        <Ionicons name="bluetooth" size={20} color={Colors.primary} />
        <Text style={styles.panelButtonText}>Dispositivo</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('login/index')}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.bgpanel,
    justifyContent: 'space-evenly',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: Colors.tertiary,
    fontSize: 40,
    fontFamily: 'inter-bold',
  },
  nameText: {
    fontSize: 20,
    fontFamily: 'inter-semibold',
  },
  panelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Stitles,
    padding: 15,
    borderRadius: 8,
  },
  panelButtonText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'inter-medium',
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Colors.tertiary,
    fontSize: 15,
    fontFamily: 'inter-bold',
  },
});
