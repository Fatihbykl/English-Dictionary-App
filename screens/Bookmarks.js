import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { db } from '../screens/Home';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Bookmarks({navigation}) {
    const [words, setWords] = React.useState([]);
    const [render, setRender] = React.useState(0);

    const getBookmarks = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM bookmarks`,
                [],
                (sqlTxn, res) => {
                    let len = res.rows.length;
                    if (len > 0) {
                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({id: item.id, word: item.word});
                        }
                        setWords(results);
                    }
                    console.log("bookmarks retrieved succesfully");
                },
                error => {
                  console.log("error on getting bookmarks: " + error.message);
                },
            )
        })
    }

    const deleteBookmark = (id) => {
        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM bookmarks WHERE id=(?)`,
                [id],
                (sqlTxn, res) => {
                    console.log("bookmark succesfully deleted");
                    setRender(render => render + 1);
                },
                error => {
                  console.log("error when deleting bookmark: " + error.message);
                },
            )
        })
    }

    const renderBookmarks = ({item}) => {
        return(
            <TouchableOpacity onPress={() => {navigation.navigate('WordPage', {word:item.word})}}>
                <View style={[globalStyles.row_button, {minHeight:20, padding:20, margin:3, flexDirection:"row"}]}>
                    <View style={{flex:11}}>
                        <Text style={{fontSize: 16, color:"black"}}>{item.word}</Text>
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={() => {deleteBookmark(item.id)}}>
                            <FontAwesome5 name="times" size={26} color="#ff5722" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        getBookmarks();
    }, [render])

    return(
        <View style={globalStyles.container}>
            <FlatList keyExtractor={item => item.id} data={words} style={{width:'100%'}} renderItem={renderBookmarks} />
        </View>
    )
}