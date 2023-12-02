import React, { Fragment, useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { colors, mapTheme } from "../data/theme";
import MapView, { Marker, Icon, Callout, Circle } from 'react-native-maps';
import { getLocations } from "../api/Location";
import { allLocations, currentLocation, locationID, samplesCache } from "../data/cache/cache";
import { getSample, getSampleInLocation, getSampleRating } from "../api/Sample";
import Geolocation from "@react-native-community/geolocation";
import { Appearance } from "react-native";

/**
 * Simple map components that displays the map, changing the styling depending
 * on device theme, light/dark and shows samples in map
 * @param {Object} navigation the navigator used to navigate between screens
 * @returns {React.JSX.Element} react component
 */
const MapPage = ({ navigation }) => {
    const [ locations, setLocations ] = useState([]);
    const [ usersLocation, setUsersLocation ] = useState([]);
    const [ colorScheme, setColorScheme ] = useState('dark');
    useEffect(() => {
        getLocations().then((result) => {
            setLocations(result);
            allLocations.push(result);
        })
    }, [])

    useEffect(() => {
        setColorScheme(Appearance.getColorScheme());
    }, [])

    const showSamples = async (location_id) => {
        locationID.push(location_id.id)
        currentLocation.push(location_id);
        console.log(currentLocation)
        const response = await getSampleInLocation(location_id.id);
        const samples = await Promise.all(response.map(async(res) => {
            return await getSample(res.sample_id);
        }));
        const samples_with_ratings = await Promise.all(samples.map(async (sample) => {
            const rating = await getSampleRating(sample.id); 
            return {...sample, rating: rating};
        }))
        samplesCache.push(samples_with_ratings);
        navigation.navigate('Samples In A Location', {
            locationId: location_id
        })
    }

    useEffect(() => {
        Geolocation.getCurrentPosition((userLocation) => {
            setUsersLocation({
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude
            })
            console.log(usersLocation);
        })
    }, [])

    // API calls go here
    return (
        <View 
            style={{
                flex: 1,
                backgroundColor: colors.dark.bgColor
            }}
        >
            {/* Body of map function */}
            {
                ((usersLocation && 
                  usersLocation.latitude && 
                  usersLocation.longitude) ?
                    <MapView 
                        style={styles.map} 
                        showsUserLocation={true}
                        initialRegion={{
                            latitude: usersLocation.latitude,
                            longitude: usersLocation.longitude,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.05,
                            }}
                        customMapStyle={mapTheme[colorScheme]}
                        >
                        {
                            (( locations && locations.length > 0) ? 
                                locations.map((location, index) => {
                                return (
                                    <Fragment key={location.id}>
                                    <Marker
                                        key={index}
                                        coordinate={{
                                            latitude: parseFloat(location.latitude),
                                            longitude: parseFloat(location.longitude)
                                        }}
                                        title={location.name}
                                        description="Some location"
                                        onPress={() => showSamples(location)}
                                    >
                                        {/* To have an empty marker */}
                                        <Image source={{}} style={{ width: 0, height: 0 }} />
                                    </Marker>
                                    <Circle
                                            key={index}
                                            center={{
                                                latitude: parseFloat(location.latitude),
                                                longitude: parseFloat(location.longitude)
                                            }}
                                            radius={100}
                                            strokeColor={colors.purpleColorLighter}
                                            strokeWidth={3}
                                            fillColor={colors.purpleColorLighter + "25"}
                                            onPress={() => showSamples(location)}
                                        />
                                    </Fragment>
                                );
                            }) : 
                                <>
                                </>
                            )
                        }
                    </MapView>
                    :
                    <>
                    </>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
});

export default MapPage;