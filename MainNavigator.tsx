import React from 'react'
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { CardScreen } from './src/screens/CardScreen';
import { Registration } from './src/screens/RegistrationScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export default function MainNavigator() {

  return (
    <Stack.Navigator initialRouteName="Card" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Card" component={CardScreen} />
    </Stack.Navigator>
  )
}
