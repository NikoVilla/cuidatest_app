import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from "react-native-gifted-charts";
import Colors from "../../constants/Colors";

const MeasurementChart = ({ data, measurementType }) => {
  const getYAxisLabel = () => {
    if (measurementType === 'frecuencia cardiaca') return "bpm";
    if (measurementType === 'temperatura') return "°C";
    if (measurementType === 'velocidad angular') return "°/s";
    return "";
  };

  return (
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
        pointerLabelComponent: (items) => (
          <View style={{ height: 90, width: 100, justifyContent: 'center', marginTop: -30, marginLeft: -40 }}>
            <Text style={{ color: 'white', fontSize: 14, marginBottom: 6, textAlign: 'center' }}>
              {items[0]?.date}
            </Text>
            <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: 'white' }}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                {items[0]?.value}
              </Text>
            </View>
          </View>
        ),
      }}
      chartConfig={{
        backgroundColor: Colors.primary,
        backgroundGradientFrom: Colors.primary,
        backgroundGradientTo: Colors.secondary,
        propsForDots: { r: "6", strokeWidth: "2", stroke: Colors.primary },
      }}
      yAxisLabel={getYAxisLabel()}
      xAxisLabel="Tiempo"
    />
  );
};

export default MeasurementChart;
