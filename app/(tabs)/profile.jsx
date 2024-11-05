import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../components/shared/Header';
import ScreenTitle from '../../components/shared/ScreenTitle';
import Modal from '../../components/Profile/Modal';

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <ScreenTitle title="Perfil" />
        <Modal />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flexGrow: 1,
  },
};
