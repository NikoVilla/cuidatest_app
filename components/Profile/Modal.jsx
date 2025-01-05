import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getAuth, onAuthStateChanged, updatePassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import appFirebase from './../../app/auth/credentials';
import { validateRUT, validatePhone } from '../../constants/validators';
import { formatRUT, formatFecha, formatCelular } from '../../constants/formatters';

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

const AvatarInitials = ({ nombres, apellidos }) => {
  const getInitials = (nombres, apellidos) => {
    const firstNameInitial = nombres ? nombres.charAt(0).toUpperCase() : '';
    const lastNameInitial = apellidos ? apellidos.charAt(0).toUpperCase() : '';
    return `${firstNameInitial}${lastNameInitial}`;
  };

  return (
    <View >
      <Text style={styles.headerText}>{getInitials(nombres, apellidos)}</Text>
    </View>
  );
};

export default function Modal() {
  const [showPassword, setShowPassword] = useState(false);
  const [rut, setRut] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [celular, setCelular] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const [condicion, setCondicion] = useState('');
  const [alergias, setAlergias] = useState('');
  const [medicamentos, setMedicamentos] = useState('');

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!rut || !validateRUT(rut)) {newErrors.rut = "RUT inválido";}
    if (!nombres) newErrors.nombres = true;
    if (!apellidos) newErrors.apellidos = true;
    if (!fechaNacimiento) newErrors.fechaNacimiento = true;
    if (!celular || !validatePhone(celular)) {newErrors.celular = "N° de celular inválido";}
    if (!direccion) newErrors.direccion = true;
    if (!correo || !/\S+@\S+\.\S+/.test(correo)) newErrors.correo = true;
    if (contrasena && contrasena.length < 6) {newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres.";}    

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'Usuarios', user.email);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUserData({ ...data, correo: user.email });
            setRut(userDocSnap.data().rut || '');
            setNombres(userDocSnap.data().nombres || '');
            setApellidos(userDocSnap.data().apellidos || '');
            setFechaNacimiento(userDocSnap.data().fechaNacimiento || '');
            setCelular(userDocSnap.data().celular || '');
            setDireccion(userDocSnap.data().direccion || '');
            setCorreo(userDocSnap.data().correo || '');
            setCondicion(userDocSnap.data().condicion || '');
            setAlergias(userDocSnap.data().alergias || '');
            setMedicamentos(userDocSnap.data().medicamentos || '');
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

  const handleFocus = (field) => {
    if (errors[field]) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }));
    }
  };

  const handleRegister = async () => {
    setIsSubmitted(true);
    // setLoading(true);
    console.log('Validando formulario...');
    
    if (validateForm()) {
      console.log('Formulario válido. Actualizando datos...');
      setFormError('');

      if (!userData || !userData.correo) {
        console.error("No se pudo obtener el UID del usuario.");
        return;
      }

      try {
        const userDocRef = doc(db, 'Usuarios', userData.correo);
        const updatedData = {
          rut,
          nombres,
          apellidos,
          fechaNacimiento,
          celular,
          direccion,
          condicion,
          alergias,
          medicamentos,
        };
  
        await updateDoc(userDocRef, updatedData);
        console.log('Datos actualizados en Firestore.');
  
        // Actualizar la contraseña si es válida
        if (contrasena && contrasena.length >= 6) {
          const user = auth.currentUser;
          if (user) {
            await updatePassword(user, contrasena);
            console.log('Contraseña actualizada correctamente.');
          }
        }
      } catch (error) {
        console.error('Error al actualizar datos:', error);
      }
    } else {
      console.log('Errores en el formulario:', errors);
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.box}>
          <AvatarInitials nombres={nombres} apellidos={apellidos} />
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
          editable={false}
          onFocus={() => handleFocus('correo')}
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nueva Contraseña (opcional)"
            value={contrasena}
            onChangeText={setContrasena}
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
            value={condicion}
            onChangeText={setCondicion}
            onSubmitEditing={() => setCondicion(condicion + '\n')} 
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.medicalInput}
            placeholder="Alergias"
            multiline
            value={alergias}
            onChangeText={setAlergias} 
            onSubmitEditing={() => setAlergias(alergias + '\n')}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.medicalInput}
            placeholder="Medicamentos actuales"
            multiline 
            value={medicamentos}
            onChangeText={setMedicamentos} 
            onSubmitEditing={() => setMedicamentos(medicamentos + '\n')}
          />
        </View>      
        <TouchableOpacity 
            style={styles.button}
            onPress={handleRegister}
            // disabled={loading}
        >
            <Text style={styles.buttonText}>Confirmar datos</Text>
            {/* <Text style={styles.buttonText}>{loading ? 'Actualizando...' : 'Confirmar datos'}</Text> */}
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
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 15,
    minWidth: 150,
    minHeight: 50, 
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