import React from 'react';
import { Stack, Slot } from "expo-router";
import { useFonts } from "expo-font";

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

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Slot />
    </Stack>
  );
}
