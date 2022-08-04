import { View, Text, StyleSheet, TextInput , TouchableOpacity } from 'react-native';
import React, {useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase.js';
import { useAuth } from '../contexts/AuthContext.js';
import "firebase/compat/auth";

export default function UpdateProfilScreen() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { currentUser , updateEmail , updatePassword  } = useAuth();
    const navigation = useNavigation();


    const handleUpdateProfil = () => {

        if (Password !== ConfirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        setError('');
        const promises = [];

        if (Email !== currentUser.email) {
            promises.push(updateEmail(Email));
        }
        if (Password !== '') {
            promises.push(updatePassword(Password));
        }

        Promise.all(promises).then(() => {
                navigation.navigate('Home');
            }).catch(error => {
                setError(error.message);
            }).finally(() => {
                setLoading(false);
            }
        );
    }

    return (
        <View>
            <View>
               <Text style={styles.error} > {Error && Error}</Text> 
            </View>
            <View>
                <Text>Update Profil</Text>
                <TextInput placeholder=" Email"  style = {styles.input} behavior="padding" 
                    onChangeText={(text) => setEmail(text) } required
                    defaultValue={currentUser?.email} 
                />
                <TextInput placeholder="Leave blank to keep same" style = {styles.input} secureTextEntry behavior="padding" 
                    value ={Password} onChangeText={(text) => setPassword(text)} 
                />
                <TextInput placeholder="Leave blank to keep same"  style = {styles.input} secureTextEntry behavior="padding" 
                    value ={ConfirmPassword} onChangeText={(text) =>  setConfirmPassword(text)   } 
                /> 
            </View>
        
            <TouchableOpacity
                style = {styles.button}
                onPress = { handleUpdateProfil }
                disabled = {loading}
            >
                <Text style = {{color : '#fff'}} >Update</Text>   
            </TouchableOpacity> 
            <View>
                <TouchableOpacity
                    style = {styles.button}
                    onPress = {() => navigation.navigate('Dashboard') }
                >
                    <Text style = {{color : '#ffff'}} >Cancel</Text>
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