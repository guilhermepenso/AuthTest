import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Home, Details, Alarmes } from '../screens/export'

export const Routes = () => {
    const Stack = createNativeStackNavigator();
    
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName='Alarmes'
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen name="Alarmes" component={Alarmes} />
            </Stack.Navigator>
        </NavigationContainer>    
    )
}