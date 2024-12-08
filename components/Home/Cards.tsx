import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import DeviceModal from "./DeviceModal";
import useBLE from "../shared/useBLE";
import Ionicons from "@expo/vector-icons/Ionicons";

// Tipos para los props del componente Card
type CardProps = {
  title: string;
  number: string | number;
  range: string;
  status: "Normal" | "Crítico";
};

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
  const {
    allDevices,
    connectedDevice,
    connectToDevice,
    requestPermissions,
    scanForPeripherals,
    sensorData,
  } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [heartRate, setHeartRate] = useState<string | number>("--");
  const [spo2, setSpo2] = useState<string | number>("--");
  const [temperature, setTemperature] = useState<string | number>("--");
  const [angularVelocity, setAngularVelocity] = useState<string | number>("--");
  const connectionStatus = connectedDevice ? "Conectado" : "Desconectado";

  useEffect(() => {
    if (connectedDevice && sensorData) {
      const [hr, sp, temp, av] = sensorData;
      setHeartRate(hr || "--");
      setSpo2(sp || "--");
      setTemperature(temp || "--");
      setAngularVelocity(av || "--");
    } else {
      // Si no hay conexión, reinicia los valores
      setHeartRate("--");
      setSpo2("--");
      setTemperature("--");
      setAngularVelocity("--");
    }
  }, [sensorData, connectedDevice]);

  // Verifica la conexión periódicamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (!connectedDevice) {
        console.log("El dispositivo se ha desconectado.");
        setHeartRate("--");
        setSpo2("--");
        setTemperature("--");
        setAngularVelocity("--");
      }
    }, 5000); // Cada 5 segundos

    return () => clearInterval(interval);
  }, [connectedDevice]);

  const getStatus = (value: number, range: [number, number]) =>
    value >= range[0] && value <= range[1] ? "Normal" : "Crítico";

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = () => setIsModalVisible(false);

  const openModal = async () => {
    await scanForDevices();
    setIsModalVisible(true);
  };

  const buttonText = connectedDevice ? "Lista de dispositivos" : "Conectar";

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Dispositivo: {connectionStatus}</Text>
        <View style={styles.middleSpacer} />
        <Ionicons name="analytics" size={20} color={Colors.primary} />
        <TouchableOpacity>
          <Text style={styles.historyButton}>Ver historial</Text>
          <Text style={styles.historyButton}>Bateria: 99%</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido principal */}
      <View style={styles.container}>
        <Card title="Frecuencia cardíaca (Bpm)" number={heartRate} range="60-100" status={getStatus(Number(heartRate), [60, 100])} />
        <Card title="Temperatura corporal (°C)" number={temperature} range="36-38" status={getStatus(Number(temperature), [36, 38])} />
        <Card title="Velocidad angular (°/s)" number={angularVelocity} range="45-135°" status={getStatus(Number(angularVelocity), [45, 135])} />
        <Card title="Saturación de oxígeno (SpO2%)" number={spo2} range="95-100" status={getStatus(Number(spo2), [95, 100])} />
        <TouchableOpacity onPress={openModal} style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>

      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
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
    flex: 0.44,
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