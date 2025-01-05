import React, { useCallback, useEffect } from 'react';
import { useFonts } from "expo-font";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login/index';
import SignUpScreen from './signUp/index';
// import { DbContextProvider } from './auth/contextDB';
// import { connectToDatabase, createTables } from './auth/database';
import TabLayout from './(tabs)/_layout';

const Stack = createStackNavigator();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "iceberg": require("./../assets/fonts/Iceberg-Regular.ttf"),
    "inter-bold": require("./../assets/fonts/Inter-Bold.ttf"),
    "inter-medium": require("./../assets/fonts/Inter-Medium.ttf"),
    "inter-regular": require("./../assets/fonts/Inter-Regular.ttf"),
    "inter-semibold": require("./../assets/fonts/Inter-SemiBold.ttf"),
    "nunito-bold": require("./../assets/fonts/Nunito-Bold.ttf"),
    "nunito-semibold": require("./../assets/fonts/Nunito-SemiBold.ttf"),
    "roboto": require("./../assets/fonts/RobotoCondensed-Bold.ttf"),
  });

  // Callback para cargar y configurar la base de datos
  // const loadData = useCallback(async () => {
  //   try {
  //     const db = await connectToDatabase(); // Conectar a la base de datos
  //     await createTables(db); // Crear las tablas necesarias
  //   } catch (error) {
  //     console.error("Error al cargar la base de datos:", error);
  //   }
  // }, []);

  // // useEffect para ejecutar loadData al montar el componente
  // useEffect(() => {
  //   loadData();
  // }, [loadData]);

  // if (!fontsLoaded) return null;

  return (
    // <DbContextProvider>
    <Stack.Navigator>
      <Stack.Screen name="login/index" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="signUp/index" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" component={TabLayout} options={{ headerShown: false }} />
    </Stack.Navigator>
    // </DbContextProvider>
  );
}
