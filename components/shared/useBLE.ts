// // /* eslint-disable no-bitwise */
// import { useMemo, useState, useEffect } from "react";
// import { PermissionsAndroid, Platform } from "react-native";
// import Geolocation from "react-native-geolocation-service";
// import * as ExpoDevice from "expo-device";
// import base64 from "react-native-base64";
// import { BleError, BleManager, Characteristic, Device } from "react-native-ble-plx";
// import { SendDirectSms } from 'react-native-send-direct-sms';

// const DATA_SERVICE_UUID = "19b10000-e8f2-537e-4f6c-d104768a1214";
// const DATA_CHARACTERISTIC_UUID = "19b10001-e8f2-537e-4f6c-d104768a1217";

// const bleManager = new BleManager();

// function useBLE() {
//   const [allDevices, setAllDevices] = useState<Device[]>([]);
//   const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
//   const [color, setColor] = useState("white");
//   const [sensorData, setSensorData] = useState<string[]>(["", "", "", ""]);
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
//   const [smsStatus, setSmsStatus] = useState<string | null>(null);

//   useEffect(() => {
//     if (Platform.OS === "android") {
//       requestPermissions();
//     }
//   }, []);

//   const requestAndroid31Permissions = async () => {
//     const bluetoothScanPermission = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//       {
//         title: "Location Permission",
//         message: "Bluetooth Low Energy requires Location",
//         buttonPositive: "OK",
//       }
//     );
//     const bluetoothConnectPermission = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//       {
//         title: "Location Permission",
//         message: "Bluetooth Low Energy requires Location",
//         buttonPositive: "OK",
//       }
//     );
//     const fineLocationPermission = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: "Location Permission",
//         message: "Bluetooth Low Energy requires Location",
//         buttonPositive: "OK",
//       }
//     );
//     const sendSmsPermission = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.SEND_SMS,
//       {
//         title: "SMS Permission",
//         message: "This app requires SMS permissions to send alerts",
//         buttonPositive: "OK",
//       }
//     );
  
//     return (
//       bluetoothScanPermission === "granted" &&
//       bluetoothConnectPermission === "granted" &&
//       fineLocationPermission === "granted" &&
//       sendSmsPermission === "granted"
//     );
//   };

//   const requestPermissions = async () => {
//     if (Platform.OS === "android") {
//       if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: "Location Permission",
//             message: "Bluetooth Low Energy requires Location",
//             buttonPositive: "OK",
//           }
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } else {
//         const isAndroid31PermissionsGranted = await requestAndroid31Permissions();
//         return isAndroid31PermissionsGranted;
//       }
//     } else {
//       return true;
//     }
//   };

//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//       },
//       (error) => {
//         console.log(error);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   const connectToDevice = async (device: Device) => {
//     try {
//       const deviceConnection = await bleManager.connectToDevice(device.id);
//       setConnectedDevice(deviceConnection);
//       await deviceConnection.discoverAllServicesAndCharacteristics();
//       bleManager.stopDeviceScan();

//       startStreamingData(deviceConnection);
//       getLocation();
//     } catch (e) {
//       console.log("FAILED TO CONNECT", e);
//     }
//   };

//   const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
//     devices.findIndex((device) => nextDevice.id === device.id) > -1;

//   const scanForPeripherals = () =>
//     bleManager.startDeviceScan(null, null, (error, device) => {
//       if (error) {
//         console.log(error);
//       }

//       if (device && (device.localName === "ESP32CAM" || device.name === "ESP32CAM")) {
//         setAllDevices((prevState: Device[]) => {
//           if (!isDuplicteDevice(prevState, device)) {
//             return [...prevState, device];
//           }
//           return prevState;
//         });
//       }
//     });

//   const sendSmsData = (mobileNumber: string, bodySMS: string) => {
//     SendDirectSms(mobileNumber, bodySMS)
//       .then((res: any) => {
//         console.log('then', res);
//         setSmsStatus('SMS enviado exitosamente');
//       })
//       .catch((err: any) => {
//         console.log('catch', err);
//         setSmsStatus('Error al enviar SMS');
//       });
//   };

//   const sendAlertSMS = (data: string[], location: { latitude: number; longitude: number } | null) => {
//     console.log('Attempting to send SMS...');
//     const locationMessage = location ? ` Ubicación: https://www.google.com/maps?q=${location.latitude},${location.longitude}` : '';
//     const message = `Prueba test - Datos del paciente críticos ${data.join(" ")}${locationMessage}`;
//     sendSmsData('+56932795000', message);
//   };

//   const onDataUpdate = (error: BleError | null, characteristic: Characteristic | null) => {
//     if (error) {
//       console.log(error);
//       return;
//     } else if (!characteristic?.value) {
//       console.log("No Data was received");
//       return;
//     }

//     const decodedData = base64.decode(characteristic.value);
//     const dataArray = decodedData.split(",");
//     if (dataArray.length >= 4) {
//       setSensorData(dataArray.slice(0, 4));
//       if (dataArray.some(value => parseFloat(value) < 10)) {
//         sendAlertSMS(dataArray.slice(0, 4), location);
//       }
//     }
//   };

//   const startStreamingData = async (device: Device) => {
//     if (device) {
//       device.monitorCharacteristicForService(DATA_SERVICE_UUID, DATA_CHARACTERISTIC_UUID, onDataUpdate);
//     } else {
//       console.log("No Device Connected");
//     }
//   };

//   return {
//     connectToDevice,
//     allDevices,
//     connectedDevice,
//     color,
//     sensorData,
//     location,
//     smsStatus,
//     requestPermissions,
//     scanForPeripherals,
//     startStreamingData,
//   };
// }

// export default useBLE;