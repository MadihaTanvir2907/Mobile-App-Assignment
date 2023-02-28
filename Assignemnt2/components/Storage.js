import React, { useEffect, useState } from 'react'

import {
    View, Text, StyleSheet, Button, Image
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';



const Storage = () => {



    const [location, setLocation] = useState("");
    const [identifiers, setIdentifiers] = useState([]);
    const [CurrentImg, setImage] = useState("");
    const [currentIndex, setIndex] = useState(0.0);
    const [pictureNotes, setNotes] = useState("");

    useEffect(
        () => {

            AsyncStorage.getAllKeys(
                (err, keys) => {
                    console.log(keys)
                    setIdentifiers(keys);

                    if(keys.length > 0){

                    AsyncStorage.getItem(keys[0], (

                        (err, res) => {
                            setIndex(0);
                            let target = JSON.parse(res);
                            setImage(target["data"]);
                            setNotes(target["userNotes"]);
                            setLocation(target["location"]);
                        }
                    )
                    )
                    }

                }
            );
        }, []
    )



    const forward = () => {

        let ind = currentIndex;

        if(ind === identifiers.length - 1)
        {
            ind = 0;
            setIndex(0);
        }
        else
        {
ind = ind+1;
            setIndex((currentIndex + 1));
        }

        AsyncStorage.getItem(identifiers[ind], (
            (err, res) => {

                let target = JSON.parse(res);
                setImage(target["data"]);
                setNotes(target["userNotes"]);
                setLocation(target["location"]);
            }
        ))
    }




    return (
        <View style={Style.container}>


            {identifiers.length > 0 ?
                <>
                    <Text>
                        User Notes: {pictureNotes}
                    </Text>

                    <Text>
                        longitude: {location["longitude"]}
                    </Text>
                    <Text>
                        latitude: {location["latitude"]}
                    </Text>

                    <Image style={{ width: 300, height: 200 }} source={{ uri: `data:image/jpg;base64,${CurrentImg}` }} />

                    <Button title="Next" onPress={forward}></Button>
                </> : <Text>No pictures to show</Text>



            }


        </View>
    )
}


const Style = StyleSheet.create(
    {
        container: {

            ...StyleSheet.absoluteFillObject,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly"

        },


    }
)
export default Storage


