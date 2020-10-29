import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import Constants from 'expo-constants';



// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  const[data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect (() => {
    fetch('https://reactnative.dev/movies.json')
    .then((response) => response.json())
    .then((json) => setData(json.movies))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false))
  },[]);
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        List Film
      </Text>
    {
      loading ? <ActivityIndicator /> : (
        <FlatList
        data={data}
        keyExtractor={({id}, index) => id}
        renderItem={({item}) => (
          <Card style={{margin:4}}>
          <Text style={{fontSize:16, padding:20}}> Judul Film: {item.title}{'\n'}
          Tahun Tayang: {item.releaseYear} </Text>
          </Card>
        )}
        />
      )
    }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
    
  },
});
