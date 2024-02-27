import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView, SafeAreaView  } from 'react-native';
import { useNavigation } from '@react-navigation/native'


export const ProductDetails = ({ route }) => {
    const navigation = useNavigation();

  const { product } = route.params;

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.navRow}>
          <View>
            <Text style={styles.titleText}>PRODUCT DETAILS</Text>
          </View>
          <View style={styles.container}>
          <Button title="Test_Home" onPress={() => navigation.navigate('Test_Home')}/>
          </View>
      </View>
      <ScrollView>
        <View>
            <Text style={styles.text}>Product ID: {product.productId}</Text>
            <Text style={styles.text}>Inventory: {product.inventory}</Text>
            <Text style={styles.text}>Name: {product.productName}</Text>
            <Text style={styles.text}>Price: {product.price}</Text>
            <Text style={styles.text}>Color: {product.color}</Text>
        </View>
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
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 20,
  },
  text: {
    color: 'white',
  },
});