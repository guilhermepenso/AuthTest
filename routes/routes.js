import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, Test_Home, ProductDetails } from '../screens/export'

export const Routes = () => {
    const Stack = createNativeStackNavigator();
    
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Test_Home" component={Test_Home} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} />
            </Stack.Navigator>
        </NavigationContainer>    
    )
}