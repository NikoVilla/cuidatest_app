import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from "../../constants/Colors";
import { BarChart, LineChart } from "react-native-gifted-charts";
import MeasurementChart from './MeasurementChart';

// Datos simulados para las tres mediciones
const getData = (filter, measurementType) => {
  let data = [];
  const currentTime = new Date();

  if (measurementType === 'frecuencia cardiaca') {
    if (filter === 'Hora') {
      for (let i = 0; i < 7; i++) {
        data.push({
          value: 60 + Math.random() * 40,
          label: `${i * 10} min`,
        });
      }
    } else if (filter === 'Día') {
      for (let i = 0; i < 24; i++) {
        data.push({
          value: 60 + Math.random() * 40,
          label: `${i}:00`,
        });
      }
    } else if (filter === 'Semana') {
      const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
      for (let i = 0; i < 7; i++) {
        data.push({
          value: 60 + Math.random() * 40,
          label: daysOfWeek[i],
        });
      }
    }
  } else if (measurementType === 'temperatura') {
    if (filter === 'Hora') {
      for (let i = 0; i < 7; i++) {
        data.push({
          value: 20 + Math.random() * 5,
          label: `${i * 10} min`,
        });
      }
    } else if (filter === 'Día') {
      for (let i = 0; i < 24; i++) {
        data.push({
          value: 20 + Math.random() * 5,
          label: `${i}:00`,
        });
      }
    } else if (filter === 'Semana') {
      for (let i = 0; i < 7; i++) {
        data.push({
          value: 20 + Math.random() * 5,
          label: `Día ${i + 1}`,
        });
      }
    }
  } else if (measurementType === 'velocidad angular') {
    if (filter === 'Hora') {
      for (let i = 0; i < 7; i++) {
        data.push({
          value: Math.random() * 100,
          label: `${i * 10} min`,
        });
      }
    } else if (filter === 'Día') {
      for (let i = 0; i < 24; i++) {
        data.push({
          value: Math.random() * 100,
          label: `${i}:00`,
        });
      }
    } else if (filter === 'Semana') {
      for (let i = 0; i < 7; i++) {
        data.push({
          value: Math.random() * 100,
          label: `Día ${i + 1}`,
        });
      }
    }
  }

  return data;
};

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

  const data = getData(selectedOption, selectedGraph);

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
            useNativeAndroidPickerStyle={false}
            style={{
              inputAndroid: {
                backgroundColor: Colors.primary,
                paddingVertical: 1,
                paddingHorizontal: 8,
                borderWidth: 1,
                borderColor: Colors.primary,
                borderRadius: 5,
                color: 'white',
                fontSize: 12,
                fontFamily: 'inter-medium',
              },
              placeholder: {
                color: 'gray',
              },
            }}
            placeholder={{
              label: 'Seleccionar',
              value: null,
            }}
          />
        </View>  
      </View>

      <View style={styles.chartContainer}>
        {selectedGraph === 'frecuencia cardiaca' && (
          <LineChart
            areaChart
            curved
            data={data}
            width={320}
            height={220}
            dataPointsColor={'red'}
            color={'blue'}
            thickness={2}
            startFillColor="rgba(45,64,230,0.3)"
            endFillColor="rgba(45,64,230,0.01)"
            startOpacity={0.9}
            endOpacity={0.2}
            rulesColor="gray"
            showVerticalLines
            pointerConfig={{
              pointerStripHeight: 160,
              pointerStripColor: 'lightgray',
              pointerStripWidth: 2,
              pointerColor: 'lightgray',
              radius: 6,
              pointerLabelWidth: 100,
              pointerLabelHeight: 90,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: false,
              pointerLabelComponent: items => {
                return (
                  <View
                    style={{
                      height: 90,
                      width: 50,
                      justifyContent: 'center',
                      marginTop: -30,
                      marginLeft: -40,  
                    }}>
                    <Text style={{color: 'white', fontSize: 14, marginBottom:6,textAlign:'center'}}>
                      {items[0].date}
                    </Text>
                    <View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
                      <Text style={{fontWeight: 'bold',textAlign:'center'}}>
                      {Math.trunc(items[0].value)}
                      </Text>
                    </View>
                  </View>
                );
              },
            }}
            chartConfig={{
              backgroundColor: Colors.primary,
              backgroundGradientFrom: Colors.primary,
              backgroundGradientTo: Colors.secondary,
              propsForDots: { r: "6", strokeWidth: "2", stroke: Colors.primary },
            }}
            yAxisLabel="bpm"
            xAxisLabel="Tiempo"
          />
        )}

        {selectedGraph === 'temperatura' && (
          <LineChart
          areaChart
          curved
          data={data}
          width={320}
          height={220}
          dataPointsColor={'red'}
          color={'blue'}
          thickness={2}
          startFillColor="rgba(45,64,230,0.3)"
          endFillColor="rgba(45,64,230,0.01)"
          startOpacity={0.9}
          endOpacity={0.2}
          rulesColor="gray"
          showVerticalLines
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: 'lightgray',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: items => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: 'center',
                    marginTop: -30,
                    marginLeft: -40,  
                  }}>
                  <Text style={{color: 'white', fontSize: 14, marginBottom:6,textAlign:'center'}}>
                    {items[0].date}
                  </Text>
                  <View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
                    <Text style={{fontWeight: 'bold',textAlign:'center'}}>
                      {items[0].value}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
            chartConfig={{
              backgroundColor: Colors.primary,
              backgroundGradientFrom: Colors.primary,
              backgroundGradientTo: Colors.secondary,
              propsForDots: { r: "6", strokeWidth: "2", stroke: Colors.primary },
            }}
            yAxisLabel="°C"
            xAxisLabel="Tiempo"
          />
        )}

        {selectedGraph === 'velocidad angular' && (
          <LineChart
          areaChart
          curved
          data={data}
          width={320}
          height={220}
          dataPointsColor={'red'}
          color={'blue'}
          thickness={2}
          startFillColor="rgba(45,64,230,0.3)"
          endFillColor="rgba(45,64,230,0.01)"
          startOpacity={0.9}
          endOpacity={0.2}
          rulesColor="gray"
          showVerticalLines
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: 'lightgray',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: items => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: 'center',
                    marginTop: -30,
                    marginLeft: -40,  
                  }}>
                  <Text style={{color: 'white', fontSize: 14, marginBottom:6,textAlign:'center'}}>
                    {items[0].date}
                  </Text>
                  <View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
                    <Text style={{fontWeight: 'bold',textAlign:'center'}}>
                      {items[0].value}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
            chartConfig={{
              backgroundColor: Colors.primary,
              backgroundGradientFrom: Colors.primary,
              backgroundGradientTo: Colors.secondary,
              propsForDots: { r: "6", strokeWidth: "2", stroke: Colors.primary },
            }}
            yAxisLabel="°/s"
            xAxisLabel="Tiempo"
          />
        )}
      </View>
      <View>
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: Colors.secondary, padding: 10 },
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
  title: { fontSize: 16, fontFamily: 'inter-bold' },
  title2: { fontSize: 12, fontFamily: 'inter-regular', marginRight: 6 },
  chartContainer: { alignItems: 'center', marginTop: 20 },

});
