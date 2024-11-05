import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, CheckBox } from 'react-native';
import Colors from './../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatRUT, formatFecha } from './../../constants/formatters';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [rut, setRut] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
          placeholder="RUT"
          value={rut}
          onChangeText={(text) => formatRUT(text, setRut)} 
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
            tintColors={{ true: Colors.primary, false: '#000' }}
          />
          <Text style={styles.checkboxText}>Recordar sesión</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('(tabs)')}>
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
    fontFamily: 'roboto',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.primary,
  },
  checkboxText: {
    marginLeft: 8,
    color: '#000',
    fontFamily: 'nunito-semibold',
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