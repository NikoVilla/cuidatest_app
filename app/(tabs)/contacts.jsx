import { View, Text, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';  // Asegúrate de importar useEffect
import { getAuth, onAuthStateChanged, updatePassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'; 
import Header from '../../components/shared/Header';
import ScreenTitle from '../../components/shared/ScreenTitle';
import HeaderActions from '../../components/Contacts/HeaderActions';
import CustomModal from '../../components/Contacts/Modal';
import Card from '../../components/Contacts/Card';
import appFirebase from './../auth/credentials';

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export default function Contacts() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'Usuarios', user.email);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUserData({ ...data, correo: user.email });
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario: ", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Header />
      <ScreenTitle title="Contactos de emergencias SMS" />
      <HeaderActions openModal={openModal} />
      <Card/>
      <CustomModal visible={modalVisible} onClose={closeModal} userData={userData}/>
    </View>
  );
}
