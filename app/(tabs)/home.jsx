import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import ScreenTitle from '../../components/shared/ScreenTitle'
import Cards from '../../components/Home/Cards'
// import Panel from '../../components/Home/AvatarPanel/Panel'

export default function Home() {
  return (
    <View>
        <Header/>
        <ScreenTitle title="Signos Vitales" />
        {/* <Cards/> */}
    </View>
  )
}