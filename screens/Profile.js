import React, { useEffect, useState } from "react";
import { Appearance, Button, Image, ImageBackground, StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "../data/theme";
import { TextInput } from "react-native";
// import * as ImagePicker from 'expo-image-picker';
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { Dimensions } from "react-native";
import { currentProfile } from "../data/cache/cache";

/**
 * Component to show details of the user profile, it can show/edit the profile 
 * photo, and show/edit profile name, changes will be deleted when application
 * is fully exited (i.e. swipped up from multitasking view)
 * 
 * @param {Object} navigation to enable page navigation 
 * @returns {React.JSX.Element} react component
 */
const Profile = ({ navigation }) => {

    const [ name, setName ] = useState("Enter Your Name")
    const [ image, setImage ] = useState("")
    const [colorScheme, setColorScheme] = useState('dark')
    const [height, setHeight] = useState(Dimensions.get("window").height);
    const [profile, setProfile] = useState({
        image: "",
        name: "Enter Your Name"
    });

    useEffect(() => {
        setColorScheme(Appearance.getColorScheme());
        setHeight(Dimensions.get("window").height);
        currentProfile.push(profile);
    }, []);

    useEffect(() => {
        setHeight(Dimensions.get("window").height);
    });

    const openImageGalery = async () => {
        const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [8, 13],
            quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setProfile({
                image: image,
                profile: name
            });
            currentProfile.pop();
            currentProfile.push({
                image: image,
                name: name
            });
        }
    }

    const pageStyle = (height) => {
        return StyleSheet.create({
            profilePageContainer: styles(colorScheme).nearbyAndPlayContainer,
            pageHeader: styles(colorScheme).heading,
            subHeading: styles(colorScheme).subHeading,
            emptyImage: {
                // ...styles(colorScheme, height).photoEmptyView,
                borderWidth: 2,
                borderRadius: 10,
                borderColor: colors[colorScheme].fgColorLighter,
                borderStyle: "dashed",
                height: height / 1.625,
                margin: 10,

            },
            fullImage: {
                flex:1,
                margin: 10,
                backgroundColor: "black",
                borderRadius: 10,
                overflow: "hidden"
            },
            nameInput: {
                ...styles(colorScheme).input,
                margin: 15
            },
            addPhotoContainer: {
                backgroundColor: colors[colorScheme].fgColor,
                borderRadius: 10,
                padding: 10,
                width: "50%",
                marginLeft: "25%",
                marginTop: (height / 3.25)
            },

            addPhotoText: {  
                fontWeight: "bold",
                textAlign: "center",
                color: colors[colorScheme].bgColor
            },

            changePhotoContainer: {
                backgroundColor: colors[colorScheme].fgColor,
                padding: 10,
                borderRadius: 10,
                width: "50%",
                marginLeft: "25%",
                marginTop: (height / 1.8)
            },

            changePhotoText: {
                fontWeight: "bold",
                color: colors[colorScheme].bgColor,
                textAlign: "center"
            }
        })
    }

    return (
        <SafeAreaView 
            style={pageStyle(height).profilePageContainer}
        >
            <Text style={pageStyle(height).pageHeader}>
                Edit
            </Text>
            <Text style={pageStyle(height).subHeading}>
                Mirror, Mirror On The Wall...
            </Text>

            <ImageBackground source={{uri: image}} resizeMode="cover" 
                             style={image === "" ? pageStyle(height).emptyImage :
                                                   pageStyle(height).fullImage}>
                <TouchableHighlight onPress={() => {
                    openImageGalery();
                }}
                >
                    <View style={image === "" ? pageStyle(height).addPhotoContainer :
                                                pageStyle(height).changePhotoContainer}>
                        <Text style={image === "" ? pageStyle(height).addPhotoText :
                                                    pageStyle(height).changePhotoText}>
                            {image === "" ? "Add Photo" : "Change Photo"}
                        </Text>
                    </View>
                </TouchableHighlight>
            </ImageBackground>
            
            <TextInput
                onChangeText={(text) => {
                    setName(text)
                    setProfile({
                        image: image,
                        name: name
                    });
                    currentProfile.pop();
                    currentProfile.push(profile);
                }}
                value={name}
                style={pageStyle(height).nameInput}
            />
        </SafeAreaView>
    );
}

const imageStyle = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default Profile;