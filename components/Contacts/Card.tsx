import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import appFirebase from './../../app/auth/credentials';
import { getFirestore, collection, onSnapshot, doc, deleteDoc, updateDoc, getDocs } from 'firebase/firestore';

const db = getFirestore(appFirebase);
// const auth = getAuth(appFirebase);

type CardProps = {
  id: string;
  nombreCompleto: string;
  contactoCelular: string;
  contactoDireccion: string;
  contactoCorreo: string;
  alertPreferences: string;
  onDelete: (id: string) => void;
  onEdit: (contact: any) => void;
};

function Card({ id, nombreCompleto, contactoCelular, contactoDireccion, contactoCorreo, alertPreferences, onDelete, onEdit }: CardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{nombreCompleto}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => onEdit({ id, nombreCompleto, contactoCelular, contactoDireccion, contactoCorreo, alertPreferences })}>
            <Ionicons name="pencil" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => onDelete(contactoCorreo)}>
            <Ionicons name="trash-bin" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.infoText}>{contactoCelular}</Text>
      <Text style={styles.infoText}>{contactoDireccion}</Text>
      <Text style={styles.infoText}>{contactoCorreo}</Text>
      <Text style={styles.infoText}>Tipo de Alerta: {Object.keys(alertPreferences).filter(key => alertPreferences[key]).join(', ')}</Text>
      </View>
  );
}

