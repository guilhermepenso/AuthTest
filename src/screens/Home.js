import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { scanConsumerGroupTest } from '../services/api/scanConsumerGroupTest';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';



export const Home = () => {
  const navigation = useNavigation();

  // SCAN - PRODUCTS
  const [data, setData] = useState(null);
  const [showScanTable, setShowScanTable] = useState(false);
  
  useEffect(() => {
    handleScanTable();
  }, []);

  const handleScanTable = async () => {
    try {
      const data = await scanConsumerGroupTest();
      if (data) {
        setData(data);
      } 
    } catch (error) {
      alert('Não foi possível se conectar a API:', error);
    }
  };

  // GET - PRODUCT
  const [showGetTable, setShowGetTable] = useState(false);
  const [inputId, setInputId] = useState(null); 
  const [getData, setGetData] = useState(null);

  const handleGetTable = async () => {
    try {
      const data = await scanConsumerGroupTest();
      const filterData = data.filter(getData => String(getData.identification_number).includes(inputId));
      console.log('filteredData: ',filterData);
      setGetData(filterData);
      setShowGetTable(true);
    } catch (error) {
      alert('Não foi possível obter os dados da tabela:', error);
    }
  };

  const handleLogout = async() => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    await SecureStore.deleteItemAsync('id_token');
    navigation.navigate('Login');
  }
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.navRow}>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleScanTable}>
              <Ionicons name='sync' size={24} color='#FEC201' />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <MaterialIcons name='logout' size={24} color='#FEC201' />
            </TouchableOpacity>
          </View>
      </View>
      <ScrollView>
      <View style={styles.containerRow}>
          <View style={styles.container}>
            <TextInput
              placeholder=" Enter ID"
              placeholderTextColor="#ffffff88"
              onChangeText={(text) => setInputId(text)}
              value={inputId}
              style={styles.input}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.buttonSearch} onPress={handleGetTable}>
              <Ionicons name='search' size={24} color='#000000' />
            </TouchableOpacity>
          </View>
        </View>
        {showGetTable && (
          <DataTable style={styles.table}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>
                <Text style={styles.textCustom}>UC</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.textCustom}>Address</Text>
              </DataTable.Title>
            </DataTable.Header>
            {getData.map((data, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate('Details', { data: data })}>
                    <DataTable.Row>
                      <DataTable.Cell>
                          <Text style={styles.textCustom}>{data.identification_number}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                          <Text style={styles.textCustom}>{data.address}</Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                </TouchableOpacity>
                ))}
          </DataTable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  navRow: {
    flexDirection: 'row',
    backgroundColor: '#272525',
    paddingTop: 20,
    width: '100%',
    justifyContent: 'space-evenly',

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
    color: '#ffffff',
  },
  table: {
    backgroundColor: '#36322254',
    minWidth: '95%',
    borderRadius: 10,
  },
  tableHeader: {
    backgroundColor: '#464646',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  input: {
    backgroundColor: '#464646',
    color: '#fff',
    textAlign: 'center',
    minWidth: '76%',
    minHeight: 45,
    borderRadius: 10,
  },
  titleText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 20,
  },
  button: {
    backgroundColor: '#272525',
    width: 70,
    height: 45,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSearch: {
    backgroundColor: '#FEC201',
    width: 70,
    height: 45,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});