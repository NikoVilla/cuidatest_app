import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/shared/Header';
import ScreenTitle from '../../components/shared/ScreenTitle';

export default function Contacts() {
  return (
    <View>
        <Header/>
        <ScreenTitle title="Contactos de emergencias" />
    </View>
  )
}