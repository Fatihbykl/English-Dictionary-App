import React from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function Search() {
    return(
        <View style={globalStyles.container}>
            <View style={[globalStyles.row_button, {height:200, marginTop:50, flexDirection:"column"}]}>
                <TextInput style={globalStyles.input} placeholder='Ex: hope' />
                <TouchableOpacity style={globalStyles.search_button}>Search</TouchableOpacity>
            </View>
        </View>
    )
}