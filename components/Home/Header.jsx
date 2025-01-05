import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState} from 'react';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import appFirebase from './../../app/auth/credentials';

const { height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.18;

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export default function Header() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'Usuarios', user.email);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.log('No existe información del usuario.');
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      } else {
        console.log('No hay ningún usuario logueado.');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={[styles.container, { height: HEADER_HEIGHT }]}>
      <View style={styles.leftSection}>
        <Image 
          source={require('./../../assets/images/X4.png')} 
          style={styles.image} 
          resizeMode="contain" 
        />
        <Text style={styles.cuidatext}>CUIDATEST</Text>
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.welcomeText}>Bienvenido de nuevo</Text>
        <Text style={styles.nameText}>
          {userData ? `${userData.nombres} ${userData.apellidos}` : 'Cargando...'}
        </Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('login/index')} style={styles.circle} > 
        <Ionicons name="log-out-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  leftSection: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 10
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
  },
  centerSection: {
    flex: 0.9,
    paddingLeft: 5,
  },
  welcomeText: {
    color: Colors.tertiary,
    fontSize: 14,
    fontFamily: 'inter-medium',
    marginTop: 10,
  },
  nameText: {
    color: Colors.tertiary,
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: 'inter-medium',
    marginTop: 3,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  circleText: {
    color: Colors.primary,
    fontSize: 17,
    fontFamily: 'inter-semibold',
  },
});
