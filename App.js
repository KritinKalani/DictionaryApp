import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import dictionary from './database.js';
import Header from 'react-native-elements';

export default class App extends React.Component{
constructor(){
  super();
this.state = {
text:'',
  isSearchPressed: false,
  word: "",
  lexicalCategory:'',
  examples:[],
  definition:""
}
}

getWord = (word)=>{
  var searchKeyword = word.toLowerCase;
  var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"

  return fetch(url)
  .then((data)=>{
    if(data.status===200){
      return data.json()
    }
    else{
      return null;
    }
  })

  .then((response) =>{
var responseObj = response;
if(responseObj){
  var wordData = responseObj.definitions[0];
  var definition = wordData.description;
  var lexicalCategory = wordData.wordtype;

  this.setState({
   word:word,
   lexicalCategory:lexicalCategory,
   definition:definition
  })
  }else{
    this.setState({
      word:word,
    definition:"Not Found"
    })
  }
}
  )}


render(){
  return(
    <View>

      <Header></Header>
<TextInput 
style = {styles.inputBox}
value = {this.state.text}
onChangeText = {text=>{
  this.setState({
    text:text,
  isSearchPressed: false,
  word: "Loading..."
  })
}}
/>
<TouchableOpacity style = {styles.searchButton} onPress = {()=>{
  this.setState({isSearchPressed:true})
  this.getWord(this.state.text)
}}>
  <Text>Search</Text>
  </TouchableOpacity>
  <View>
<Text style = {styles.wordStyle}>Word:{this.state.word}</Text>
    </View>
    <View>
    <Text style = {styles.categoryStyle}>Type:{this.state.lexicalCategory}</Text>
    </View>
    <View>
    <Text style = {styles.definitionStyle}>Definition:{this.state.definition}</Text>
</View>
</View>
  )
}
}

const styles = StyleSheet.create(
  {
    inputBox:{
      marginTop:25,
      width:'80%',
      alignSelf:'center',
      borderWidth:2
    },
    searchButton:{
      marginTop:10,
      width:100,
      height:50,
      backgroundColor:'gray',
      alignItems:'center',
      justifyContent:'center'
    },
    wordStyle:{
      marginTop:25,
fontSize:20
  },
  categoryStyle:{
    marginTop:25,
    fontSize:20
  },
  definitionStyle:{
    marginTop:25,
    fontSize:25
  }
})