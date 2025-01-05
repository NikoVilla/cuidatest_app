import React, { useState } from 'react';
import { Alert, View, Image, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { formatRUT, formatFecha, formatCelular } from '../../constants/formatters';
import { validateRUT, validatePhone } from '../../constants/validators';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import appFirebase from './../auth/credentials';

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [rut, setRut] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [celular, setCelular] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [condicion, setCondicion] = useState('');
  const [alergias, setAlergias] = useState('');
  const [medicamentos, setMedicamentos] = useState('');

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!rut || !validateRUT(rut)) {newErrors.rut = "RUT inválido";}
    if (!nombres) newErrors.nombres = true;
    if (!apellidos) newErrors.apellidos = true;
    if (!fechaNacimiento) newErrors.fechaNacimiento = true;
    if (!celular || !validatePhone(celular)) {newErrors.celular = "N° de celular inválido";}
    if (!direccion) newErrors.direccion = true;
    if (!correo || !/\S+@\S+\.\S+/.test(correo)) newErrors.correo = true;
    if (!contraseña || contraseña.length < 6) newErrors.contraseña = true;
    if (!condicion) newErrors.condicion = true;
    if (!alergias) newErrors.alergias = true;
    if (!medicamentos) newErrors.medicamentos = true;

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    setIsSubmitted(true);
    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
        const user = userCredential.user;

        await setDoc(doc(db, 'Usuarios', correo), {
          rut,
          nombres,
          apellidos,
          fechaNacimiento,
          celular,
          direccion,
          correo,
          condicion,
          alergias,
          medicamentos,
        });
  
        setFormError('');
        Alert.alert('Registro exitoso', 'El usuario se ha registrado correctamente.');
        navigation.navigate('login/index');
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Error al registrar usuario. Intenta nuevamente.');
      }
    }
  };

  const handleFocus = (field) => {
    if (errors[field]) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
    }
  };

  return (
    //Implementar scroll para aqui como en profile
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('login/index')}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('./../../assets/images/X4.png')} style={styles.image} />
        <Text style={styles.headerText}>CUIDATEST</Text>
      </View>
      <View style={styles.bottomSection}>
        <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.titleText}>Registro</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 4 }}>
              <TextInput
                style={[styles.input, errors.rut && styles.errorInput]}
                placeholder={errors.rut ? errors.rut : "RUT"}
                value={rut}
                onChangeText={(text) => formatRUT(text, setRut)} 
                onFocus={() => handleFocus('rut')}
              />
            </View>
            <View style={{ flex: 1, marginRight: 4 }}>
              <TextInput
                style={[styles.input, errors.fechaNacimiento && styles.errorInput]}
                placeholder={errors.fechaNacimiento ? "Campo obligatorio" : "Fecha de nacimiento"}
                value={fechaNacimiento}
                onChangeText={(text) => formatFecha(text, setFechaNacimiento)}
                onFocus={() => handleFocus('fechaNacimiento')}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 4 }}>
              <TextInput
                style={[styles.input, errors.nombres && styles.errorInput]}
                placeholder={errors.nombres ? "Campo obligatorio" : "Nombres"}
                value={nombres}
                onChangeText={setNombres}
                onFocus={() => handleFocus('nombres')}
              />
            </View>
            <View style={{ flex: 1, marginRight: 4 }}>
              <TextInput
                style={[styles.input, errors.apellidos && styles.errorInput]}
                placeholder={errors.apellidos ? "Campo obligatorio" : "Apellidos"}
                value={apellidos}
                onChangeText={setApellidos}
                onFocus={() => handleFocus('apellidos')}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 4 }}>
              <TextInput
                style={[styles.input, errors.celular && styles.errorInput]}
                placeholder={errors.celular ? errors.celular : "Celular"}
                value={celular}
                onChangeText={(text) => formatCelular(text, setCelular)}
                onFocus={() => {
                  handleFocus('celular')
                  if (!celular.startsWith('+569')) {
                    setCelular('+569');
                  }
                }}
                maxLength={12}
                keyboardType="phone-pad"
              />
            </View>
          </View>
          <TextInput
            style={[styles.input, errors.direccion && styles.errorInput]}
            placeholder={errors.direccion ? "Campo obligatorio" : "Dirección"}
            value={direccion}
            onChangeText={setDireccion}
            onFocus={() => handleFocus('direccion')}
          />
          <TextInput
            style={[styles.input, errors.correo && styles.errorInput]}
            placeholder={errors.correo ? "Campo obligatorio" : "Correo"}
            value={correo}
            onChangeText={setCorreo}
            onFocus={() => handleFocus('correo')}
          />
          <View>
            <TextInput
              style={[styles.input, errors.contraseña && styles.errorInput]}
              placeholder={errors.contraseña ? "Campo obligatorio" : "Contraseña"}
              value={contraseña}
              onChangeText={setContraseña}
              secureTextEntry={!showPassword}
              onFocus={() => handleFocus('contraseña')}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleText1}>Datos médicos</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.medicalInput, errors.condicion && styles.errorInput]}
              placeholder={errors.condicion ? "Campo obligatorio" : "Condiciones preexistentes"}
              multiline
              value={condicion}
              onChangeText={setCondicion}
              onSubmitEditing={() => setCondicion(condicion + '\n')} 
              onFocus={() => handleFocus('condicion')}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.medicalInput, errors.condicion && styles.errorInput]}
              placeholder={errors.condicion ? "Campo obligatorio" :"Alergias"}
              multiline
              value={alergias}
              onChangeText={setAlergias} 
              onSubmitEditing={() => setAlergias(alergias + '\n')}
              onFocus={() => handleFocus('alergias')}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.medicalInput, errors.condicion && styles.errorInput]}
              placeholder={errors.condicion ? "Campo obligatorio" :"Medicamentos actuales"}
              multiline 
              value={medicamentos}
              onChangeText={setMedicamentos} 
              onSubmitEditing={() => setMedicamentos(medicamentos + '\n')}
              onFocus={() => handleFocus('medicamentos')}
            />
          </View>    
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
          {/* {formError ? <Text style={styles.formErrorText}>{formError}</Text> : null} */}
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
  medicalInput: {
    height: 70,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
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
  titleText1: {
    fontFamily: 'inter-semibold',
    fontSize: 14,
    color: Colors.negro,
    textAlign: 'left',
    marginBottom: 10,
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
  inputContainer: {
    flex: 1,
    marginRight: 4,
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
  backButton: {
    position: 'absolute',
    left: 1,
    top: 15,
    padding: 10,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
});