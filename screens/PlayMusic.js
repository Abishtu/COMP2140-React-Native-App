import React, { useEffect, useState, useRef } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "../data/theme";
import { currentLocation, currentProfile, samplesCache } from "../data/cache/cache";
import WebView from "react-native-webview";
import { PageHeader } from "./SamplesInLocation";
import { Appearance } from "react-native";
import { Rating } from "react-native-ratings";
import { TouchableHighlight } from "react-native-gesture-handler";
import icons from "../data/icons";

/**
 * Component to show profiles currently looking at the app
 * @param {string} image image file used to display profile
 * @param {string} name name of the profile
 * @param {string} colorScheme the color shceme of the app  
 * @returns {React.JSX.Element} react component
 */
const Profiles = ({ image, name, colorScheme }) => {
    const defaultIcon = (colorScheme === "dark") ? icons.iconSmileylightpurple :
                                                   icons.iconSmileydarkpurple;
    return(
        <View>
            <Text>
                Currently At Locaiton:
            </Text>
            <View>
                <Image source={{uri: image}}/>
                <Text>{name}</Text>
            </View>
            <View>
                <Image source={defaultIcon}/>
                <Text>{name}</Text>
            </View>
        </View>
    );
}


/**
 * Component to show details of the selected sample, it can show the location
 * of the sample, the samples name, a button to play the tune and 
 * star ratings of the sample
 * @param {Object} navigation to enable page navigation 
 * @returns {React.JSX.Element} react component
 */
const PlayMusic = ({ navigation }) => {
    const [ location, setLocation ] = useState({})
    const [ sample, setSample ] = useState({})
    const [ colorScheme, setColorScheme ] = useState('dark');
    const [ playState, setPlayState ] = useState('Play Music');
    
    // From week 12 contact demo code
    const [ webViewState, setWebViewState ] = useState({
        loaded: false,
        actioned: false,
    });
    const webViewRef = useRef();

    function webViewLoaded() {
        setWebViewState({
            ...webViewState,
            loaded: true
        });
    }
    
    function handleReloadPress() {
       webViewRef.current.reload();
    }
    
    function handleActionPress() {
        if(!webViewState.actioned) {
            const command = `preparePreview(${sample.recording_data}, '${sample.type}'); playPreview()`
            webViewRef.current.injectJavaScript(command);      
        }
        else {
            webViewRef.current.injectJavaScript("stopSong()");   
        }
        setWebViewState({
            ...webViewState,
            actioned: !webViewState.actioned
        });
    }

    useEffect(() => {
        setSample(samplesCache.pop());
        setLocation(currentLocation.pop());
        setColorScheme(Appearance.getColorScheme());
    }, [])

    const playMusic = () => {
        console.log("Playing music!")
        handleActionPress()
    }

    const pageStyle = StyleSheet.create({
        playMusicContainer: {
            flex:1,
            flexDirection: "column",
            backgroundColor: colors[colorScheme].bgColor
        },

        headerContainer: {
            flex: 0.2,
            justifyContent: 'center',
            alignItems: "center",
        },

        songName: {
            ...styles(colorScheme).songName,
            flex: 0.07, 
            // backgroundColor: "black"
        },
        
        playButton: {
            ...styles(colorScheme).playButton,
            margin: 15
        },

        playButtonText: {
            color: colors[colorScheme].bgColor,
            fontWeight: "bold",
            // padding: 10,
            textAlign: "center",
        },

        webViewStyle: {
            height: 0,
            width: 0,
            backgroundColor: "black"
        },

        webViewContainer: {
            flex: 0
        },

        ratingComponent: {
            ...styles(colorScheme).ratingComponent,
        }
    })

    return (
        <SafeAreaView style={pageStyle.playMusicContainer}>
            <View style={pageStyle.headerContainer}>
            {
                (location) ? 

                    <PageHeader locationName={location.name} 
                                colorScheme={colorScheme}/>
                :
                    <PageHeader locationName={"Some Location"} 
                                colorScheme={colorScheme}/>
            }
            </View>
            {
                (sample && sample.recording_data &&
                 sample.recording_data.length > 0) ?
                <>
                    <Text style={pageStyle.songName}>
                        {sample.name}
                    </Text>
                    <View style={pageStyle.webViewContainer}>
                    <WebView
                        ref={ref => webViewRef.current = ref}
                        // originWhitelist={["*"]}
                        source={{
                            uri: "https://comp2140.uqcloud.net/static/samples/index.html"
                        }}
                        pullToRefreshEnabled={true}
                        onLoad={webViewLoaded}
                        style={pageStyle.webViewStyle}
                    />
                    </View>

                    <TouchableHighlight onPress={() => {
                        setPlayState(webViewState.actioned ? "Play Music" : 
                                                              "Stop Playing")
                        playMusic()
                    }}>
                        <View style={pageStyle.playButton}>
                            <Text style={pageStyle.playButtonText}>
                                {playState}
                            </Text>
                        </View>
                    </TouchableHighlight>
                    
                    <Rating
                        showRating={false}
                        type="star"
                        fractions={1}
                        readonly
                        startingValue={sample.rating}
                        imageSize={30}
                        style={pageStyle.ratingComponent}
                        tintColor={colors[colorScheme].bgColor}
                    />
                </> :
                <>
                    <Text style={pageStyle.songName}>
                        Some Song
                    </Text>
                    <View style={pageStyle.webViewContainer}>
                        <WebView
                            ref={ref => webViewRef.current = ref}
                            // originWhitelist={["*"]}
                            source={{
                                uri: "https://comp2140.uqcloud.net/static/samples/index.html"
                            }}
                            pullToRefreshEnabled={true}
                            onLoad={webViewLoaded}
                            style={pageStyle.webViewStyle}
                        />
                    </View>
                    <TouchableHighlight onPress={() => {
                        setPlayState(!webViewState.actioned ? "Play Music" : 
                                                              "Stop Playing")
                    }}>
                        <View style={pageStyle.playButton}>
                            <Text style={pageStyle.playButtonText}>
                                {playState}
                            </Text>
                        </View>
                    </TouchableHighlight>
                    
                    <Rating
                        showRating={false}
                        type="star"
                        fractions={1}
                        readonly
                        startingValue={3.3}
                        imageSize={30}
                        tintColor={colors[colorScheme].bgColor}
                    />

                </>
            }

        </SafeAreaView>
    );
}

export default PlayMusic;