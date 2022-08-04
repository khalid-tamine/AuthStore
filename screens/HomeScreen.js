import { View, Text , StyleSheet} from 'react-native';
import React from 'react';
import  {useNavigation} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-web';
import firebase from '../firebase.js';
import { useAuth } from '../contexts/AuthContext.js';
export default function HomeScreen() {

  const {currentUser} = useAuth();
  const navigation = useNavigation();
  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        navigation.navigate('Signup');
      }
      )
      .catch(error => {
        console.log(error.message);
      }
      );
  }

  return (
    <View style = {styles.container}>
      <Text>Email : {currentUser?.email} </Text>
      <TouchableOpacity style = {styles.button}
        onPress = {handleSignOut}
      >
        <Text style = {{color : '#ffff'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000'
  }
})