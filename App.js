import * as React from 'react';
import { useState } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Kepfeltolt from "./Kepfeltolt";
import Felvitel from "./Felvitel"
import LoginScreen from './login';
import RegisterScreen from './regist';
import Logout from './Logout';
import Video from './Video';
import Proba2 from './Proba2'
//ádám
import FelvitelAdam from "./FelvitelAdam";
import Getesorokbefogadas from "./Getesorokbefogadas";
import Kozosscreen from './Kozosscreen';
import Ujlap from "./Ujlap";
import Ujlapfelhasznalo from "./Ujlapfelhasznalo";
import Orokbefogadasfelulet from "./Orokbefogadasfelulet";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{height:400,width:390}}>
        <Video/>
      </View>
      
    </View>
  );
}

function Root({ route, navigation }) {
  const isAuthenticated = route.params?.authenticated || false;

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Drawer.Navigator initialRouteName={isAuthenticated ? "Home" : "Home"}>
      {isAuthenticated ? (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Állat örökbeadása" component={Kepfeltolt} />
          <Drawer.Screen name="Elveszett Jelentés" component={Felvitel} />
          <Drawer.Screen name="Elveszett" component={Proba2} />
          {/*Ádám*/}
          <Drawer.Screen name='FelvitelA' component={FelvitelAdam}/>
          <Drawer.Screen name='KozosscreenA' component={Kozosscreen}/>
          <Drawer.Screen name='GetesorokbefogadasA' component={Getesorokbefogadas}/>
          <Drawer.Screen name="Logout">
            {() => (
              <Logout setAuthenticated={route.params?.setAuthenticated} />
            )}
          </Drawer.Screen>
        </>
      ) : (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Login">
            {() => <LoginScreen setAuthenticated={route.params?.setAuthenticated} />}
          </Drawer.Screen>
          <Drawer.Screen name="Elveszett" component={Proba2} />
          
        </>
      )}
    </Drawer.Navigator>
  );
}


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          initialParams={{ setAuthenticated }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          initialParams={{ setAuthenticated }}
        />
        <Stack.Screen name="Ujlap" component={Ujlap} />
        <Stack.Screen name="Ujlapfelhasznalo" component={Ujlapfelhasznalo} />
        <Stack.Screen name='Orokbefogadasfelulet' component={Orokbefogadasfelulet}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
