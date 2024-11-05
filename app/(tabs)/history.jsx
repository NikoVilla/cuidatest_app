import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/shared/Header';
import ScreenTitle from '../../components/shared/ScreenTitle'
import HeaderActions from '../../components/History/HeaderActions';
import Modal from '../../components/History/Modal';

export default function History() {
  return (
    <View>
        <Header/>
        <ScreenTitle title="Historial" />
        <HeaderActions/>
        <Modal/>
    </View>
  )
}