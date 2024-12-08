import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Modal() {
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

  const [conditions, setConditions] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFocus = (field) => {
    if (errors[field]) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    setIsSubmitted(true);
    if (validateForm()) {
      setFormError('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.box}>
          <Text style={styles.headerText}>NV</Text>
        </View>
        <Text style={styles.titleText}>Datos personales</Text>
        
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.rut && styles.errorInput]}
              placeholder={errors.rut ? errors.rut : "RUT"}
              value={rut}
              onChangeText={setRut}
              onFocus={() => handleFocus('rut')}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.fechaNacimiento && styles.errorInput]}
              placeholder={errors.fechaNacimiento ? "Campo obligatorio" : "Fecha de nacimiento"}
              value={fechaNacimiento}
              onChangeText={setFechaNacimiento}
              onFocus={() => handleFocus('fechaNacimiento')}
            />
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.nombres && styles.errorInput]}
              placeholder={errors.nombres ? "Campo obligatorio" : "Nombres"}
              value={nombres}
              onChangeText={setNombres}
              onFocus={() => handleFocus('nombres')}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.apellidos && styles.errorInput]}
              placeholder={errors.apellidos ? "Campo obligatorio" : "Apellidos"}
              value={apellidos}
              onChangeText={setApellidos}
              onFocus={() => handleFocus('apellidos')}
            />
          </View>
        </View>
        
        <View style={styles.row}>
          {/* <View style={styles.inputContainer}>
            <Picker
              selectedValue={genero}
              style={[styles.input, isSubmitted && genero === "" && { color: 'red' }]}
              onValueChange={(itemValue) => setGenero(itemValue)}
            >
              <Picker.Item label="Género" value="" />
              <Picker.Item label="Hombre" value="Hombre" />
              <Picker.Item label="Mujer" value="Mujer" />
            </Picker>
          </View> */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.celular && styles.errorInput]}
              placeholder={errors.celular ? errors.celular : "Celular"}
              value={celular}
              onChangeText={setCelular}
              onFocus={() => handleFocus('celular')}
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
        
        {formError ? <Text style={styles.errorText}>{formError}</Text> : null}
        
        <Text style={styles.titleText}>Datos médicos</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.medicalInput}
            placeholder="Condiciones preexistentes"
            multiline
            value={conditions}
            onChangeText={setConditions}
            onSubmitEditing={() => setConditions(conditions + '\n')} 
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.medicalInput}
            placeholder="Alergias"
            multiline
            value={allergies}
            onChangeText={setAllergies} 
            onSubmitEditing={() => setAllergies(allergies + '\n')}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.medicalInput}
            placeholder="Medicamentos actuales"
            multiline 
            value={medications}
            onChangeText={setMedications} 
            onSubmitEditing={() => setMedications(medications + '\n')}
          />
        </View>      
        <TouchableOpacity 
            style={styles.button}
            onPress={handleRegister}
        >
            <Text style={styles.buttonText}>Confirmar datos</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  box: {
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    marginRight: 4,
  },
  headerText: {
    color: Colors.tertiary,
    fontSize: 40,
    fontFamily: 'inter-bold',
    textAlign: 'center',
    flexShrink: 1,
  },
  titleText: {
    fontFamily: 'inter-semibold',
    fontSize: 14,
    color: Colors.negro,
    textAlign: 'left',
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
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
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  button: {
    backgroundColor: Colors.verde,
    borderRadius: 10,
    marginTop: 13,
    paddingVertical: 12,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.tertiary,
    fontSize: 16,
    fontFamily: 'inter-bold',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});