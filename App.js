import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';
import { scanProducts } from './src/api/scan'; // Import the ScanProducts function
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // SCAN - PRODUCTS
  const [products, setProducts] = useState(null);
  const [showScanTable, setShowScanTable] = useState(false);
  
  useEffect(() => {
    loadAsyncStorage();
  }, []);
  
  const loadAsyncStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('products');
      if (storedData) {
        console.log('Sucesso, os dados salvos no AsyncStorage foram carregados');
        setProducts(JSON.parse(storedData));
      } else {
        console.log('Erro, buscando dados pela API');
        await handleScanProducts();
      }
    } catch (error) {
      console.error('Erro ao verificar o AsyncStorage:', error);
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
      } else {
        console.error('Não foi possível se conectar a API');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
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
      console.error('Error fetching product details:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textCustom}>Update Local Database</Text>
      <Button title="Update Local" onPress={handleScanProducts} />
      <Text style={styles.textCustom}>Scan Table</Text>
      <Button title="Scan Products" onPress={scanTable} />
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
      <Text style={styles.textCustom}>Get Table</Text>
      <TextInput
        placeholder="enter Product ID"
        onChangeText={(text) => setProductIdInput(text)}
        value={productIdInput}
        style={styles.input}
      />
      <Button title="Get Product" onPress={handleGetProduct} />
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161010',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCustom: {
    color: '#fff',
  },
  table: {
    backgroundColor: '#2e2d2d',
    margin: 20,
  },
  tableHeader: {
    backgroundColor: '#464646',
  },
  input: {
    backgroundColor: '#464646',
    color: '#fff',
    textAlign: 'center',
    width: '29%',
  },
});