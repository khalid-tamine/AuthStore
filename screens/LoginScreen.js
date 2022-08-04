import { View, Text, StyleSheet, TextInput , TouchableOpacity } from 'react-native';
import React, {useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase.js';
import { useAuth } from '../contexts/AuthContext.js';
import "firebase/compat/auth";
export default function LoginScreen() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { logIn , currentUser } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        if (currentUser){   
            navigation.navigate('Dashboard');
        }
    }, [])
   

    const handleLogIn = async() => {
        try{
            setError(''); 
            setLoading(true);
            await logIn(Email, Password);
            navigation.navigate('Dashboard');
        }catch{
            setError('Error sign in');
        }
        setLoading(false);
    }

    return (
        <View>
            <View>
               <Text style={styles.error} > {Error && Error}</Text> 
            </View>
            <View>
                <Text>Log In</Text>
                <TextInput placeholder=" Email"  style = {styles.input} behavior="padding" 
                    value ={Email} onChangeText={(text) => setEmail(text) } required
                />
                <TextInput placeholder=" Password" style = {styles.input} secureTextEntry behavior="padding" 
                    value ={Password} onChangeText={(text) => setPassword(text)} required
                />
            </View>
        
            <TouchableOpacity
                style = {styles.button}
                onPress = { handleLogIn }
                disabled = {loading}
            >
                <Text style = {{color : '#fff'}} >Log In</Text>   
            </TouchableOpacity> 
            <View>
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => navigation.navigate('Signup') }
                >
                    <Text style = {{color : '#ffff'}} >Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text> Forgot Password ? </Text>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => navigation.navigate('ResetPassword') }
                >
                    <Text style = {{color : '#ffff'}}> Reset Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        margin: 10,
        width: '80%'
    } ,
    error: {
        color: 'red',
        margin: 10,
        fontSize: 16
    } ,
    button: {
        backgroundColor: '#000',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        width: '30%'
    }
});