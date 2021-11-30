import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e9eff3',
      alignItems: "center",
    },

    row_button: {
      width: '98%',
      height: 100,
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
    }
});