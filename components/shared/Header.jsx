import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from './../../constants/Colors';

const { height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.15;

export default function Header() {
  return (
    <View style={[styles.container, { height: HEADER_HEIGHT }]}>
      <View style={styles.centerContainer}>
        <Image 
          source={require('./../../assets/images/X4.png')} 
          style={styles.image} 
          resizeMode="contain" 
        />
        <Text style={styles.cuidatext}>CUIDATEST</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  leftContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSpacer: {
    width: 40,
  },
  image: {
    marginTop: 20,
    width: 60,
    height: 50,
  },
  cuidatext: {
    color: Colors.tertiary,
    fontSize: 14,
    fontFamily: 'roboto',
    marginTop: 8,
    textAlign: 'center',
  },
});