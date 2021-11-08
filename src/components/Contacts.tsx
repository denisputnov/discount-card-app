import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert } from 'react-native'
import {vw} from 'react-native-css-vh-vw' 

import {Linking} from 'react-native'

import Phone from '../../assets/phone.png'
import Vk from '../../assets/vk.png'
import Instagram from '../../assets/instagram.png'
import Internet from '../../assets/internet.png'

export const Contacts = () => {

  const handleCallClick = () => {
    const phone = `${Platform.OS !== 'android' ? "telprompt:" : "tel:"}+78454560989`
    Linking.canOpenURL(phone)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phone)
            .catch(() => Alert.alert("8-845-456-09-89"));
        }
      })
      .catch(error => {
        Alert.alert("8-845-456-09-89")
      })
  }

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Связаться с нами: </Text>
      <TouchableOpacity onPress={handleCallClick}>
        <Image source={Phone} style={styles.image}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL("https://vk.com/volnabalashov")}>
        <Image source={Vk} style={styles.image}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/magazinvolna/")}>
        <Image source={Instagram} style={styles.image}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL("https://www.volna64.ru/")}>
        <Image source={Internet} style={[styles.image, styles.internet]}/>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  view: {
    position: "relative",
    width: vw(100) - 40,
    backgroundColor: "white",
    minHeight: 80,
    maxHeight: 120,
    elevation: 12,
    borderRadius: 20,
    paddingBottom: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }, 
  image: {
    width: vw(10),
    height: vw(10),
    resizeMode: "contain",
    opacity: 0.8
  },
  text: {
    fontSize: 16 + 16 * ((vw(100) - 320) / (1280 - 320)),
  },
  internet: {
    width: vw(8.5),
    height: vw(8.5),
    marginLeft: vw(1)
  }
})