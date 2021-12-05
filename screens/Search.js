import React from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, SafeAreaView } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function Search({navigation}) {
    const [word, setWord] = React.useState("");

    return(
        <SafeAreaView style={globalStyles.container}>
            <View style={[globalStyles.row_button, {height:200, marginTop:50, flexDirection:"column"}]}>
                <TextInput style={globalStyles.input} placeholder='Ex: hope' onChangeText={setWord} value={word} />
                <TouchableOpacity style={globalStyles.search_button} onPress={() => {navigation.navigate('WordPage', {word: word})}}>
                    <Text style={globalStyles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}