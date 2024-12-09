import React, { useState } from 'react';
import { View, Text } from 'react-native';
import ScreenTitle from '../../components/shared/ScreenTitle';
import Header from '../../components/shared/Header';
import Battery from '../../components/Device/Battery';
import Conextion from '../../components/Device/Conextion';


export default function Device() {
  return (
    <View>
        <Header/>
        <ScreenTitle title="Dispositivo" />
        {/* <Conextion/> */}
        {/* <ScreenTitle title="Información del dispositivo" /> */}
        <Battery/>
    </View>
  )
}