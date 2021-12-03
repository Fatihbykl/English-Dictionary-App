import React, { useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Modal, FlatList } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../App';

export default function Notes() {
    const [visible, setVisible] = React.useState(false);
    const [noteTitle, setNoteTitle] = React.useState("");
    const [note, setNote] = React.useState("");
    const [notes, setNotes] = React.useState([]);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const addNote = () => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO notes (title, note) VALUES (?,?)`,
                [noteTitle, note],
                (sqlTxn, res) => {
                    console.log("note succesfully created");
                },
                error => {
                  console.log("error when adding note " + error.message);
                },
            )
        })
    }

    const getNotes = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM notes`,
                [],
                (sqlTxn, res) => {
                    console.log("notes retrieved succesfully");

                    let len = res.rows.length;
                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({noteTitle: item.title, note: item.note});
                        }
                        setNotes(results);
                    }
                },
                error => {
                  console.log("error on getting notes " + error.message);
                },
            )
        })
    }

    const renderNotes = ({ item }) => {
        return(
            <View style={[globalStyles.row_button, {flexDirection:"column"}]}>
                <View style={{flex:1}}>
                <Text style={globalStyles.note_header}>{item.noteTitle}</Text>
                <Text style={globalStyles.note_text}>{item.note}</Text>
                </View>
            </View>
        )
    }

    useEffect(() => {
        getNotes();
    }, [])
    

    return(
        <View style={globalStyles.container}>
            <Modal
                animationType = {"slide"} 
                transparent = {true}
                visible = {visible}
                onRequestClose = {() => { alert(noteTitle, note) } }>
               
                <View style={globalStyles.modal}>
                  <Text style={[globalStyles.row_button_hText, {marginBottom:10}]}>Note Title</Text>
                  <TextInput style={[globalStyles.input, {width:'100%'}]} onChangeText={setNoteTitle} value={noteTitle} />
                  <Text style={[globalStyles.row_button_hText, {marginBottom:10, marginTop:20}]}>Note</Text>
                  <TextInput style={[globalStyles.input, {width:'100%', marginBottom: 30}]} onChangeText={setNote} value={note} />
                  <View style={{flexDirection:"row", width:'100%'}}>
                    <TouchableOpacity style={[globalStyles.search_button, {flex:1, marginRight: 20, backgroundColor:'#eb265d'}]} onPress = {() => {hideModal()}}><Text>Close</Text></TouchableOpacity>
                    <TouchableOpacity style={[{flex:1}, globalStyles.search_button]} onPress = {() => {addNote()}}><Text>Add</Text></TouchableOpacity>
                  </View>
                </View>
            </Modal>
            <View style={globalStyles.row_button}>
                <MaterialIcons name="post-add" size={30} color="black" />
                <TouchableOpacity onPress = {() => {showModal()}}>
                    <Text style={[globalStyles.row_button_hText,  {fontSize:20, marginLeft:5}]}>Add Note</Text>
                </TouchableOpacity>
            </View>
            <View style={[globalStyles.hr, {marginTop:10, width:'95%'}]}></View>
            <FlatList data={notes} style={{width:'98%'}} renderItem={renderNotes} />
        </View>
    )
}