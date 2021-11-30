import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import RandomWord from './screens/RandomWord';
import Search from './screens/Search';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#0869ae',
          },
          headerLeft: () => (
            <FontAwesome name="home" size={30} color="white" style={{marginLeft: 10}} />
          ),
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen 
        name="RandomWord" 
        component={RandomWord}
        options={{
          title: 'Random Word',
          headerStyle: {
            backgroundColor: '#0869ae',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen 
        name="Search" 
        component={Search}
        options={{
          title: 'Search',
          headerStyle: {
            backgroundColor: '#0869ae',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


