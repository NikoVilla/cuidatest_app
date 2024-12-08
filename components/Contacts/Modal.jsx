import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';

export default function CustomModal({ visible, onClose }) {
  const [errors, setErrors] = useState({});
  const [checkboxState, setCheckboxState] = useState({
    email: false,
    sms: false,
    other: false,
  });

  const toggleCheckbox = (type) => {
    setCheckboxState((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleFocus = (field) => {
    if (errors[field]) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Agregar contacto</Text>
          <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Nombre completo" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Celular" keyboardType="phone-pad" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Dirección" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Relación" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Correo" keyboardType="email-address" />
            </View>

            <Text style={styles.label}>Tipos de alerta:</Text>
            <View style={styles.checkboxContainer}>
              {/* Email Alert */}
              <View style={styles.alertOption}>
                <TouchableOpacity onPress={() => toggleCheckbox('email')} style={styles.checkbox}>
                  {checkboxState.email && <Ionicons name="checkmark" size={16} color={Colors.primary} />}
                </TouchableOpacity>
                <Ionicons name="mail-outline" size={20} style={styles.icon} />
                <Text style={styles.alertText}>Email</Text>
              </View>
              
              {/* SMS Alert */}
              <View style={styles.alertOption}>
                <TouchableOpacity onPress={() => toggleCheckbox('sms')} style={styles.checkbox}>
                  {checkboxState.sms && <Ionicons name="checkmark" size={16} color={Colors.primary} />}
                </TouchableOpacity>
                <Ionicons name="chatbox-ellipses-outline" size={20} style={styles.icon} />
                <Text style={styles.alertText}>SMS</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={onClose}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '95%',
    backgroundColor: Colors.tertiary,
    borderRadius: 15,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'inter-semibold',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 45,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    // borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  alertOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  alertText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: 'inter-semibold',
  },
});