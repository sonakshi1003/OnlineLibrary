import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import db from "../config"
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class Searchscreen extends React.Component {
  constructor(props){
    super(props)
    this.state={allTransaction: [], lastVisibileTransaction: null, search: ""}

  }

  componentDidMount = async()=>{
    const query = await db.collection("transaction").limit(10).get()
    query.docs.map((doc) => {
      this.setState({
        allTransaction: [...this.state.allTransaction, doc.data()], 
        lastVisibileTransaction: doc
      })
    })
  }

  fetchMoreTransactions = async () => {
    var enterText = text.split("")
    var text = text.toUpperCase()
    if(enterText [0].toUpperCase() === "B"){
    const query = await db.collection("transaction").where("bookID", "===", text).startAfter(this.state.lastVisibileTransaction).limit(10).get()
    query.docs.map((doc) => {
      this.setState({
        allTransaction: [...this.state.allTransaction, doc.data()], 
        lastVisibileTransaction: doc
      })
    })
  }

  else if(enterText [0].toUpperCase() === "S"){
    const query = await db.collection("transaction").where("studentID", "===", text).startAfter(this.state.lastVisibileTransaction).limit(10).get()
    query.docs.map((doc) => {
      this.setState({
        allTransaction: [...this.state.allTransaction, doc.data()], 
        lastVisibileTransaction: doc
      })
    })
  }
}

  searchTransactions = async (text) => {
    var enterText = text.split("")
    var text = text.toUpperCase()
    if(enterText [0].toUpperCase() === "B"){
    const query = await db.collection("transaction").where("bookID", "===", text).limit(10).get()
    query.docs.map((doc) => {
    this.setState({
      allTransaction: [...this.state.allTransaction, doc.data()], 
      lastVisibileTransaction: doc
      })
    })
    }
    else if(enterText [0].toUpperCase() === "S"){
      const query = await db.collection("transaction").where("studentID", "===", text).limit(10).get()
      query.docs.map((doc) => {
      this.setState({
        allTransaction: [...this.state.allTransaction, doc.data()], 
        lastVisibileTransaction: doc
        })
      })
      }
  }
    render() {
      return (
        <View style = {styles.container}>
        <View style = {styles.searchBar}>
        <TextInput
        style = {styles.bar}
        placeholder = {"Enter Book ID or Student ID"}
        onChangeText  = {(text) => {
        this.setState({search: text})
        }}
        />
        <TouchableOpacity style = {styles.searchButton} onPress = {() => {
          this.searchTransactions(this.state.search)
        }}> <Text> Search </Text></TouchableOpacity>        
        </View>
        <FlatList
        data = {this.state.allTransaction}
        renderItem = {({item}) => (<View style = {{borderBottomWidth: 2}}>
          <Text> {"BookID: " + transaction.BookID}</Text>
          <Text> {"StudentID: " + transaction.StudentID}</Text>
          <Text> {"TransactionType: " + transaction.TransactionType}</Text>
          <Text> {"Date: " + transaction.Date}</Text>
        </View>)}
        keyExtractor = {(item, index)=> index.toString()}
        onEndReached = {this.fetchMoreTransactions}
        onEndReachedThreshold = {0.7}
        />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 15,
      textAlign: 'center',
      marginTop: 10
    },
    inputView:{
      flexDirection: 'row',
      margin: 20
    },
    inputBox:{
      width: 200,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    scanButton:{
      backgroundColor: '#66BB6A',
      width: 50,
      borderWidth: 1.5,
      borderLeftWidth: 0
    },
    submitButton:{
      backgroundColor: '#FBC02D',
      width: 100,
      height:50
    },
    submitButtonText:{
      padding: 10,
      textAlign: 'center',
      fontSize: 20,
      fontWeight:"bold",
      color: 'white'
    }
  });