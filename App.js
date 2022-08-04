import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';
import DashboardScreen from './screens/DashboardScreen';
import ForgotPasswordScreen from './screens/ForgorPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import UpdateProfilScreen from './screens/UpdateProfilScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const options = {
    headerShown: false
  };

  return (
    <AuthProvider >
      <NavigationContainer>
        <Stack.Navigator initialRouteName ="Login" screenOptions={options} >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ResetPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="UpdateProfile" component={UpdateProfilScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
