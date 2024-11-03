import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Colors from '../../constants/Colors'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:Colors.secondary,
        tabBarStyle: {
          backgroundColor: Colors.primary, 
        },
      }}
    >
        <Tabs.Screen name='home'
          options={{
            title:'Inicio',
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="home" size={24} color={color} />
          }}
        />
        <Tabs.Screen name='history'
          options={{
            title:'Historial',
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="analytics" size={24} color={color} />
          }}
        />
        <Tabs.Screen name='contacts'
          options={{
            title:'Contactos',
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color={color} />
          }}
        />
        <Tabs.Screen name='device'
          options={{
            title:'Dispositivos',
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="bluetooth" size={24} color={color} />
          }}
        />
        <Tabs.Screen name='profile'
          options={{
            title:'Perfil',
            headerShown:false,
            tabBarIcon:({color})=><Ionicons name="person-circle" size={24} color={color} />
          }}
        />
    </Tabs>
  )
}