import { View, Text, Modal } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/shared/Header';
import ScreenTitle from '../../components/shared/ScreenTitle';
import HeaderActions from '../../components/Contacts/HeaderActions';
import CustomModal from '../../components/Contacts/Modal';
import Card from '../../components/Contacts/Card';

export default function Contacts() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Header />
      <ScreenTitle title="Contactos de emergencias" />
      <HeaderActions openModal={openModal} />
      <Card />
      <CustomModal visible={modalVisible} onClose={closeModal} />
    </View>
  );
}
