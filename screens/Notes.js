import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, SafeAreaView } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { db } from '../screens/Home';

export default function Notes() {
    const [visible, setVisible] = React.useState(false);
    const [noteTitle, setNoteTitle] = React.useState("");
    const [note, setNote] = React.useState("");
    const [notes, setNotes] = React.useState([]);
    const [render, setRender] = React.useState(0);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const addNote = () => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO notes (title, note) VALUES (?,?)`,
                [noteTitle, note],
                (sqlTxn, res) => {
                    console.log("note succesfully created");
                    hideModal();
                    setRender(render => render + 1);
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
                    let len = res.rows.length;
                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({id: item.id, noteTitle: item.title, note: item.note});
                        }
                        setNotes(results);
                        console.log("----> " + notes);
                    }
                    else { setNotes(""); }
                    console.log("notes retrieved succesfully");
                },
                error => {
                  console.log("error on getting notes " + error.message);
                },
            )
        })
    }

    const deleteNotes = (id) => {
        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM notes WHERE id=(?)`,
                [id],
                (sqlTxn, res) => {
                    console.log("note succesfully deleted");
                    setRender(render => render + 1);
                },
                error => {
                  console.log("error when deleting note: " + error.message);
                },
            )
        })
    }

    const renderNotes = ({ item }) => {
        return(
            <View style={[globalStyles.row_button, {flexDirection:"row", marginVertical:5}]}>
                <View style={{flex:11}}>
                    <Text style={globalStyles.note_header}>{item.noteTitle}</Text>
                    <Text style={globalStyles.note_text}>{item.note}</Text>
                </View>
                <View style={{flex:1, justifyContent:"center"}}>
                    <TouchableOpacity onPress={() => {deleteNotes(item.id)}}>
                        <FontAwesome5 name="times" size={26} color="#673ab7" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    useEffect(() => {
        getNotes();
        setNoteTitle("");
        setNote("");
    }, [render])
    

    return(
        <SafeAreaView style={globalStyles.container}>
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
                    <TouchableOpacity style={[globalStyles.search_button, {flex:1, marginRight: 20, backgroundColor:'#eb265d'}]} onPress = {() => {hideModal()}}>
                        <Text style={globalStyles.buttonText}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{flex:1}, globalStyles.search_button]} onPress = {() => {addNote()}}>
                        <Text style={globalStyles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            </Modal>
            <View style={globalStyles.row_button}>
                <MaterialIcons name="post-add" size={30} color="black" />
                <TouchableOpacity onPress = {() => {showModal()}}>
                    <Text style={[globalStyles.row_button_hText,  {fontSize:20, marginLeft:5}]}>Add Note</Text>
                </TouchableOpacity>
            </View>
            <View style={globalStyles.hr}></View>
            <FlatList keyExtractor={item => item.id} data={notes} style={{width:'100%'}} renderItem={renderNotes} />
        </SafeAreaView>
    )
}