import React, { useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView, Touchable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { AntDesign, FontAwesome, Entypo } from '@expo/vector-icons';
import { db } from '../App';

export default function WordPage({ route }) {
    const [meanings, setMeanings] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [audio, setAudio] = React.useState("");
    const [origin, setOrigin] = React.useState("");
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const [bookmarkIcon, setBookmarkIcon] = React.useState("");


    const { word } = route.params;

    const dictionaryApi = () => {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        .then((response) => response.json())
        .then((responseJson) => {
            setMeanings(responseJson[0].meanings);
            setAudio(responseJson[0].phonetics[0].audio);
            setOrigin(responseJson[0].origin);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoaded(true))
    }

    const Bookmark = () => {
        if(isBookmarked) {
            deleteBookmark();
        }
        else {
            addBookmark();
        }
    }

    const addBookmark = () => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO bookmarks (word) VALUES (?)`,
                [word],
                (sqlTxn, res) => {
                    setBookmarkIcon("bookmark");
                    setIsBookmarked(true);
                    console.log("bookmark succesfully added");
                },
                error => {
                  console.log("error when adding bookmark: " + error.message);
                },
            )
        })
    }

    const deleteBookmark = () => {
        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM bookmarks WHERE word=(?)`,
                [word],
                (sqlTxn, res) => {
                    setBookmarkIcon("bookmark-o");
                    setIsBookmarked(false);
                    console.log("bookmark succesfully deleted");
                },
                error => {
                  console.log("error when deleting bookmark: " + error.message);
                },
            )
        })
    }

    const getBookmark = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM bookmarks WHERE word=(?)`,
                [word],
                (sqlTxn, res) => {
                    console.log("notes retrieved succesfully");

                    let len = res.rows.length;
                    console.log("row length ->>>> " + len);
                    if (len > 0) {
                        setIsBookmarked(true);
                        console.log(isBookmarked);
                    }
                },
                error => {
                  console.log("error on getting notes: " + error.message);
                },
            )
        })
    }

    useEffect(() => {
        if(!isLoaded) {
            dictionaryApi();
            getBookmark();
            if(isBookmarked) { setBookmarkIcon("bookmark"); }
            else { setBookmarkIcon("bookmark-o"); }
        }
    });

    return(
        <View style={[globalStyles.container, {height:'100%'}]}>
            <View style={globalStyles.header}>
                <TouchableOpacity onPress={() => {playSound()}}>
                    <AntDesign name="sound" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{marginLeft: 20, color: "white", fontSize: 16}}>{word}</Text>
                <View style={{alignItems:"flex-end", flex: 1}}>
                    <TouchableOpacity onPress={() => {Bookmark()}}>
                        <FontAwesome name={bookmarkIcon} size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={globalStyles.wordPageContainer}>
                    <Text style={globalStyles.wordPageHeader}>Origin</Text>
                    <Text style={globalStyles.wordPageText}>{ origin }</Text>
                    <View style={[globalStyles.hr, {marginTop:10, width:'95%'}]}></View>
                    <Text style={globalStyles.wordPageHeader}>Meanings</Text>
                    <View style={globalStyles.wordPageContainer}>
                    {meanings.map( m => (
                        <View>
                            <View style={{flexDirection:"row"}}>
                                <Entypo name="dot-single" size={28} color="black" />
                                <Text style={globalStyles.wordPageHeader}>{ m.partOfSpeech }</Text>
                            </View>
                            <View style={{paddingHorizontal:30}}>
                                {m.definitions.map( definition => (
                                    <View style={{marginBottom: 20}}>
                                        <View style={{flexDirection:"row"}}>
                                            <Entypo name="arrow-long-right" size={24} color="black" />
                                            <Text style={[globalStyles.wordPageText, {marginLeft: 5}]}>{ definition.definition }</Text>
                                            
                                        </View>
                                        <View style={{marginTop:10}}>
                                            <Text style={globalStyles.wordPageText}>
                                                { definition.example }
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}