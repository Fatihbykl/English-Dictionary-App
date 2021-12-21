import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { Ionicons, Feather, FontAwesome, Foundation } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { randomWordList } from '../randomWords';
import { openDatabase } from 'expo-sqlite';

export const db = openDatabase('database.db');

export default function Home({ navigation }) {
    const getRandomWord = () => {
        let randomWord = "";
        randomWord = randomWordList[Math.floor(Math.random() * randomWordList.length)];
        navigation.navigate('WordPage', { word: randomWord });
    }

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

    const openPlayStore = () => {
        Linking.openURL(`market://details?id=com.devbayk.dictionary`)
        .catch(
              (err) => alert('Please check for Google Play Store')
            );
    }
    
    useEffect(async () => {
        await createTables();
    }, []);

    return(
        <SafeAreaView style={globalStyles.container}>
                <View style={globalStyles.row_button}>
                    <View style={{flex:1}}>
                        <Feather name="search" size={32} color="#0869ae" />
                    </View>
                    <View style={{flex:5}}>
                        <TouchableOpacity onPress={() => {navigation.navigate('Search')}}>
                            <Text style={globalStyles.row_button_hText}>Search</Text>
                            <Text style={globalStyles.row_button_text}>Search for learning new words!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={globalStyles.row_button}>
                    <View style={{flex:1}}>
                    <Ionicons name="bookmarks" size={32} color="#0869ae" />
                    </View>
                    <View style={{flex:5}}>
                        <TouchableOpacity onPress={() => {navigation.navigate('Bookmarks')}}>
                            <Text style={globalStyles.row_button_hText}>Bookmarks</Text>
                            <Text style={globalStyles.row_button_text}>Practise words.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            <View style={globalStyles.row_button}>
                <View style={{flex:1}}>
                <FontAwesome name="random" size={32} color="#0869ae" />
                </View>
                <View style={{flex:5}}>
                    <TouchableOpacity onPress={() => {getRandomWord()}}>
                        <Text style={globalStyles.row_button_hText}>Random Word</Text>
                        <Text style={globalStyles.row_button_text}>Explore new words!</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={globalStyles.row_button}>
                <View style={{flex:1}}>
                <Foundation name="clipboard-notes" size={32} color="#0869ae" />
                </View>
                <View style={{flex:5}}>
                    <TouchableOpacity onPress={() => {navigation.navigate('Notes')}}>
                        <Text style={globalStyles.row_button_hText}>Notes</Text>
                        <Text style={globalStyles.row_button_text}>Take notes.</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={globalStyles.row_button}>
                <View style={{flex:1}}>
                <FontAwesome name="star" size={32} color="#0869ae" />
                </View>
                <View style={{flex:5}}>
                    <TouchableOpacity onPress={() => {openPlayStore()}}>
                        <Text style={globalStyles.row_button_hText}>Rate Us</Text>
                        <Text style={globalStyles.row_button_text}>Visit our Google Play page.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}