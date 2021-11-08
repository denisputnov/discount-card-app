import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Storage from '../storage/Storage'
import { StackActions } from '@react-navigation/routers'
import {vw} from 'react-native-css-vh-vw'

export const Controls = ({ navigation }: any) => {
  const _logOut = () => {
    Storage
      .delUserPhone()
      .then(navigation.dispatch(
        StackActions.replace('Welcome')
      ))
  }

  const showConfirmDialog = () => {
    return Alert.alert(
      "Вы уверены, что хотите выйти?",
      "",
      [
        {
          text: "Выйти",
          onPress: () => {
            _logOut()
          },
        },
        {
          text: "Отменить",
        },
      ]
    );
  }


  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={showConfirmDialog}>
        <Text style={styles.text}>Выйти</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    opacity: 0.35,
    fontSize: 14 + 12 * ((vw(100) - 320) / (1280 - 320)),
  },
})