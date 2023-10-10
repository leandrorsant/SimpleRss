import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import { Linking } from 'react-native';
import { useCallback, useState, useEffect } from 'react';


import { Colors } from './components/styles/colors';



const getData = () => {
 
}



export default function App() {
  
  const [feedData,setFeedData]=useState([])
  const [title, setTitle,] = useState('');

  useEffect( () => {
    fetch('http://www.nasa.gov/rss/dyn/breaking_news.rss')
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      //console.log(rss.title);
      //console.log(rss);
      setFeedData(rss.items);
      setTitle(rss.items[1].title);
      }).catch(error=>console.log(error))
    })

  

  //console.log(feedData[0].title);
  const data = Array();
  
  return (
    
    <View style={styles.container}>

      <FlatList 
        data={feedData}
        renderItem={(item) => (
        <TouchableOpacity style={{margin: 50, backgroundColor: Colors.white}}
        onPress={() => Linking.openURL(item.item.id) }
        >
          <Text>{JSON.stringify(item.item.title)}</Text>
          <Text>{JSON.stringify(item.item.description)}</Text>
          
        </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        scrollEnabled={true}
      />
      
     
      <StatusBar style="auto" />
     
    </View>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
