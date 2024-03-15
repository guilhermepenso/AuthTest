import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scanTelemetryComparisonTest } from '../services/api/scanTelemetryComparisonTest';
import { BarChart } from 'react-native-gifted-charts';
import Ionicons from '@expo/vector-icons/Ionicons';


export const Details = ({ route }) => {

  const [telemetryData, setTelemetryData] = useState();
  const [barData, setBarData] = useState();

  const navigation = useNavigation();

  const { data } = route.params;
  console.log('data: ',data);

  useEffect(() => {
    loadTelemetryComparisonTest();
  }, [])

  const loadTelemetryComparisonTest = async () => {
    const telemetry = await scanTelemetryComparisonTest();
    setTelemetryData(telemetry);
    console.log('telemetryData: ',telemetry);
    
    const filteredTelemetry = telemetryData.filter(tD => tD.identification_number == data.identification_number);
    console.log('filteredTelemetry: ',filteredTelemetry);
  
    const barData = filteredTelemetry.flatMap((telemetry, index) => [
      {
        value: telemetry.bill_consumption,
        label: telemetry.reference_month,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: 'gray' },
        frontColor:'#eeea0f',
      }, 
      { value: telemetry.measured_values, frontColor: '#d6d6ce' }
    ]);
    
    setBarData(barData);
    console.log('barData: ',barData);
  } 
  


  const renderTitle = () => {
    return(
      <View >

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 24,
          backgroundColor: '#29292932',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#eeea0f',
              marginRight: 8,
            }}
          />
          <Text
            style={{
              width: 70,
              height: 20,
              color: 'lightgray',
            }}>
            Consumo
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#d6d6ce',
              marginRight: 8,
            }}
          />
          <Text
            style={{
              width: 80,
              height: 20,
              color: 'lightgray',
            }}>
            Telemetria
          </Text>
        </View>
      </View>
    </View>
    )
  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.navRow}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Ionicons name="chevron-back" size={48} color="#FEC201" />
            </TouchableOpacity>
          </View>
      </View>
      <ScrollView>
        <View>
          <Text style={styles.titleText}>UC: {data.identification_number}</Text>
        </View>
        <View>
            <Text style={styles.text}>Address: {data.address}</Text>
            <Text style={styles.text}>Carbon Whatever: {data.carbon_whatever}</Text>
            <Text style={styles.text}>City: {data.city}</Text>
            <Text style={styles.text}>Concessionaire: {data.concessionaire}</Text>
        </View>
        <View
        style={{
          backgroundColor: '#47474745',
          paddingBottom: 40,
          borderRadius: 10,
          marginTop: 30,
        }}>
        {renderTitle()}
        <BarChart
          data={barData}
          barWidth={10}
          spacing={32}
          rulesColor={'#474747'}
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{color: 'gray'}}
          noOfSections={8}
          maxValue={80}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  buttonHeader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navRow: {
    flexDirection: 'row',
    backgroundColor: '#272525',
    paddingTop: 30,
    paddingLeft: 10,
    width: '100%',
    justifyContent: 'left',

  },
  page: {
    flex: 1,
    backgroundColor: '#272525',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#272525',
    marginVertical: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textCustom: {
    color: '#fff',
  },
  table: {
    backgroundColor: '#2e2d2d',
    minWidth: '90%',
  },
  tableHeader: {
    backgroundColor: '#464646',
  },
  input: {
    backgroundColor: '#464646',
    color: '#fff',
    textAlign: 'center',
    minWidth: '35%',
    minHeight: 40,
  },
  titleText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 20,
  },
  text: {
    color: 'white',
  },
});