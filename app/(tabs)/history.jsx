import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/shared/Header';
import ScreenTitle from '../../components/shared/ScreenTitle'

export default function History() {
  return (
    <View>
      <Header/>
      <ScreenTitle title="Historial" />
    </View>
  )
}