import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Colors from "../../constants/Colors";
// import DeviceModal from "./DeviceModal";
// import useBLE from "../shared/useBLE";
import Ionicons from "@expo/vector-icons/Ionicons";
import FirestoreService from "./firestoreService";
import * as Location from 'expo-location';

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
  // const connectionStatus = connectedDevice ? "Conectado" : "Desconectado";
  const [age, setAge] = useState<number>(90);
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

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
    const heartRateRange: [number, number] = [60, 90];
    const temperatureRange: [number, number] = [35, 40];
    const angularVelocityRange: [number, number] = [0, 45];

    const newHeartRate = Math.floor(
      Math.random() * (heartRateRange[1] - heartRateRange[0] + 1)
    ) + heartRateRange[0];
    const newTemperature = Math.floor(
      Math.random() * (temperatureRange[1] - temperatureRange[0] + 1)
    ) + temperatureRange[0];
    const newAngularVelocity = Math.floor(
      Math.random() * (angularVelocityRange[1] - angularVelocityRange[0] + 1)
    ) + angularVelocityRange[0];

    setHeartRate(newHeartRate);
    setTemperature(newTemperature);
    setAngularVelocity(newAngularVelocity);

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
    const angularVelocityNum = Number(angularVelocity);
  
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

    // Velocidad angular fuera de rango
    const angularVelocityCritical = angularVelocityNum > 45;

    // Combinaciones de condiciones críticas:
    if (heartRateCritical && tempCritical) {
      showEmergencyAlert("Frecuencia cardíaca elevada y temperatura alta", 
        `Frecuencia cardíaca: ${heartRateNum}, Temperatura: ${tempNum}°C`);
    } 
    else if (heartRateCritical && tempNum < 36) {
      showEmergencyAlert("Frecuencia cardíaca elevada y temperatura baja", 
        `Frecuencia cardíaca: ${heartRateNum}, Temperatura: ${tempNum}°C`);
    }
    else if (heartRateCritical) {
      showEmergencyAlert("Frecuencia cardíaca elevada", heartRateNum);
    } 
    else if (tempCritical) {
      showEmergencyAlert("Temperatura fuera de rango", tempNum);
    }

    if (angularVelocityCritical) {
      showEmergencyAlert("Velocidad angular elevada", angularVelocityNum);
    }

    // if (!heartRateCritical && !tempCritical && !angularVelocityCritical) {
    //   console.log("Todos los signos vitales están dentro de los rangos normales.");
    // }
  };

  const showEmergencyAlert = (message: string, value: number | string) => {
    Alert.alert("¡Emergencia!", `${message} fuera de rango: ${value}`, [
      { text: "Cerrar", style: "cancel" },
    ]);
  };

  useEffect(() => {
    checkForEmergencies(); 
  }, [heartRate, temperature, angularVelocity, age]);

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
          range={`${getPatientType(age) === "Infante" ? "80-160" : getPatientType(age) === "Niño" ? "80-100" : getPatientType(age) === "Adulto" ? "60-80" : "60 o menos"}`}
          status={getStatus(Number(heartRate), [60, 160])}
        />
        <Card
          title="Temperatura corporal (°C)"
          number={temperature}
          range="35-40"
          status={getStatus(Number(temperature), [35, 40])}
        />
        <Card
          title="Velocidad angular (°/s)"
          number={angularVelocity}
          range="0-45"
          status={getStatus(Number(angularVelocity), [0, 45])}
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