export default function CardList() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); 
  const [updatedData, setUpdatedData] = useState({
    nombreCompleto: '',
    contactoCelular: '',
    contactoDireccion: '',
    contactoCorreo: '',
    alertPreferences: {
      SMS: false,
      Email: false,
    },
  });  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'Usuarios'),
      async (snapshot) => {
        const usersData: any[] = [];
  
        for (const docSnapshot of snapshot.docs) {
          const userId = docSnapshot.id;
          const userData = docSnapshot.data();

          // console.log('Datos del usuario:', { userId, userData });
  
          try {
            const contactoSnapshot = await getDocs(collection(db, `Usuarios/${userId}/Contacto`));
  
            contactoSnapshot.forEach((contactDoc) => {
              const contactoData = contactDoc.data();

              usersData.push({
                id: contactDoc.id,
                nombreCompleto: contactoData.nombreCompleto || '',
                contactoCelular: contactoData.contactoCelular || '',
                contactoDireccion: contactoData.contactoDireccion || '',
                contactoCorreo: contactoData.contactoCorreo || '',
                alertPreferences: contactoData.alertPreferences || '',
                ...userData,
              });
            });
          } catch (error) {
            console.error(`Error al obtener contactos para el usuario ${userId}:`, error);
          }
        }
  
        setContacts(usersData);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  
    return () => unsubscribe();
  }, []);

  const handleDeleteConfirmation = (contactoCorreo: string) => {
    setContactToDelete(contactoCorreo);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    if (contactToDelete) {
      try {
        const userQuerySnapshot = await getDocs(collection(db, 'Usuarios'));
        
        let contactFound = false;
  
        for (const userDoc of userQuerySnapshot.docs) {
          const userId = userDoc.id;
          const contactoRef = collection(db, `Usuarios/${userId}/Contacto`);
          const contactoSnapshot = await getDocs(contactoRef);
  
          for (const contactoDoc of contactoSnapshot.docs) {
            if (contactoDoc.data().contactoCorreo === contactToDelete) {

              await deleteDoc(doc(contactoRef, contactoDoc.id));
              console.log(`Contacto con correo ${contactToDelete} eliminado.`);
              contactFound = true;
              
              setContacts((prevContacts) => prevContacts.filter(contact => contact.contactoCorreo !== contactToDelete));
              break; 
            }
          }
  
          if (contactFound) {
            break;
          }
        }
  
        if (!contactFound) {
          console.error(`No se encontró contacto asociado al correo ${contactToDelete}`);
        }
        
      } catch (error) {
        console.error('Error al eliminar el contacto:', error);
      } finally {
        setDeleteModalVisible(false);
        setContactToDelete(null);
      }
    }
  };
  
  
  const handleEdit = (contact: any) => {
    setEditingContact(contact.id);
    setUpdatedData({
      nombreCompleto: contact.nombreCompleto,
      contactoCelular: contact.contactoCelular,
      contactoDireccion: contact.contactoDireccion,
      contactoCorreo: contact.contactoCorreo,
      alertPreferences: {
        SMS: contact.alertPreferences && contact.alertPreferences.SMS,
        Email: contact.alertPreferences && contact.alertPreferences.Email,
      },
    });
    setModalVisible(true);
  };

  const handleCheckboxToggle = (option: string) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      alertPreferences: {
        ...prevData.alertPreferences,
        [option]: !prevData.alertPreferences[option],
      },
    }));
  };
  

  const handleSaveEdit = async () => {
    try {
      if (editingContact) {
        console.log('ID del contacto a editar:', editingContact);
        // Encuentra el usuario y el contacto correspondiente
        const userQuerySnapshot = await getDocs(collection(db, 'Usuarios'));
        
        let contactFound = false;

        for (const userDoc of userQuerySnapshot.docs) {
          const userId = userDoc.id;
          const contactoRef = collection(db, `Usuarios/${userId}/Contacto`);
          const contactoSnapshot = await getDocs(contactoRef);

          for (const contactoDoc of contactoSnapshot.docs) {
            if (contactoDoc.id === editingContact) {
              await updateDoc(doc(contactoRef, contactoDoc.id), {
                ...updatedData,
              });
              console.log(`Contacto con ID ${editingContact} actualizado`);
              contactFound = true;
              break;
            }
          }

          if (contactFound) {
            break;
          }
        }

        if (!contactFound) {
          console.error(`No se encontró contacto con ID ${editingContact}`);
        }

        setModalVisible(false);
        setEditingContact(null);
        
      }
    } catch (error) {
      console.error('Error al actualizar el contacto:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Recarga los datos de los contactos
      const snapshot = await getDocs(collection(db, 'Usuarios'));
      const usersData: any[] = [];
      for (const docSnapshot of snapshot.docs) {
        const userId = docSnapshot.id;
        const userData = docSnapshot.data();

        const contactoSnapshot = await getDocs(collection(db, `Usuarios/${userId}/Contacto`));

        contactoSnapshot.forEach((contactDoc) => {
          const contactoData = contactDoc.data();        

          usersData.push({
            id: contactDoc.id,
            nombreCompleto: contactoData.nombreCompleto || '',
            contactoCelular: contactoData.contactoCelular || '',
            contactoDireccion: contactoData.contactoDireccion || '',
            contactoCorreo: contactoData.contactoCorreo || '',
            alertPreferences: contactoData.alertPreferences || '',
            ...userData,
          });
        });
      }

      setContacts(usersData);
    } catch (error) {
      console.error('Error al refrescar los contactos:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <View style={styles.container}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
          {contacts.length > 0 ? (
            contacts.map((item, index) => (
              <Card
                key={index}
                id={item.id}
                nombreCompleto={item.nombreCompleto}
                contactoCelular={item.contactoCelular}
                contactoDireccion={item.contactoDireccion}
                contactoCorreo={item.contactoCorreo}
                alertPreferences={item.alertPreferences}
                onDelete={handleDeleteConfirmation}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
              No hay contactos disponibles.
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Modal de Edición */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Editar contacto</Text>
            <TextInput
              placeholder="Nombre Completo"
              style={styles.input}
              value={updatedData.nombreCompleto}
              onChangeText={(text) => setUpdatedData({ ...updatedData, nombreCompleto: text })}
            />
            <TextInput
              placeholder="Celular"
              style={styles.input}
              value={updatedData.contactoCelular}
              onChangeText={(text) => setUpdatedData({ ...updatedData, contactoCelular: text })}
            />
            <TextInput
              placeholder="Dirección"
              style={styles.input}
              value={updatedData.contactoDireccion}
              onChangeText={(text) => setUpdatedData({ ...updatedData, contactoDireccion: text })}
            />
            <TextInput
              placeholder="Correo"
              style={styles.input}
              value={updatedData.contactoCorreo}
              onChangeText={(text) => setUpdatedData({ ...updatedData, contactoCorreo: text })}
            />
            <Text style={styles.label}>Opciones de alerta:</Text>
            {['SMS', 'Email'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.checkboxContainer}
                onPress={() => handleCheckboxToggle(option)}
              >
                <Ionicons
                  name={updatedData.alertPreferences[option] ? 'checkbox' : 'square-outline'}
                  size={20}
                  color={Colors.primary}
                />
                <Text style={styles.checkboxLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal visible={deleteModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>¿Deseas eliminar este contacto?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.saveButton1, { backgroundColor: Colors.primary }]}
                onPress={confirmDelete}
              >
                <Text style={[styles.saveButtonText, { color: Colors.secondary }]}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton1, { backgroundColor: Colors.secondary }]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={[styles.saveButtonText, { color: 'black' }]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 15,
  },
  label: {
    fontSize: 10.9,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButton1: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: 'inter-semibold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalBox: {
    width: '95%',
    backgroundColor: Colors.tertiary,
    borderRadius: 15,
    padding: 20,
    position: 'relative',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 4,
    marginLeft: 8,
    padding: 5,
  },
  editButton: {
    backgroundColor: Colors.primary,
  },
  deleteButton: {
    backgroundColor: '#E53935',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
});