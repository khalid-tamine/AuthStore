import { View, Text , StyleSheet , TouchableOpacity } from 'react-native'
import React , { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebase from '../firebase.js'; 
import "firebase/compat/auth";
import { useAuth } from '../contexts/AuthContext.js';

export default function DashboardScreen() {

  const navigation = useNavigation();
  const { currentUser , logOut } = useAuth();
  const [Error, setError] = useState('');

  const handleLogOut = async() => {
    setError('');

    try{
      await logOut();
      navigation.replace('Login');
    }
    catch{
      setError('Error logging out');
    }
  }

  return (
    <View>
        <View>
          <Text style={styles.error} > {Error && Error}</Text> 
        </View>
        <View>
          <Text>Dashboard</Text>
          <Text>Email : { currentUser?.email} </Text>
          <View>
            <TouchableOpacity style = {styles.button}
              onPress = {() => navigation.navigate('UpdateProfile')}
            >
                <Text style = {{color : '#ffff'}}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button}
              onPress = {handleLogOut}
            >
                <Text style = {{color : '#ffff'}}>Logout</Text>
            </TouchableOpacity>
            
          </View>
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