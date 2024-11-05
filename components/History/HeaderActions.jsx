import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

export default function HeaderActions() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Ionicons name="search-sharp" size={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Búsqueda"
          placeholderTextColor= {Colors.graytext}
        />
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Agregar contacto</Text>
        <Ionicons name="person-add-sharp" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.tertiary,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 15,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: '100%'
  },
  icon: {
    marginRight: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.tertiary,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    height: 45,
  },
  addButtonText: {
    marginRight: 10,
    color: Colors.graytext,
    fontFamily: 'inter-medium',
    fontSize: '10'
  },
});