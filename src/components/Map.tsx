import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {vw} from 'react-native-css-vh-vw'

import { showLocation } from 'react-native-map-link'

import MapImage from '../../assets/map.jpg'

export const Map = () => {
  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.touch} activeOpacity={0.8} onPressOut={() => showLocation({ 
          latitude: 51.55895670305137,
          longitude: 43.154092741543465,
          googlePlaceId: "ChIJMUFo7QUGPkERlcjH5ZsnEgU",
          dialogTitle: "Открыть на карте",
          dialogMessage: "Какой из карты Вы хотели бы воспользоваться?",
          appTitles: {
            'google-maps': "Google Карты",
            'yandex-maps': "Яндекс Карты"
          },
          cancelText: "Отменить"
        })}>
        <Image source={MapImage} style={styles.image}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    position: "relative",
    width: vw(100) - 40,
    backgroundColor: "white",
    height: 200,
    elevation: 12,
    borderRadius: 20,
    paddingBottom: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden"
  }, 
  touch: {
    display: "flex",
    flexDirection: "column"
  },
  image: {
    resizeMode: "cover",
    height: 220,
    width: vw(100) - 40,
    borderRadius: 20,
  }
})
