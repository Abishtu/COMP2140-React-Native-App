import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabBar from './components/TabBar';
import { colors } from './data/theme';
import MapPage from './screens/Map';
import NearMe from './screens/NearMe';
import PlayMusic from './screens/PlayMusic';
import Profile from './screens/Profile';
import SamplesInLocation from './screens/SamplesInLocation';
import { getSamples } from './api/Sample';
import { allLocations } from './data/cache/cache';
import { getLocations } from './api/Location';
const Stack = createStackNavigator();

/**
 * Returns the whole app with all relevant elements.
 * @returns {React.JSX.Element} React component represntign the whole app.
 */
const App = () => {
    const [ locations, setLocations ] = useState([]);

    useEffect(() => {
      getLocations().then((result) => {
          setLocations(result);
          allLocations.push(result);
      })
    }, [])
    return (
        <SafeAreaView style={{backgroundColor:colors.dark.bgColor, flex: 1}}>
            <NavigationContainer>
                <TabBar/>
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default App;