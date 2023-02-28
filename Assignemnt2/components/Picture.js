import React, { useState } from 'react'
import { launchCamera } from 'react-native-image-picker';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    TouchableOpacity,
    Image,
    TextInput

} from "react-native";



const Picture = ({ location }) => {



    const [base64String, setString] = useState("");
    const [customerNotes, setNotes] = useState("")
    const [uri, setUri] = useState("");


    const saveToLocalStorage = async () => {

        const imageJson =
        {
            "data": base64String,
            "type": "jpg",
            location,
            "userNotes": customerNotes
        }


        const storeData = async (value, key) => {
            try {
                const jsonValue = JSON.stringify(value)
                await AsyncStorage.setItem(key, jsonValue)
            } catch (e) {
                console.log("ERROR :: ", e)
            }
        }

        AsyncStorage.getAllKeys(
            (err, keys) => {
                
                if (keys.length !== 0) {
                    let last = parseInt(keys[keys.length - 1]);
                    let currentKey = (last + 1).toString();

                    storeData(imageJson, currentKey);
                }
                else {

                    storeData(imageJson, '0');

                }

 
          


            }


        )




    }

    const openCamera = () => {


        let option = {};
        option = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            includeBase64: true,
        };

        launchCamera(option, (response) => {

            if (response.error) {
                console.log("ERROR ::  ", response.error)
            }
            else if (response.didCancel) {
                console.log("Transaction canceled by the user")
            }
            else {

                setString(response.assets[0].base64)
                setUri(response.assets[0].uri)
            }
        }
        )
    }

    const uploadToInstagram = async () => {


        await Share.shareSingle({
            social: Share.Social.INSTAGRAM,
            url: uri,
            type: 'image/*'
        });

    }




    return (
        <View
         style={Style.container}
         >
            {base64String === "" ?

                <Button title='Capture Image' onPress={openCamera}>
                    
                </Button>
                : null}
            {base64String !== "" ?

                <>
                    <Button title = 'Upload To Instagram' onPress={uploadToInstagram}>
                        
                    </Button>
                        <TextInput
                        style = {
                            {"backgroundColor":"#FFFDD0","width":200,}
                        }
                            onChangeText={newText => setNotes(newText)}
                            defaultValue={customerNotes}

                            placeholder = "Notes"
                        />
                        <Button title = 'Save To DataBase' onPress={saveToLocalStorage}>
                        </Button>

                    </>

                : null}
        </View >
    )
}
const Style = StyleSheet.create(
    {
        container: {
  
            ...StyleSheet.absoluteFillObject,
            display:"flex",
            alignItems:"center",
            justifyContent:"space-around"

        }
        }
)



export default Picture