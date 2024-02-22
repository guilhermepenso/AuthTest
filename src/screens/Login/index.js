import { React } from 'react'
import { View, Text, Button, StyleSheet, TextInput, SafeAreaView, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native' 
import { jwtDecode } from 'jwt-decode'
import { decode as atob } from "base-64"
export const Login = () => {
    const navigation = useNavigation();

    global.atob = atob;

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    
    
    const decoded = jwtDecode(token);

    return(
        <SafeAreaView style={styles.page}>
            <View style={styles.navRow}>
                <Text style={styles.titleText}>LOGIN PAGE</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <TextInput placeholder="email" style={styles.input}/>
                    <TextInput placeholder="password" style={styles.input} secureTextEntry={true}/>
                    <View style={styles.buttonRow}>
                        <View style={styles.buttonLogin}>
                            <Button title="Login" onPress={() => navigation.navigate('Home')}/>
                        </View>
                        <View style={styles.buttonCreateAcc}>
                            <Button title="Create Account" onPress={() => navigation.navigate('Home')}/>
                        </View>
                    </View>
                </View>
                <View>
                     <Text style={styles.text}>Decoded JWT: {JSON.stringify(decoded)}</Text>
                 </View>      
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#272525',
        alignItems: 'center',
        justifyContent: 'center',
      },
    container: {
        flex: 1,
        marginTop: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272525',
    },
    navRow: {
        backgroundColor: '#181818',
        paddingTop: 30,
        paddingBottom: 10,
        width: '100%',
      },
    input: {
        minWidth: '80%',
        height: '20%',
        backgroundColor: 'white',
        padding: 10,
        margin: 20,
        borderWidth: 1,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    buttonLogin: {
        marginHorizontal: 10,
        height: 60,
        width: 110,
    },
    buttonCreateAcc: {
        marginHorizontal: 10,
        height: 60, 
        width: 200,       
    },
    titleText: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    text: {
        color: 'white',
        textAlign: 'center',
    },
});