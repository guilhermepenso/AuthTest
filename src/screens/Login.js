import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { authenticateUser, refreshSession } from '../services/authentication/authenticateUser'; // adjust the path as needed
import { decode } from 'base-64';
import { jwtDecode } from 'jwt-decode';

global.atob = decode;

export const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    getData();
  }, [])

  const getData = async () => {
    try {
        const accessToken = await SecureStore.getItemAsync('access_token');
        console.log('accessToken: ', accessToken);
        if (accessToken) {
          const decodedToken = jwtDecode(accessToken);
          if (decodedToken.exp * 1000 > Date.now()) {
            navigation.navigate('Home');
          } else {
            await refreshSession(); // refresh the tokens
          }
        }
      
    } catch (error) {
      console.error(error);
    }
  }

  const setData = async () => {
    if (email.length == 0 || password.length == 0) {
      alert('Warning! Please write your user and password');
    } else {
      try {
        const tokens = await authenticateUser(email, password); // pass email and password to authenticateUser
        await SecureStore.setItemAsync('access_token', tokens.accessToken);
        await SecureStore.setItemAsync('id_token', tokens.idToken);
        await SecureStore.setItemAsync('refresh_token', tokens.refreshToken);
  
        await getData();
      } catch (error) {
        console.error('Error signing in:', error);
      }
    }
  }
  

  return (
    <SafeAreaView style={styles.body}>
      <Image 
        style={styles.logo} 
        source={require('../../assets/logo.png')}
      />
      <Text 
        style={styles.textTitle}>
        Auth Test
      </Text>
      <TextInput 
        style={styles.input} 
        placeholder='Enter your email' 
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput 
        style={styles.input} 
        placeholder='Enter your password' 
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={setData}
      >
        <Text style={styles.textButton}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000d8',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 60,
    marginBottom: 20,
  },
  textTitle: {
    marginBottom: 125,
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'light',
  },
  input: {
    width: 300,
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FEC201',
    width: 90,
    height: 45,
    borderRadius: 10,
    marginTop: 15,
    alignContent: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 25,
    color: '#000000',
    fontWeight: 'light',
    textAlign: 'center',
  }
})