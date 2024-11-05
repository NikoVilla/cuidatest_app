import { View, Text } from 'react-native';
import React from 'react';
import Colors from './../../constants/Colors';

export default function ScreenTitle({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = {
  container: {
    width: '100%',
    height: 35,
    backgroundColor: Colors.Stitles,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    color: Colors.primary,
    fontFamily: 'inter-bold',
    fontSize: 20,
  },
};
