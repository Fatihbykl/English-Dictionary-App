import React from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function Search({navigation}) {
    const [word, setWord] = React.useState("");

    return(
        <View style={globalStyles.container}>
            <View style={[globalStyles.row_button, {height:200, marginTop:50, flexDirection:"column"}]}>
                <TextInput style={globalStyles.input} placeholder='Ex: hope' onChangeText={setWord} value={word} />
                <TouchableOpacity style={globalStyles.search_button} onPress={() => {navigation.navigate('WordPage', {word: word})}}>
                    <Text>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}