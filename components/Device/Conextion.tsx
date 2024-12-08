// import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import React, { useState } from 'react';
// import Colors from './../../constants/Colors';
// import DeviceModal from "./DeviceModal";
// import useBLE from "./../shared/useBLE";

// export default function Conextion() {
//   const [isConnected, setIsConnected] = useState(false);

//   const toggleConnection = () => {
//     setIsConnected(!isConnected);
//   };

//   const {
//     allDevices,
//     connectedDevice,
//     connectToDevice,
//     color,
//     requestPermissions,
//     scanForPeripherals,
//     sensorData,
//     location,
//     smsStatus,
//   } = useBLE();
//   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

//   const scanForDevices = async () => {
//     const isPermissionsEnabled = await requestPermissions();
//     if (isPermissionsEnabled) {
//       scanForPeripherals();
//     }
//   };

//   const hideModal = () => {
//     setIsModalVisible(false);
//   };

//   const openModal = async () => {
//     scanForDevices();
//     setIsModalVisible(true);
//   };

//   return (
//     <View style={styles.container}>
//       {connectedDevice ? ( 
//         <>
//           <Text style={styles.title}>Conectado</Text>
//         </>
//       ) : (
//         <Text style={styles.title}>Desconectado</Text>
//       )}
//       <TouchableOpacity style={styles.button} onPress={openModal}>
//         <Text style={styles.buttonText}>{isConnected ? 'Desconectar' : 'Conectar'}</Text>
//       </TouchableOpacity>
//       <Text style={styles.infoText}>Pulsa el botón para conectar o desconectar el dispositivo</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 17,
//     fontFamily: 'inter-medium',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: Colors.secondary,
//     borderRadius: 15,
//     borderWidth: 3,
//     borderColor: Colors.primary,
//     paddingVertical: 14,
//     paddingHorizontal: 35,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: Colors.negro,
//     fontSize: 20,
//     fontFamily: 'nunito',
//     textAlign: 'center',
//   },
//   infoText: {
//     fontSize: 13,
//     textAlign: 'center',
//   },
// });
