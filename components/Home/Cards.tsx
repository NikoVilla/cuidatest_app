import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Colors from "../../constants/Colors";
// import DeviceModal from "./DeviceModal";
// import useBLE from "../shared/useBLE";
import Ionicons from "@expo/vector-icons/Ionicons";
import FirestoreService from "./firestoreService";
import * as Location from 'expo-location';
import axios from "axios";
import { getAuth, onAuthStateChanged, updatePassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, onSnapshot, collection, updateDoc, getDocs } from 'firebase/firestore';
import appFirebase from './../../app/auth/credentials';
import base64 from "react-native-base64";
import { SendDirectSms } from 'react-native-send-direct-sms';
import * as SMS from "expo-sms";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

type CardProps = {
  title: string;
  number: string | number;
  range: string;
  status: "Normal" | "Crítico";
};

interface LocationType {
  latitude: number;
  longitude: number;
}

function Card({ title, number, range, status }: CardProps) {
  const statusColor = status === "Normal" ? "green" : "red";

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.range}>{range}</Text>
      <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
    </View>
  );
}

export default function Cards() {
  // const {
  //   allDevices,
  //   connectedDevice,
  //   connectToDevice,
  //   requestPermissions,
  //   scanForPeripherals,
  //   sensorData,
  // } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [heartRate, setHeartRate] = useState<string | number>("--");
  const [temperature, setTemperature] = useState<string | number>("--");
  const [angularVelocity, setAngularVelocity] = useState<string | number>("--");
  const [angularVelocity2, setAngularVelocity2] = useState<string | number>("--");
  // const connectionStatus = connectedDevice ? "Conectado" : "Desconectado";
  const [age, setAge] = useState<number>(50);
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [userData, setUserData] = useState(null);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [color, setColor] = useState("white");
  const [sensorData, setSensorData] = useState<string[]>(["", "", "", ""]);
  const [smsStatus, setSmsStatus] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'Usuarios', user.email);
          const userDocSnap = await getDoc(userDocRef);
  
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();

            setUserData(data);
          } else {
            console.log("El documento no existe.");
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      }
    });
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'Usuarios'),
      async (snapshot) => {
        const usersData: any[] = [];
  
        for (const docSnapshot of snapshot.docs) {
          const userId = docSnapshot.id;
          const userData = docSnapshot.data();
  
          try {
            const contactoSnapshot = await getDocs(collection(db, `Usuarios/${userId}/Contacto`));
  
            const userContacts = [];

            contactoSnapshot.forEach((contactDoc) => {
              const contactoData = contactDoc.data();

              usersData.push({
                id: contactDoc.id,
                alertPreferences: contactoData.alertPreferences || '',
                ...contactoData,
              });
            });
                    
            usersData.push({
              id: userId,
              ...userData,
              contactoData: userContacts.length > 0 ? userContacts : undefined,
            });
          } catch (error) {
            console.error(`Error al obtener contactos para el usuario ${userId}:`, error);
          }
        }
     
        setUsersData(usersData);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  
    return () => unsubscribe();
  }, []);
  
  // Función para refrescar la ubicación
  const refreshLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permiso para acceder a la ubicación denegado');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshLocation();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    refreshLocation();
  }, []);

  const getStatus = (value: number, range: [number, number]) =>
    value >= range[0] && value <= range[1] ? "Normal" : "Crítico";

  // tipo de paciente según la edad
  const getPatientType = (age: number) => {
    if (age <= 1) return "Infante";
    if (age <= 12) return "Niño";
    if (age <= 60) return "Adulto";
    return "Anciano";
  };

  // Simulador
  const generateRandomValues = async () => {
    const heartRateRange: [number, number] = [60, 70];
    const temperatureRange: [number, number] = [35, 40];
    const angularVelocityRange: [number, number] = [-2, 0];
    const angularVelocityRange2: [number, number] = [3, 3.1];

    const newHeartRate = Math.floor(
      Math.random() * (heartRateRange[1] - heartRateRange[0] + 1)
    ) + heartRateRange[0];
    const newTemperature = Math.floor(
      Math.random() * (temperatureRange[1] - temperatureRange[0] + 1)
    ) + temperatureRange[0];
    const newAngularVelocity = Math.floor(
      Math.random() * (angularVelocityRange[1] - angularVelocityRange[0] + 1)
    ) + angularVelocityRange[0];
    const newAngularVelocity2 = Math.floor(
      Math.random() * (angularVelocityRange2[1] - angularVelocityRange2[0] + 1)
    ) + angularVelocityRange2[0];

    setHeartRate(newHeartRate);
    setTemperature(newTemperature);
    setAngularVelocity(newAngularVelocity);
    setAngularVelocity2(newAngularVelocity2);

    // Guardar los valores actuales en Firebase
  //   if (location) {
  //     try {
  //       await FirestoreService.saveVitalSigns({
  //         heartRate: newHeartRate,
  //         temperature: newTemperature,
  //         angularVelocity: newAngularVelocity,
  //         geolocalizacion: location, 
  //       });
  //     } catch (error) {
  //       Alert.alert("Error", "No se pudieron guardar los signos vitales.");
  //     }
  //   }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      generateRandomValues();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // Combinación de sv, emergencia
  const checkForEmergencies = () => {
    const heartRateNum = Number(heartRate);
    const tempNum = Number(temperature);
    const angularVelocityNumY = Number(angularVelocity);
    const angularVelocityNumZ = Number(angularVelocity2);
  
    let heartRateCritical = false;
    switch (getPatientType(age)) {
      case "Infante":
        if (heartRateNum < 80 || heartRateNum > 160) {
          heartRateCritical = true;
        }
        break;
      case "Niño":
        if (heartRateNum < 80 || heartRateNum > 100) {
          heartRateCritical = true;
        }
        break;
      case "Adulto":
        if (heartRateNum < 60 || heartRateNum > 80) {
          heartRateCritical = true;
        }
        break;
      case "Anciano":
        if (heartRateNum < 60) {
          heartRateCritical = true;
        }
        break;
      default:
        break;
    }

    // Temperatura fuera de rango
    const tempCritical = tempNum < 35 || tempNum > 40;
    // Eje Y fuera de rango
    const angularVelocityCriticalY = angularVelocityNumY < -5.1 || angularVelocityNumY > 1.1;
    // Eje Z fuera de rango
    const angularVelocityCriticalZ = angularVelocityNumZ < 2.5 || angularVelocityNumZ > 4.1;


    // Enviar correo si la frecuencia cardíaca está crítica
    if (heartRateCritical) {
      sendEmergencyEmail(heartRateNum, tempNum, angularVelocityNumY, angularVelocityNumZ);
      sendAlertSMS(heartRateNum, tempNum, angularVelocityNumY, angularVelocityNumZ);
    }

    // Combinaciones de condiciones críticas
    if (heartRateCritical && tempCritical) {
      sendEmergencyEmail(heartRateNum, tempNum, angularVelocityNumY, angularVelocityNumZ);
      sendAlertSMS(heartRateNum, tempNum, angularVelocityNumY, angularVelocityNumZ);
    }

    if (heartRateCritical && tempNum) {
      sendEmergencyEmail(heartRateNum, tempNum, angularVelocityNumY, angularVelocityNumZ);
      sendAlertSMS(heartRateNum, tempNum, angularVelocityNumY, angularVelocityNumZ);
    }

    // Condiciones para los ejes Y y Z
    if ((angularVelocityCriticalY || angularVelocityCriticalZ) && heartRateCritical) {
      sendEmergencyEmail(heartRateNum, tempNum, angularVelocityNumY, angularVelocityNumZ);
      sendAlertSMS(heartRateNum, tempNum, angularVelocityNumY, angularVelocityNumZ);
    }
    
    // Si ambos ejes están fuera de rango
    if (angularVelocityCriticalY && angularVelocityCriticalZ) {
      sendEmergencyEmail(heartRateNum, tempNum, angularVelocityNumY, angularVelocityNumZ);
      sendAlertSMS(heartRateNum, tempNum, angularVelocityNumY, angularVelocityNumZ);
    }
  };

  useEffect(() => {
    checkForEmergencies(); 
  }, [heartRate, temperature, angularVelocity, age]);

  //   // Combinaciones de condiciones críticas:
  //   if (heartRateCritical && tempCritical) {
  //     showEmergencyAlert("Frecuencia cardíaca elevada y temperatura alta", 
  //       `Frecuencia cardíaca: ${heartRateNum}, Temperatura: ${tempNum}°C`);
  //   } 
  //   else if (heartRateCritical && tempNum < 36) {
  //     showEmergencyAlert("Frecuencia cardíaca elevada y temperatura baja", 
  //       `Frecuencia cardíaca: ${heartRateNum}, Temperatura: ${tempNum}°C`);
  //   }
  //   else if (heartRateCritical) {
  //     showEmergencyAlert("Frecuencia cardíaca elevada", heartRateNum);
  //   } 
  // };

  // const showEmergencyAlert = (message: string, value: number | string) => {
  //   Alert.alert("¡Emergencia!", `${message} fuera de rango: ${value}`, [
  //     { text: "Cerrar", style: "cancel" },
  //   ]);
  // };
  
  // const sendAlertSMS = async (
  //   heartRateNum: number,
  //   tempNum: number,
  //   angularVelocityNumY: number,
  //   angularVelocityNumZ: number,
  // ) => {
  //   const isAvailable = await SMS.isAvailableAsync();
  
  //   if (!isAvailable) {
  //     Alert.alert("Error", "El servicio de SMS no está disponible en este dispositivo.");
  //     return;
  //   }
  
  //   if (!userData) {
  //     Alert.alert("Error", "Los datos del usuario no están disponibles.");
  //     return;
  //   }
  
  //   // Filtrar contactos con preferencia de alertas por SMS
  //   const smsRecipients = usersData
  //     .filter(contact => contact.alertPreferences?.SMS === true)
  //     .map(contact => contact.contactoCelular);
  
  //   if (smsRecipients.length === 0) {
  //     // Alert.alert("Error", "No hay destinatarios configurados para recibir alertas.");
  //     return;
  //   }
  
  //   // Validar datos biométricos
  //   const validHeartRate = isNaN(heartRateNum) ? "No disponible" : heartRateNum;
  //   const validTemp = isNaN(tempNum) ? "No disponible" : tempNum;
  //   const validAngularVelocityY = isNaN(angularVelocityNumY) ? "No disponible" : angularVelocityNumY;
  //   const validAngularVelocityZ = isNaN(angularVelocityNumZ) ? "No disponible" : angularVelocityNumZ;
  
  //   // Crear mensaje
  //   const message = `Datos del Paciente:
  // Nombre: ${userData.nombres || "No disponible"}
  // Apellido: ${userData.apellidos || "No disponible"}
  // Fecha de nacimiento: ${userData.fechaNacimiento || "No disponible"}
  // Correo electrónico: ${userData.correo || "No disponible"}
  // Dirección: ${userData.direccion || "No disponible"}
  // Teléfono: ${userData.celular || "No disponible"}
  
  // Historial Médico:
  // Condición: ${userData.condicion || "No disponible"}
  // Alergias: ${userData.alergias || "No disponible"}
  // Medicamentos: ${userData.medicamentos || "No disponible"}
  
  // Datos de los sensores biométricos:
  // Frecuencia cardiaca: ${validHeartRate}
  // Temperatura: ${validTemp}
  // Posición corporal: Eje Y: ${validAngularVelocityY}, Eje Z: ${validAngularVelocityZ}
  
  // Ubicación: https://www.google.com/maps?q=${location.latitude},${location.longitude}
  
  // Última imagen tomada por el sensor de cámara: imagen.png
  //   `;
  
  //   // Enviar SMS
  //   try {
  //     const { result } = await SMS.sendSMSAsync(smsRecipients, message);
  
  //     if (result === 'sent') {
  //       Alert.alert("Éxito", "El SMS fue enviado correctamente.");
  //     } else {
  //       Alert.alert("Advertencia", "El SMS no fue enviado.");
  //     }
  //   } catch (error) {
  //     console.error("Error al enviar el SMS:", error);
  //     Alert.alert("Error", "Ocurrió un problema al enviar el SMS.");
  //   }
  // };
  
  const sendAlertSMS = async (
    heartRateNum: number,
    tempNum: number,
    angularVelocityNumY: number,
    angularVelocityNumZ: number,
  ) => {
    if (!userData) {
      Alert.alert("Error", "Los datos del usuario no están disponibles.");
      return;
    }
  
    // Filtrar contactos con preferencia de alertas por SMS
    const smsRecipients = usersData
      .filter(contact => contact.alertPreferences?.SMS === true)
      .map(contact => contact.contactoCelular);
  
    if (smsRecipients.length === 0) {
      Alert.alert("Error", "No hay destinatarios configurados para recibir alertas.");
      return;
    }
  
    // Validar datos biométricos
    const validHeartRate = isNaN(heartRateNum) ? "No disponible" : heartRateNum;
    const validTemp = isNaN(tempNum) ? "No disponible" : tempNum;
    const validAngularVelocityY = isNaN(angularVelocityNumY) ? "No disponible" : angularVelocityNumY;
    const validAngularVelocityZ = isNaN(angularVelocityNumZ) ? "No disponible" : angularVelocityNumZ;
  
    // Crear mensaje
    const message = `Datos del Paciente:
  Nombre: ${userData.nombres || "No disponible"}
  Apellido: ${userData.apellidos || "No disponible"}
  Fecha de nacimiento: ${userData.fechaNacimiento || "No disponible"}
  Correo electrónico: ${userData.correo || "No disponible"}
  Dirección: ${userData.direccion || "No disponible"}
  Teléfono: ${userData.celular || "No disponible"}
  
  Historial Médico:
  Condición: ${userData.condicion || "No disponible"}
  Alergias: ${userData.alergias || "No disponible"}
  Medicamentos: ${userData.medicamentos || "No disponible"}
  
  Datos de los sensores biométricos:
  Frecuencia cardiaca: ${validHeartRate}
  Temperatura: ${validTemp}
  Posición corporal: Eje Y: ${validAngularVelocityY}, Eje Z: ${validAngularVelocityZ}
  
  Ubicación: https://www.google.com/maps?q=${location.latitude},${location.longitude}
  
  Última imagen tomada por el sensor de cámara: imagen.png
    `;
  
    // Enviar SMS directo
    try {
      smsRecipients.forEach(number => {
        SendDirectSms(number, message);
      });
  
      Alert.alert("Éxito", "El SMS fue enviado automáticamente a todos los destinatarios.");
    } catch (error) {
      console.error("Error al enviar el SMS:", error);
      Alert.alert("Error", "Ocurrió un problema al enviar el SMS.");
    }
  };
  

  const sendEmergencyEmail = async (
    heartRateNum: number,
    tempNum: number,
    angularVelocityNumY: number,
    angularVelocityNumZ: number,
  ) => {
    if (!userData) {
      Alert.alert("Error", "Los datos del usuario no están disponibles.");
      return;
    }

    const contacts = usersData;
    const emailRecipients = [];
    
    contacts.forEach(contact => {
      if (contact.alertPreferences?.Email === true) {
        emailRecipients.push(contact.contactoCorreo);
      }
    });

    if (emailRecipients.length === 0) {
      // Alert.alert("Preferencia de alerta", "Ningún contacto tiene habilitado el correo electrónico.");
      return;
    }

    console.log(emailRecipients);

    const validHeartRate = isNaN(heartRateNum) ? "No disponible" : heartRateNum;
    const validTemp = isNaN(tempNum) ? "No disponible" : tempNum;
    const validAngularVelocityY = isNaN(angularVelocityNumY) ? "No disponible" : angularVelocityNumY;
    const validAngularVelocityZ = isNaN(angularVelocityNumZ) ? "No disponible" : angularVelocityNumZ;

      const emailBody = `
        <p><strong>Datos del Paciente</strong></p>
        <p>Nombre: ${userData.nombres || "No disponible"}</p>
        <p>Apellido: ${userData.apellidos || "No disponible"}</p>
        <p>Fecha de nacimiento: ${userData.fechaNacimiento || "No disponible"}</p>
        <p>Correo electrónico: ${userData.correo || "No disponible"}</p>
        <p>Dirección: ${userData.direccion || "No disponible"}</p>
        <p>Teléfono: ${userData.celular || "No disponible"}</p>
        <p><strong>Historial Médico</strong></p>
        <p>Condición: ${userData.condicion || "No disponible"}</p>
        <p>Alergias: ${userData.alergias || "No disponible"}</p>
        <p>Medicamentos: ${userData.medicamentos || "No disponible"}</p>
        <br>
        <p><strong>Datos de los sensores biométricos:</strong></p>
        <p>Frecuencia cardiaca: ${validHeartRate}</p>
        <p>Temperatura: ${validTemp}</p>
        <p>Posición corporal: Eje Y: ${validAngularVelocityY}, Eje Z: ${validAngularVelocityZ}</p>
        <br>
        <p><strong>Ubicación: <a href="https://www.google.com/maps?q=${location.latitude},${location.longitude}" target="_blank">Ver en el mapa</a></strong></p>
        <p>Última imagen tomada por el sensor de cámara: imagen.png</p>
    `;
  
    try {
      const email = emailRecipients.join(",");
      const subject = "[CUIDATEST APP] Alerta de emergencia - Datos críticos";
      const message = emailBody;
  
      const url = `http://192.168.240.68:5000/?email=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(
        message
      )}`;
  
      // Realizar la solicitud GET
      const response = await fetch(url, {
        method: "GET",
      });
  
      // Verificar el estado de la respuesta
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log("Email enviado con éxito.");
    } catch (error) {
      console.log("Error al enviar el email:");
    }
  };  

  // useEffect(() => {
  //   if (connectedDevice && sensorData) {
  //     const [hr, sp, temp, av] = sensorData;
  //     setHeartRate(hr || "--");
  //     setSpo2(sp || "--");
  //     setTemperature(temp || "--");
  //     setAngularVelocity(av || "--");
  //   } else {
  //     // Si no hay conexión, reinicia los valores
  //     setHeartRate("--");
  //     setSpo2("--");
  //     setTemperature("--");
  //     setAngularVelocity("--");
  //   }
  // }, [sensorData, connectedDevice]);

  // // Verifica la conexión periódicamente
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!connectedDevice) {
  //       console.log("El dispositivo se ha desconectado.");
  //       setHeartRate("--");
  //       setSpo2("--");
  //       setTemperature("--");
  //       setAngularVelocity("--");
  //     }
  //   }, 5000); // Cada 5 segundos

  //   return () => clearInterval(interval);
  // }, [connectedDevice]);

  // const scanForDevices = async () => {
  //   const isPermissionsEnabled = await requestPermissions();
  //   if (isPermissionsEnabled) {
  //     scanForPeripherals();
  //   }
  // };

  const hideModal = () => setIsModalVisible(false);

  // const openModal = async () => {
  //   await scanForDevices();
  //   setIsModalVisible(true);
  // };

  // const buttonText = connectedDevice ? "Lista de dispositivos" : "Conectar";

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>Dispositivo: {connectionStatus}</Text> */}
        <View style={styles.middleSpacer} />
        <Ionicons name="analytics" size={20} color={Colors.primary} />
        <TouchableOpacity>
          <Text style={styles.historyButton}>Ver historial</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <View style={styles.container}>
        <Card
          title="Frecuencia cardíaca (Bpm)"
          number={heartRate}
          range={`${getPatientType(age) === "Infante" ? "80 a 160" : getPatientType(age) === "Niño" ? "80 a 100" : getPatientType(age) === "Adulto" ? "60 a 80" : "60 o menos"}`}
          status={getStatus(Number(heartRate), [60, 160])}
        />
        <Card
          title="Temperatura corporal (°C)"
          number={temperature}
          range="35 a 40"
          status={getStatus(Number(temperature), [35, 40])}
        />
        <Card
          title="Posición eje X (m/s²)."
          number={angularVelocity}
          range="-5.1 a 1.0"
          status={getStatus(Number(angularVelocity), [-5.1, 1.1])}
        />
        <Card
          title="Posición eje Z (m/s²)"
          number={angularVelocity2}
          range="2.5 a 4.1"
          status={getStatus(Number(angularVelocity2), [2.5, 4.1])}
        />
      </View>

            {/* Ubicación debajo de las tarjetas */}
      {/* <Text style={styles.location}>
        {location ? `Ubicación: Lat: ${location.latitude}, Lon: ${location.longitude}` : errorMsg || 'Cargando ubicación...'}
      </Text> */}

      {/* <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  headerText: {
    fontSize: 13,
    fontFamily: "inter-bold",
    textAlign: "center",
  },
  historyButton: {
    fontSize: 11,
    fontFamily: "inter-medium",
    textDecorationLine: "underline",
    marginLeft: 3,
  },
  middleSpacer: {
    flex: 0.42,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  card: {
    width: "38%",
    height: 200,
    backgroundColor: Colors.tertiary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: "space-evenly",
  },
  title: {
    fontFamily: "inter-medium",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  number: {
    fontSize: 45,
    fontFamily: "inter-semibold",
    marginBottom: 4,
  },
  range: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: "inter-regular",
    textAlign: "center",
  },
  status: {
    fontFamily: "inter-semibold",
    fontSize: 14,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "85%",
    marginTop: 30,
    borderRadius: 10,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});