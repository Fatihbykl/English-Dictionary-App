import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e9eff3',
      alignItems: "center",
    },

    row_button: {
      width: '100%',
      minHeight: 100,
      backgroundColor: '#fff',
      padding: 30,
      marginVertical: 10,
      justifyContent: "center",
      flexDirection:"row",
    },

    row_button_hText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#707478",
    },

    row_button_text: {
      fontSize:12,
      color: "#aeb4b8",
    },

    note_header: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
      marginBottom: 5,
    },

    note_text: {
      fontSize: 14,
      color: "#707478",
    },
    
    input: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#0869ae',
      padding: 5,
      fontWeight: "bold",
      width: '98%',
      height: 50,
    },

    search_button: {
      backgroundColor: '#0869ae',
      color: 'white',
      fontWeight: "bold",
      alignItems:"center",
      borderRadius: 5,
      height: 40,
      justifyContent: "center",
      marginTop: 20,
    },

    hr: {
      borderBottomColor: '#0869ae',
      borderBottomWidth: 1,
      width: '100%',
      marginVertical: 10,
    },

    modal: {
      minHeight: 200,
      backgroundColor: 'white',
      marginTop:'40%',
      marginHorizontal:20,
      borderRadius: 20,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    header: {
      width:'100%',
      backgroundColor: '#04426f',
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
    },

    wordPageContainer: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      width: '100%',
    },

    wordPageHeader: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
      marginBottom: 20,
    },

    wordPageText: {
      color: "black",
      fontSize: 16,
    },

    buttonText: {
      color:"white", 
      fontWeight:"bold",
    }
});