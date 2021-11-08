import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { vw } from 'react-native-css-vh-vw'
import RightArrow from '../../assets/right-arrow.png'

import { SwiperFlatList } from 'react-native-swiper-flatlist'

type ScoreInfoProps = {
  score: number,
  discountPercent: number
}

export const ScoreInfo = ({ score, discountPercent }: ScoreInfoProps) => {
  return (
    <SwiperFlatList 
      style={styles.view}
      index={0}
      data={[
        <Score score={score} />, 
        <Percent discountPercent={discountPercent} />
      ]}
      renderItem={({ item }) => item}
    />
  )
}

const Score = ({score} : {score: number}) => {
  return (
    <View style={styles.scoreSlide}>
      <View style={styles.scoreStideText}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.text}>баллов доступно</Text>
      </View>
      <Image source={RightArrow} style={styles.rightArrow}/>
    </View>
  )
}

const Percent = ({discountPercent}: {discountPercent: number}) => {
  return (
    <View style={styles.percentSlide}>
      <Text style={styles.text}>Процент накопления: {discountPercent}%</Text>
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
    padding: 20
  }, 
  text: {
    fontSize: 16 + 16 * ((vw(100) - 320) / (1280 - 320)),
  },
  score: {
    fontSize: 24 + 16 * ((vw(100) - 320) / (1280 - 320)),
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D1D1D1",
    borderRadius: 10,
    textAlign: "center",
    padding: 2,
    paddingHorizontal: 15,
    backgroundColor: "#F3F3F3",
    marginRight: 10,
    color: "black",
    overflow: "hidden"
  },
  scoreSlide: {
    width: vw(100) - 80,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-between"
  },
  scoreStideText: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    overflow: 'hidden'
  },
  rightArrow: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  percentSlide: {
    width: vw(100),
    marginLeft: 40,
    justifyContent: "center"
  }
}) 