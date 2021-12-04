import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import RandomWord from './screens/RandomWord';
import Search from './screens/Search';
import Notes from './screens/Notes';
import Bookmarks from './screens/Bookmarks'
import { FontAwesome } from '@expo/vector-icons';
import { openDatabase } from 'expo-sqlite';
import WordPage from './screens/WordPage';

const Stack = createNativeStackNavigator();
export const db = openDatabase('database.db');

export default function App() {

  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(50), note VARCHAR(300))`,
        [],
        (sqlTxn, res) => {
          console.log("table NOTES succesfully created");
        },
        error => {
          console.log("error on creating NOTES table " + error.message);
        },
      );
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS bookmarks (id INTEGER PRIMARY KEY AUTOINCREMENT, word VARCHAR(20))`,
        [],
        (sqlTxn, res) => {
          console.log("table BOOKMARKS succesfully created");
        },
        error => {
          console.log("error on creating BOOKMARKS table " + error.message);
        },
      );
    });
  };

  useEffect(async () => {
    await createTables();
  }, []);

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
            backgroundColor: '#0869ae',
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
            backgroundColor: '#0869ae',
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


