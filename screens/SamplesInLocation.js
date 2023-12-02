import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "../data/theme";
import MapView, { Marker, Icon } from 'react-native-maps';
import { getLocations } from "../api/Location";
import { getSample, getSampleInLocation, getSamples } from "../api/Sample";
import { currentLocation, locationID, samplesCache } from "../data/cache/cache";
import { Appearance } from "react-native";
import icons from "../data/icons";
import { Rating } from "react-native-ratings";
import TabBar from "../components/TabBar";
/**
 * A card represents a sample in a list of sample for a location, this displays
 * the samples name, date and avg star rating.
 * 
 * @param {Object} cardDetails object that contaians all the card details
 * @param {Object} locationDetails object that contaians all the location details
 * @param {Object} navigation used for page navigation 
 * @param {Object} colorScheme dark mode or light mode
 * @returns {React.JSX.Element} react component
 */
const SampleCard = ({cardDetails, locationDetails, navigation, colorScheme}) => {

    const cardStyle = StyleSheet.create({
        card: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 10,
            borderBottomColor: colors[colorScheme].fgColor,
            borderBottomWidth: 2,
        },
        
        heading: {
            fontSize: 30,
            fontWeight: "bold",
            color: colors[colorScheme].fgColor,
            paddingBottom: 0
        },

        songName: {
            color: colors[colorScheme].fgColor,
            paddingBottom: 0
        },
        
        ratingComponent: {
            ...styles(colorScheme).ratingComponent,
        }
    });

    const dateTime = new Date(cardDetails.datetime);
    // From ChatGPT
    const day = String(dateTime.getDate()).padStart(2, '0');
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Note: Months are 0-based.
    const year = dateTime.getFullYear();

    const date = `${day}-${month}-${year}`;

    return (
        <TouchableHighlight
            key={cardDetails.key}
            onPress={() => {
                samplesCache.push(cardDetails);
                currentLocation.push(locationDetails);
                navigation.navigate('Play Music');
            }}
        >
            <View style={cardStyle.card}>
                <Text style={cardStyle.songName}>
                    {cardDetails.name}
                </Text>

                <Text style={cardStyle.songName}>
                    {date}
                </Text>
                
                <Rating
                    showRating={false}
                    type="star"
                    fractions={1}
                    readonly
                    startingValue={cardDetails.rating}
                    imageSize={20}
                    style={cardStyle.ratingComponent}
                    tintColor={colors[colorScheme].bgColor}
                />
            </View>
        </TouchableHighlight>
    );
}

/**
 * Renders a page header for this page, the same header is used for PlayMusic
 * so this component is over there too.
 * @param {string} locationName name of the location being being displayed
 * @param {string} colorScheme color shceme used by app
 * @returns {React.JSX.Element} react component
 */
const PageHeader = ({locationName, colorScheme}) => {
    const pinIcon = (colorScheme === 'dark') ? icons.iconPinlightpurple : 
                                               icons.iconPindarkpurple;
    const headerStyle = StyleSheet.create({
        pinIcon: {
            width: 39,
            height: 69,
            justifyContent: 'top',
            alignItems: "center",
            // backgroundColor: 'blue'
        },
        location: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "white"
        },
        locationContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: "center",
        },
        locationHeading: {
            fontSize: 30,
            fontWeight: "bold",
            color: colors[colorScheme].fgColor,
            justifyContent: 'center',
            alignItems: "center",
        },
        seperator: {
            flex: 0.3,
        }
    })

    return (
        <View style={headerStyle.location}>
            <Image source={pinIcon} style={headerStyle.pinIcon}/>
            <View style={headerStyle.seperator}/>
            <Text style={headerStyle.locationHeading}>{locationName}</Text>
        </View>
    );
}

/**
 * Renders a page header for this page, the same header is used for PlayMusic
 * so this component is over there too.
 * @param {string} navigation enables page navigation
 * @param {string} locationId starting location id of sample, not really used
 *                            anywhere but I'll keep it so as to not break
 *                            anything.
 * @returns {React.JSX.Element} react component
 */
const SamplesInLocation = ({ navigation, locationId }) => {
    const [samples, setSamples] = useState([]);
    const [location, setLocation] = useState({});
    const [colorScheme, setColorScheme] = useState('dark');
    useEffect(() => {
        setLocation(currentLocation.pop())
        console.log(`Current Location: ${location}`)
        setSamples(samplesCache.pop());
        setColorScheme(Appearance.getColorScheme());
    }, []);

    const pageStyle = StyleSheet.create({
        location: {
            flex:1,
            flexDirection: "column",
            backgroundColor: colors[colorScheme].bgColor
        },
        list: {
            flex:2,
            margin: 10
        },
        locationContainer: {
            flex: 0.4,
            justifyContent: 'center',
            alignItems: "center",
        },
    })

    return (
        <View 
            style={pageStyle.location}
        >
            <View style={pageStyle.locationContainer}>
            {
                (location) ? 

                    <PageHeader locationName={location.name} 
                                colorScheme={colorScheme}/>
                :
                    <PageHeader locationName={"Some Location"} 
                                colorScheme={colorScheme}/>
            }
            </View>
            <View style={pageStyle.list}>
            {
                ((samples && samples.length > 0 && location) ? 
                    <>
                    <FlatList 
                        data={samples}
                        renderItem={({item}) => <SampleCard 
                                                 key={item.id}
                                                 cardDetails={item}
                                                 locationDetails={location}
                                                 navigation={navigation}
                                                 colorScheme={colorScheme}/>}
                        keyExtractor={item => item.id}
                    />
                    </>
                    : 
                    <>
                    <Text style={styles.list}>
                        No samples yet...
                    </Text>
                    </>
                )
            }
            </View>
        </View>
    );
}



export default SamplesInLocation;
export {PageHeader}; 