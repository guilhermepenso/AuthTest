import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { scanProducts } from '../api/scan'; // Import the ScanProducts function
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const Home = () => {
  const navigation = useNavigation();

  // SCAN - PRODUCTS
  const [products, setProducts] = useState(null);
  const [showScanTable, setShowScanTable] = useState(false);
  
  useEffect(() => {
    loadLocalData();
  }, []);
  
  const loadLocalData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('products');
      if (storedData) {
        console.log('Sucesso, os dados salvos no anteriormente no Local Data foram carregados');
        setProducts(JSON.parse(storedData));
      } else {
        console.log('Erro, buscando dados pela API');
        await handleScanProducts();
      }
    } catch (error) {
      alert('Erro ao verificar o Local Data:', error);
    }
  };

  const scanTable = () => {
    setShowScanTable(true);
  }

  const handleScanProducts = async () => {
    try {
      const data = await scanProducts();
      if (data) {
        setProducts(data);
        await AsyncStorage.setItem('products', JSON.stringify(data));
      } 
    } catch (error) {
      alert('Não foi possível se conectar a API:', error);
    }
  };
  // GET - PRODUCT
  const [showGetTable, setShowGetTable] = useState(false);
  const [productIdInput, setProductIdInput] = useState(null); 
  const [product, setProduct] = useState(null);

  const handleGetProduct = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      const parsedProducts = JSON.parse(storedProducts);
      const productData = parsedProducts.find((p) => p.productId === productIdInput);
      setProduct(productData);
      setShowGetTable(true);
    } catch (error) {
      alert('Não foi possível obter os dados da tabela:', error);
    }
  };
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.navRow}>
          <View>
            <Text style={styles.titleText}>HOME PAGE</Text>
          </View>
          <View style={styles.buttonHeader}>
            <Button title="LogOut" onPress={() => navigation.navigate('Login')}/>
          </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
        </View>
        <View style={styles.container}>
          <Button title="Sync" onPress={handleScanProducts} />
        </View>
        <View style={styles.container}>
          <Button title="Scan" onPress={scanTable} />
        </View>
        {showScanTable && (
          <DataTable style={styles.table}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>
                <Text style={styles.textCustom}>Product ID</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.textCustom}>Inventory</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.textCustom}>Name</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.textCustom}>Price</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.textCustom}>Color</Text>
              </DataTable.Title>
            </DataTable.Header>
            {products.map((product, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>
                  <Text style={styles.textCustom}>{product.productId}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.textCustom}>{product.inventory}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.textCustom}>{product.productName}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.textCustom}>{product.price}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.textCustom}>{product.color}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
        <View style={styles.containerRow}>
          <View style={styles.container}>
            <TextInput
              placeholder="enter Product ID"
              onChangeText={(text) => setProductIdInput(text)}
              value={productIdInput}
              style={styles.input}
            />
          </View>
          <View style={styles.container}>
            <Button title="Get" onPress={handleGetProduct} />
          </View>
        </View>
        {showGetTable &&(
          <DataTable style={styles.table}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>
              <Text style={styles.textCustom}>Product ID</Text> 
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.textCustom}>Inventory</Text>
            </DataTable.Title>  
            <DataTable.Title>
              <Text style={styles.textCustom}>Name</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.textCustom}>Price</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.textCustom}>Color</Text>
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.textCustom}>{product.productId}</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.textCustom}>{product.inventory}</Text> 
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.textCustom}>{product.productName}</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.textCustom}>{product.price}</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.textCustom}>{product.color}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  buttonHeader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navRow: {
    flexDirection: 'row',
    backgroundColor: '#181818',
    paddingTop: 30,
    paddingBottom: 10,
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
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 20,
  },
});