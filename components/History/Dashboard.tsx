import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from "../../constants/Colors";
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";


export default function Dashboard() {
  const [selectedOption, setSelectedOption] = useState('Semana');
  const [selectedGraph, setSelectedGraph] = useState('frecuencia cardiaca');


  // Botones disponibles y sus respectivos títulos
  const graphOptions = [
    { key: 'frecuencia cardiaca', label: 'Frec. cardiaca' },
    { key: 'temperatura', label: 'Temperatura' },
    { key: 'velocidad angular', label: 'Vel. Angular' },
  ];

  const pickerOptions = [
    { label: 'Hora', value: 'Hora' },
    { label: 'Día', value: 'Día' },
    { label: 'Semana', value: 'Semana' },
  ];

  return (
    <View style={styles.container}>
      {/* Barra de navegación */}
      <View style={styles.navBar}>
        {graphOptions.map((graph) => (
          <TouchableOpacity
            key={graph.key}
            style={styles.navButton}
            onPress={() => setSelectedGraph(graph.key)}
          >
            <Text
              style={[
                styles.navText,
                selectedGraph === graph.key && styles.navTextSelected,
              ]}
            >
              {graph.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Título y selector */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Gráfico de mediciones</Text>
        <View style={styles.titleSection}>
          <Text style={styles.title2}>Ver por:</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedOption(value)}
            items={pickerOptions}
            value={selectedOption}
            useNativeAndroidPickerStyle={false} // Desactiva estilo nativo
            style={{
              inputAndroid: {
                backgroundColor: Colors.primary, // Color del fondo
                paddingVertical: 1,
                paddingHorizontal: 8,
                borderWidth: 1, // Borde visible
                borderColor: Colors.primary,
                borderRadius: 5, // Bordes redondeados
                color: 'white',
                fontSize: 12,
                fontFamily: 'inter-medium',
              },
              placeholder: {
                color: 'gray', // Color del texto del placeholder
              },
            }}
            placeholder={{
              label: 'Seleccionar',
              value: null, // Hace que el placeholder no sea seleccionable
            }}
          />
        </View>  
      </View>

      {/* Gráfico aqui*/}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.secondary },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#3D5AFE',
    paddingVertical: 10,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7,
  },
  navButton: { flex: 1, alignItems: 'center' },
  navText: { color: Colors.Stitles, fontWeight: 'bold' },
  navTextSelected: { color: 'white', fontWeight: 'bold' },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 12,
  },
  title: { fontSize: 16, fontFamily: 'inter-bold'},
  title2: { fontSize: 12, fontFamily: 'inter-regular', marginRight: 6},
});