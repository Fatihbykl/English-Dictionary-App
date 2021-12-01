import React from "react";
import { StyleSheet, View, Text, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, FontAwesome, Foundation, MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

export default function Home({ navigation }) {

    const pressHandler = (props) => {
        navigation.navigate(props);
    }

    return(
        <View style={globalStyles.container}>
            
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
                    <TouchableOpacity onPress={() => {navigation.navigate('RandomWord')}}>
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
                <MaterialIcons name="translate" size={32} color="#0869ae" />
                </View>
                <View style={{flex:5}}>
                    <TouchableOpacity onPress={() => {navigation.navigate('Translate')}}>
                        <Text style={globalStyles.row_button_hText}>Translate</Text>
                        <Text style={globalStyles.row_button_text}>Translate to your native language.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}