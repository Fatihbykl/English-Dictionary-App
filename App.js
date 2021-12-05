import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import RandomWord from './screens/RandomWord';
import Search from './screens/Search';
import Notes from './screens/Notes';
import Bookmarks from './screens/Bookmarks'
import { FontAwesome } from '@expo/vector-icons';
import WordPage from './screens/WordPage';

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
        name="Bookmarks"
        component={Bookmarks}
        options={{
          title: 'Bookmarks',
          headerStyle: {
            backgroundColor: '#ff5722',
          },
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
        <Stack.Screen 
        name="Notes" 
        component={Notes}
        options={{
          title: 'Notes',
          headerStyle: {
            backgroundColor: '#673ab7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen 
        name="WordPage" 
        component={WordPage}
        options={{
          title: 'Word Page',
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


