import React from 'react'
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la pantalla de inicio al cargar la app
    const redirectToHome = async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
      router.replace("/login");
    };

    redirectToHome();
  }, [router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Bienvenido a la aplicación</Text>
    </View>
  );
}