import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import {
    View, Text, StyleSheet, Button, Alert, PermissionsAndroid,
  } from "react-native";

const Map = ({targetLocation}) => {



  return (
    <View style = {{flex:1, alignContent:'center',justifyContent:'center'}}>

       
          
          <MapView
            style={Style.map}
            initialRegion={
              targetLocation
            } >
            <Marker coordinate={
              {
                latitude: targetLocation["latitude"],
                longitude:targetLocation["longitude"],
              }
            }>

            </Marker>

          </MapView>


       
    </View>
  )
}

const Style = StyleSheet.create(
    {
      main: {
        // backgroundColor:'white',
        flex: 1,
        paddingTop: 20,
        height: 20,
  
      },
      text: {
        padding: 10,
        fontSize: 20,
        color: 'white',
  
      },
      btn: {
        width: "40%"
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
    }
  )
export default Map