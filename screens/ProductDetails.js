import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView, SafeAreaView  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-gifted-charts';


export const ProductDetails = ({ route }) => {
    const navigation = useNavigation();

  const { product } = route.params;

    const barData = [
        {
          value: 40,
          label: 'Jan',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#eeea0f',
        },
        {value: 20, frontColor: '#d6d6ce'},
        {
          value: 50,
          label: 'Feb',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#eeea0f',
        },
        {value: 40, frontColor: '#d6d6ce'},
        {
          value: 75,
          label: 'Mar',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#eeea0f',
        },
        {value: 25, frontColor: '#d6d6ce'},
        {
          value: 30,
          label: 'Apr',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#eeea0f',
        },
        {value: 20, frontColor: '#d6d6ce'},
        {
          value: 45,
          label: 'May',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#eeea0f',
        },
        {value: 40, frontColor: '#d6d6ce'},
        {
          value: 65,
          label: 'Jun',
          spacing: 2,
          labelWidth: 30,
          labelTextStyle: {color: 'gray'},
          frontColor: '#eeea0f',
        },
        {value: 30, frontColor: '#d6d6ce'},
      ];

      const renderTitle = () => {
          return(
            <View style={{marginVertical: 20}}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Consumer Group
            </Text>
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


  loadData = async() => {

  };

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