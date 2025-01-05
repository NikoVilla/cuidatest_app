import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import appFirebase from './../../app/auth/credentials';

const db = getFirestore(appFirebase);

export default function CustomModal({ visible, onClose, userData }) {
  const [errors, setErrors] = useState({});
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [contactoCelular, setContactoCelular] = useState('');
  const [contactoDireccion, setContactoDireccion] = useState('');
  const [contactoCorreo, setContactoCorreo] = useState('');

  const handleFocus = (field) => {
    if (errors[field]) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!nombreCompleto) newErrors.nombreCompleto = 'El nombre completo es obligatorio';
    if (!contactoCelular) newErrors.contactoCelular = 'El celular es obligatorio';
    if (!contactoDireccion) newErrors.contactoDireccion = 'La dirección es obligatoria';
    if (!contactoCorreo || !/\S+@\S+\.\S+/.test(contactoCorreo)) newErrors.contactoCorreo = 'Correo electrónico inválido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;
  
    try {
      const newContact = {
        nombreCompleto,
        contactoCelular: contactoCelular,
        contactoDireccion: contactoDireccion,
        contactoCorreo: contactoCorreo,
      };
  
      if (!userData || !userData.correo) {
        console.error("No se recibió userData o correo.");
        return;
      }

      const contactDocRef = doc(db, 'Usuarios', userData.correo, 'Contacto', contactoCorreo);

      await setDoc(contactDocRef, newContact);
  
      console.log("Contacto guardado correctamente con el correo como ID.");
      onClose();
    } catch (error) {
      console.error("Error al guardar el contacto:", error);
    }
  };
   

//   console.log("Contacto guardado correctamente con el correo como ID.");
//   setSuccessMessage("Contacto guardado correctamente.");
//   setTimeout(() => setSuccessMessage(''), 3000);  // Limpiar el mensaje de éxito después de 3 segundos
//   resetFields();
//   onClose();
// } catch (error) {
//   console.error("Error al guardar el contacto:", error);
// }
// };

// const resetFields = () => {
// setNombreCompleto('');
// setContactoCelular('');
// setContactoDireccion('');
// setContactoCorreo('');
// };

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
              <TextInput 
                style={[styles.input, errors.nombreCompleto && styles.inputError]} 
                placeholder="Nombre completo" 
                value={nombreCompleto}
                onChangeText={setNombreCompleto}
                onFocus={() => handleFocus('nombreCompleto')}
              />
              {errors.nombreCompleto && <Text style={styles.errorText}>{errors.nombreCompleto}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                style={[styles.input, errors.contactoCelular && styles.inputError]} 
                placeholder="Celular" 
                keyboardType="phone-pad" 
                value={contactoCelular}
                onChangeText={setContactoCelular}
                onFocus={() => handleFocus('contactoCelular')}
              />
              {errors.contactoCelular && <Text style={styles.errorText}>{errors.contactoCelular}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                style={[styles.input, errors.contactoDireccion && styles.inputError]} 
                placeholder="Dirección" 
                value={contactoDireccion}
                onChangeText={setContactoDireccion}
                onFocus={() => handleFocus('contactoDireccion')}
              />
              {errors.contactoDireccion && <Text style={styles.errorText}>{errors.contactoDireccion}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                style={[styles.input, errors.contactoCorreo && styles.inputError]} 
                placeholder="Correo" 
                keyboardType="email-address" 
                value={contactoCorreo}
                onChangeText={setContactoCorreo}
                onFocus={() => handleFocus('contactoCorreo')}
              />
              {errors.contactoCorreo && <Text style={styles.errorText}>{errors.contactoCorreo}</Text>}
            </View>

            <Text style={styles.label}>En caso de eventos críticos, las alertas se enviarán mediante SMS.</Text>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
  },
  inputError: {
    borderColor: 'red',
  },
  label: {
    fontSize: 10.9,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
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
