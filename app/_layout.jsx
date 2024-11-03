import React from 'react';
import { useFonts } from "expo-font";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login/index';
import SignInScreen from './signin/index';
// import TabLayout from './(tabs)/_layout';

export default function RootLayout() {
  const Stack = createStackNavigator();
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

  if (!fontsLoaded) return null;

  return (
    <Stack.Navigator>
      <Stack.Screen name="login/index" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="signin/index" component={SignInScreen} options={{ headerShown: false }} />
      {/* <Stack.Screen name="(tabs)" component={TabLayout} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
}



