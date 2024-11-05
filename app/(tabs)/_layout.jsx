import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import HomeScreen from './home';
import HistoryScreen from './history';
import ContactsScreen from './contacts';
import DeviceScreen from './device';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary,
        tabBarStyle: {
          backgroundColor: Colors.primary,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="history"
        component={HistoryScreen}
        options={{
          title: 'Historial',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="analytics" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="contacts"
        component={ContactsScreen}
        options={{
          title: 'Contactos',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="people-circle" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="device"
        component={DeviceScreen}
        options={{
          title: 'Dispositivo',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="bluetooth" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="person-circle" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
