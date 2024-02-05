import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, } from 'react-native';
import Ipcim from './Ipcim';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getAnimals = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim+'/elveszett');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Hiba a lekérdezés során: ' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnimals();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ elveszett_id }) => elveszett_id.toString()}
          renderItem={({ item }) => (
            <View>
              {item.elveszett_kep && (
                <Image
                style={{ width: 300, height: 300, margin:5 }}
                source={{ uri: `http://nodejs2.dszcbaross.edu.hu:22004/kepek/${item.elveszett_kep}` }}
              />
              )}
              <Text style={{marginLeft:5, marginBottom:5}}>{item.elveszett_szoveg}</Text>
              <View style={{borderWidth:1}}/>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;