import { View, Text, StyleSheet, TextInput , TouchableOpacity } from 'react-native';
import React, {useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase.js';
import { useAuth } from '../contexts/AuthContext.js';
import "firebase/compat/auth";
export default function LoginScreen() {
    const [Email, setEmail] = useState('');
    const [Error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { resetPassword } = useAuth();
    const navigation = useNavigation();
   

    const handleResetPassword = async() => {
        try{
            setMessage('');
            setLoading(true);
            await resetPassword(Email);
            setMessage('Email sent , please check your email');
        }catch{
            setError('Error in reset password');
        }
        setLoading(false);
    }

    return (
        <View>
            <View>
               <Text style={styles.error} > {Error && Error}</Text> 
               <Text style={styles.error} > {message && message}</Text> 
            </View>
            <View>
                <Text>Log In</Text>
                <TextInput placeholder=" Email"  style = {styles.input} behavior="padding" 
                    value ={Email} onChangeText={(text) => setEmail(text) } required
                />
            </View>
        
            <TouchableOpacity
                style = {styles.button}
                onPress = { handleResetPassword }
                disabled = {loading}
            >
                <Text style = {{color : '#fff'}} >Reset Password</Text>   
            </TouchableOpacity> 
            <View>
                <Text>You Already Have An Account ?</Text>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => navigation.navigate('Login') }
                >
                    <Text style = {{color : '#ffff'}} >Login</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>You Have An Account ?</Text>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => navigation.navigate('Signup') }
                >
                    <Text style = {{color : '#ffff'}} >Sign Up</Text>
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