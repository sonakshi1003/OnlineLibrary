import React from 'react';
import firebase from 'firebase';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import db from "../config"

export default class LoginScreen extends React.Component {
    constructor(){
     super()
     this.state={password: "", emailId: ""}
    }
    login=async(emailId, password) => {
      if(emailId && password){
       try {
         const response = await firebase.auth().signInWithEmailAndPassword(emailId, password)
        if(response){
          this.props.navigation.navigate('TabNavigator')
        }
       } catch (error) {
         switch(error.code){
           case "auth/user-not-found":
          Alert.alert("User Doesn't exist")
          break;
          case "auth/invalid-email":
            Alert.alert("Incorrect Email or password")
            break;
         }
       }
      }

      else{
        Alert.alert("Enter Email or password")
      }
    } 
    render(){
     return (
         <KeyboardAvoidingView style={{alignItems: "center", marginTop: 20}}>
         <View>
         <TextInput style={Styles.loginBox}
         placeholder = "abc@example.com"
         keyboardType = "email-address"
         onChangeText = {(text) => {
         this.setState({
         emailId: text
         })
         }}
         />

        <TextInput style={Styles.loginBox}
         placeholder = "password"
         secureTextEntry = {true}
         onChangeText = {(text) => {
         this.setState({
         password: text
         })
         }}
         />
         </View>

         <View>
          <TouchableOpacity style={Styles.button}
          onPress = {()=> {
              this.login(this.state.emailId, this.state.password)
          }}
          >
           <Text style={{textAlign: "center"}}>
            login
           </Text>
          </TouchableOpacity>
         </View>
         </KeyboardAvoidingView>
     )
    }
}

const styles = StyleSheet.create({
    loginBox:{
      width: 300,
      height: 40,
      borderWidth: 1.5,
      borderRightWidth: 0,
      fontSize: 20
    },
    button:{
      backgroundColor: '#7f00ff',
      width: 90,
      height: 30,
      borderWidth: 1,
      marginTop: 20,
      paddingTop: 5,
      borderRadius: 0.5
    },
  });