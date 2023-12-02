import { Appearance, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapPage from '../screens/Map';
import PlayMusic from '../screens/PlayMusic';
import Profile from '../screens/Profile';
import SamplesInLocation from '../screens/SamplesInLocation';
import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';
import { getLocations } from '../api/Location';
import { locationHasSample } from '../api/Sample';
import { colors } from '../data/theme';
import icons from '../data/icons';
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator } from "@react-navigation/stack";

/**
 * Represents a tab icon and its respective styling, with special rules
 * made for the middle icon in the tab.
 * @param {Object} focused check if the app is focused or not, again, not used
 *                          but here to make sure app don't go kaput.
 * @param {Object} icon icon of the tab.
 * @param {string} label label that'll apepar bellow icon, will always be empty
 *                       except for the middle tab bar, cause the middle one's
 *                       always the special one.
 * @returns {React.JSX.Element} react component for a tab icon
 */
// Based on Week 10 contact code
const TabIcon = ({ focused, icon, label }) => {
  const tabIconStyle = StyleSheet.create({
    tabIconIcon: {
      width: "100%",
      height: "100%",
      // backgroundColor: "black",
      flex: 1,
      flexDirection: "column"
      
    },

    tabIconLabel: {
      fontSize: 10,
    }
  })
  return (
    <>
      <Image
        source={icon}
        resizeMode='contain'
        style={tabIconStyle.tabIconIcon}
      />
      {
        (label !== "") ? 
          <Text style={tabIconStyle.tabIconLabel}>
            {label}
          </Text>
        :
          <></>
      }
    </>
  )
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// Based on Week 10 contact code
const tabOptions = (icon, label) => {
    return {
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icon} 
                                              label={label}/>,
        tabBarStyle: {
            height: 20,
            padding: 10,
        },
        headerShown: false
    }
}

/**
 * Returns a custome tab bar with a linear gradient and custome styling, in
 * addition it disables touch events for the middle tab bar.
 * @param {Onbject} props default props for state, descriptor and naviagtion,
 *                        they do stuff and I only touch the ones I need to
 *                        modify .
 * @returns {React.JSX.Element} react component
 */
// Source: https://reactnavigation.org/docs/bottom-tab-navigator/
const TabBar = ({state, descriptors, navigation}) => {
  const tabBarStyle = StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      height: 55,
    },
  });
  return (
      <LinearGradient 
        colors={[colors.purpleColorLighter, colors.blueColorDarker]}
        style={tabBarStyle.tabBarContainer}
        start={{x:0, y:0}}
        end={{x:0, y:1}}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          
          const TabBarIcon = options.tabBarIcon;
          
          const isFocused = state.index === index;
  
          const onPress = () => {
            if (route.name !== "App Icon") {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            }
          };
  
          const onLongPress = () => {
            if (route.name !== "App Icon") {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            }
          };

          const tabIconStyle = StyleSheet.create({
            tabIconContainer: {
              alignItems: "center",
              justifyContent: "center",
              flex:1,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: isFocused ? colors.blackColorTranslucentMore : colors.blackColorTranslucentLess
            }
          })

          if (route.name === "Main") {
            return (
              <></>
            );
          }

          if (route.name === "App Icon") {
            return (
              <View style={tabIconStyle.tabIconContainer}>
                <TabBarIcon />
              </View>
            ); 
          }

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={tabIconStyle.tabIconContainer}
            >
              <TabBarIcon/>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    );
}

/**
 * A stack navigator that sits inside the tab navigator, this allows tabs to 
 * persist across pages 
 * @returns {React.JSX.Element} react component
 */
const Screens = () => {
  return (
    <Stack.Navigator initialRouteName='Maps'>
      <Stack.Screen name="Maps" options={{headerShown:false}}
                                component={MapPage}/>
      <Stack.Screen name="Play Music" options={{headerShown:false}}
                    component={PlayMusic}/>
      <Stack.Screen name="Samples In A Location" 
                    options={{headerShown:false}}
                    component={SamplesInLocation}/>
    </Stack.Navigator>
  );
}

/**
 * The tab navigator component
 */
export default (navigation) => {
    const [ songsNearBy, setSongsNearby ] = useState("");
    const colorScheme = Appearance.getColorScheme();
    useEffect(() => {
        getLocations().then((locations) => {
            Geolocation.getCurrentPosition(async currentLocation => {    
                if (locations && locations.length > 0) {
                    const distances = locations.map((location) => {
                        const distance = getDistance(currentLocation.coords, 
                        {
                            latitude: location.longitude,
                            longitude: location.longitude
                        });
                        return {
                            id: location.id,
                            distance: distance
                        };
                    })

                    const withSongs = await Promise.all(
                            distances.filter(async (distance) => {
                                return await locationHasSample(distance.id);
                        })
                    );
                    
                    const nearby = withSongs.filter((ditstance) => {
                        return ditstance.distance < 20000000;
                    })

                    if (nearby.length > 0) {
                      setSongsNearby("There's Music Nearby")
                    } else {
                      setSongsNearby("");
                    }
                    
                }
            })
        })
    }, []);

    return (
        <Tab.Navigator tabBar={props => <TabBar {...props}/>}
                       initialRouteName='Maps'>
            <Tab.Screen name="Maps" component={Screens} 
                        options={tabOptions(icons.tabMapWhite, "")}
            />
            <Tab.Screen name="App Icon" 
                        component={Screens}
                        options={tabOptions(icons.logoWhite, songsNearBy)}
            />
            <Tab.Screen name="Profile" component={Profile} 
                        options={tabOptions(icons.tabProfileWhite, "")}/>
        </Tab.Navigator>
    );
}

// export const pageTab = (navigation)