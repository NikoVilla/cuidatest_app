import React, { useState } from 'react';
import { Alert, View, Image, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import Colors from './../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import appFirebase from './../auth/credentials'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth(appFirebase)

export default function LoginScreen(props) {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [correo, setCorreo] = useState();
  const [contrasena, setContrasena] = useState();

  const login = async()=>{
    try {
      await signInWithEmailAndPassword(auth, correo, contrasena)
      Alert.alert('Ingreso exitoso','Bienvenido')
      props.navigation.navigate('(tabs)')
    } catch (error) {
      console.log(error);
      Alert.alert('Credenciales incorrectas','El usuario o contraseña es incorrecto...')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require('./../../assets/images/X4.png')} style={styles.image} />
        <Text style={styles.headerText}>CUIDATEST</Text>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.titleText}>Ingreso</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={correo}
          onChangeText={(text) => setCorreo(text)}
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={contrasena}
            onChangeText={(text) => setContrasena(text)}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('signUp/index')}>
            <Text style={styles.signupLink}>Regístrate aquí</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1.2,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2, 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  bottomSection: {
    flex: 2,
    backgroundColor: Colors.secondary,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },  
  headerText: {
    color: Colors.tertiary,
    fontSize: 38,
    fontFamily: 'roboto'
  },
  titleText: {
    fontFamily: 'iceberg',
    fontSize: 30,
    color: Colors.negro,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 11,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.tertiary,
    fontFamily: 'iceberg',
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#000',
    fontFamily: 'nunito-semibold',
    fontSize: 14,
  },
  signupLink: {
    color: Colors.primary,
    fontFamily: 'nunito-bold',
    fontSize: 14,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
});