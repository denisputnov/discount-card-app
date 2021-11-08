import { StackActions } from '@react-navigation/routers'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native'
import { Card } from '../components/Card'
import { ScoreInfo } from '../components/HolderInfo'
import ApiService from '../services/ApiService'
import Storage from '../storage/Storage'
import { IUserDTO } from '../types/response/IUserDTO'
import {vw, vh} from 'react-native-css-vh-vw'
import { Contacts } from '../components/Contacts'
import { Map } from '../components/Map'
import { Controls } from '../components/Controls'

export const CardScreen = ({ navigation }: any) =>  {
  const [data, setData] = useState<IUserDTO>({} as IUserDTO)
  
  useEffect(() => {
    const fetchData = async () => {
      const phone = await Storage.getUserPhone()
      if (phone) {
        const response = await ApiService.getInfoByPhone(phone)
        if (response.status === 200) {
          return setData(response.data)
        }
      }
      await navigation.dispatch(
        StackActions.replace("Welcome")
      ) 
    }
    fetchData()
  }, [])

  return (
    <View style={styles.view}>
      <ScrollView style={styles.scroll}>
        <Card cardNumber={data.card_number} />
        <ScoreInfo score={data.score} discountPercent={data.discount_percent}/>
        <Contacts />
        <Map />
        <Controls navigation={navigation} />
      </ScrollView>
      <LinearGradient style={styles.background} colors={['#DAEDFF', "white"]}/>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scroll: {
    position: "relative",
    zIndex: 10,
    flexGrow: 1,
  },
  background: {
    position: "absolute",
    width: vw(110),
    height: vh(110),
  }
})