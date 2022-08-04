import { View, Text, StyleSheet, TextInput , TouchableOpacity } from 'react-native';
import React, {useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase.js';
import { useAuth } from '../contexts/AuthContext.js';
import "firebase/compat/auth";
export default function SignupScreen() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();
    const navigation = useNavigation();

    const handleSignUp = async() => {

        if (Password !== ConfirmPassword) {
            return setError('Passwords do not match');
        }
        try{
            setError(''); 
            setLoading(true);
            await signUp(Email, Password);
            navigation.replace('Dashboard');
           
        }catch{
            setError('Error signing up');
        }
        setLoading(false);
    }

    return (
        <View>
            <View>
               <Text style={styles.error} > {Error && Error}</Text> 
            </View>
            <View>
                <Text>Signup</Text>
                <TextInput placeholder=" Email"  style = {styles.input} behavior="padding" 
                    value ={Email} onChangeText={(text) => setEmail(text) } required
                />
                <TextInput placeholder=" Password" style = {styles.input} secureTextEntry behavior="padding" 
                    value ={Password} onChangeText={(text) => setPassword(text)} required
                />
                <TextInput placeholder=" Retype Password " style = {styles.input} secureTextEntry behavior="padding" 
                    value ={ConfirmPassword} onChangeText={(text) =>  setConfirmPassword(text)   } required
                />
            </View>
        
            <TouchableOpacity
                style = {styles.button}
                onPress = { handleSignUp }
                disabled = {loading}
            >
                <Text style = {{color : '#fff'}} >Register</Text>   
            </TouchableOpacity> 
            <View>
                <Text>Already have an account?</Text>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => navigation.navigate('Login') }
                >
                    <Text style = {{color : '#ffff'}} >Login</Text>
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
        width: '30%'
    }
});