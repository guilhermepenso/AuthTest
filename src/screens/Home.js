import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { scanConsumerGroupTest } from '../services/api/scanConsumerGroupTest';
import * as SecureStore from 'expo-secure-store';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';



export const Home = () => {
  const navigation = useNavigation();

  const db = SQLite.openDatabase('locaDataBase.db');

  // SCAN - PRODUCTS
  const [data, setData] = useState(null);
  const [showScanTable, setShowScanTable] = useState(false);
  


  useEffect(() => {
    handleScanTable();
  }, []);
  
  const handleScanTable = async () => {
    try {
      console.log('yo');
      const localData = await scanConsumerGroupTest();
      console.log('data: ', localData);
      if (localData) {
        setData(localData);
        db.transaction(tx => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS consumerGroupTestDB (identification_number INTEGER PRIMARY KEY NOT NULL, address TEXT, carbon_whatever TEXT, city TEXT, concessionaire TEXT);');
          localData.forEach(item => {
            tx.executeSql('INSERT INTO consumerGroupTestDB (identification_number, address, carbon_whatever, city, concessionaire) values (?, ?, ?, ?, ?)', 
            [item.identification_number, item.address, item.carbon_whatever, item.city, item.concessionaire],
            (_, result) => {
              console.log('Inserido com sucesso:', result.insertId);
            },
            (_, error) => {
              console.log('Erro ao inserir dados:', error);
            });
          });
        }, error => {
          console.log('Erro na transação:', error);
        }, () => {
          console.log('Transação bem-sucedida!');
        });
        
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM consumerGroupTestDB',
            [],
            (_, { rows: { _array } }) => {
              console.log('Dados da tabela:', JSON.stringify(_array));
            },
            (_, error) => {
              console.log('Erro ao buscar dados da tabela:', error);
            }
          );
        });
      } 
    } catch (error) {
      alert('Não foi possível se conectar a API:', error);
    }
  };
  
  

  // GET - PRODUCT
  const [showGetTable, setShowGetTable] = useState(false);
  const [inputId, setInputId] = useState(null);
  const [getData, setGetData] = useState(null)

  const handleGetTable = () => {
    console.log('teste inputId: ', inputId);
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'SELECT * FROM consumerGroupTestDB WHERE identification_number = ?',
    //     [inputId],
    //     (_, { rows: { _array } }) => {
    //       setGetData(JSON.stringify(_array));
    //       setShowGetTable(true);
    //     },
    //     (_, error) => {
    //       console.log('Erro SQL:', error);
    //       alert('Erro:', error);
    //     }
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM consumerGroupTestDB',
        [],
        (_, { rows: { _array } }) => {
          console.log('Dados da tabela:', JSON.stringify(_array));
        },
        (_, error) => {
          console.log('Erro ao buscar dados da tabela:', error);
        }
      );
    });
  }

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
            <View style={styles.searchSection}>
              <Ionicons style={styles.searchIcon} name='search' size={24} color='#FEC201' />
              <TextInput
                style={styles.input}
                placeholder=" Enter ID"
                placeholderTextColor="#ffffff88"
                onChangeText={(text) => setInputId(text)}
                value={inputId}
                onSubmitEditing={() => handleGetTable()}
              />
            </View>
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
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#464646',
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    backgroundColor: '#464646',
    color: '#fff',
    textAlign: 'center',
    minWidth: '76%',
    minHeight: 45,
    paddingRight: 30,
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