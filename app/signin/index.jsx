import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Picker, Text, TextInput, TouchableOpacity } from 'react-native';
import Colors from './../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { formatRUT, formatFecha } from './../../constants/formatters';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignInScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [rut, setRut] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [celular, setCelular] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require('./../../assets/images/X4.png')} style={styles.image} />
        <Text style={styles.headerText}>CUIDATEST</Text>
      </View>
      <View style={styles.bottomSection}>
        <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.titleText}>Registro</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 4 }]}
              placeholder="RUT"
              value={rut}
              onChangeText={(text) => formatRUT(text, setRut)} 
            />
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 4 }]}
              placeholder="Fecha de nacimiento"
              value={fechaNacimiento}
              onChangeText={(text) => formatFecha(text, setFechaNacimiento)}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 4 }]}
              placeholder="Nombres"
              value={nombres}
              onChangeText={setNombres}
            />
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 4 }]}
              placeholder="Apellidos"
              value={apellidos}
              onChangeText={setApellidos}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Picker
              selectedValue={genero}
              style={[styles.input, { flex: 1, marginRight: 4 }]}
              onValueChange={(itemValue) => setGenero(itemValue)}
            >
              <Picker.Item label="Género" value="" enabled={false} />
              <Picker.Item label="Hombre" value="Hombre" />
              <Picker.Item label="Mujer" value="Mujer" />
            </Picker>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 4 }]}
              placeholder="Celular"
              value={celular}
              onChangeText={setCelular}
              // Agrega +569 al apretar el box
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            value={direccion}
            onChangeText={setDireccion}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={correo}
            onChangeText={setCorreo}
          />
          <View style={styles.passwordContainer}>
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
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login/index')}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login/index')}>
              <Text style={styles.signupLink}>Inicia sesión aquí</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.6,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
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
    flexShrink: 1,
  },
  headerText: {
    color: Colors.tertiary,
    fontSize: 35,
    fontFamily: 'roboto',
    textAlign: 'center',
    flexShrink: 1,
    flexGrow: 1,
  },
  titleText: {
    fontFamily: 'iceberg',
    fontSize: 30,
    color: Colors.negro,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
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
});