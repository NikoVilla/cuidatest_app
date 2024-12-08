import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const AlertTypes = [
  { id: '1', title: 'Email', icon: 'checkmark-circle' },
  { id: '2', title: 'SMS', icon: 'checkmark-circle' },
];

export default function Card() {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.box}>
        <View style={styles.rowContainer}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>C</Text>
          </View>
          {/*  Texto "Casa" */}
          <View style={styles.centerContainer}>
            <Text style={styles.centerText}>Casa</Text>
          </View>
          {/* Tipo de Alerta */}
          <View style={styles.alertContainer}>
            <Text style={styles.alertTypeTitle}>Tipo de alerta</Text>
            <FlatList
              data={AlertTypes}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Ionicons name={item.icon} size={20} color={item.icon === 'checkmark-circle' ? 'green' : 'red'} />
                  <Text style={styles.listText}>{item.title}</Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.editButton]}>
              <Ionicons name="pencil" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.deleteButton]}>
              <Ionicons name="trash-bin-sharp" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '93%',
    backgroundColor: Colors.tertiary,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  avatar: {
    flex: 0.5,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontFamily: 'inter-bold',
    fontSize: 18,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 7,
  },
  centerText: {
    fontSize: 17,
    fontFamily: 'inter-semibold',
  },
  alertContainer: {
    flex: 1,
    alignItems: 'center',
  },
  alertTypeTitle: {
    fontSize: 14,
    fontFamily: 'inter-semibold',
    marginBottom: 3,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  listText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'inter-medium'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },  
  button: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 5
  },
  editButton: {
    backgroundColor: Colors.primary,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});
