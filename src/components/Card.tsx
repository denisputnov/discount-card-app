import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { vw } from 'react-native-css-vh-vw'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import VolnaLogo from '../../assets/volna-logo.png'

type CardProps = {
  cardNumber: number
}

export const Card = ({cardNumber}: CardProps) =>  {
  return (
    <View>
      <LinearGradient style={styles.card} colors={["#133270", "#479DE0"]}>
        <Image source={VolnaLogo} style={styles.logo}/>
        <View style={styles.barcodeContainer}>
          <View style={styles.barcodeWrapper}>
            <Image style={styles.barcode}  source={{ uri: `https://bwipjs-api.metafloor.com/?bcid=code128&text=6460969${cardNumber}&includetext&scaleX=3` }} resizeMode="contain" />
          </View>
        </View>
      </LinearGradient>
      <LinearGradient style={[styles.cardBackground, {transform: [{rotateZ: "-8deg"}, {rotateX: "8deg"}]}]} colors={["#6F8FC9", "#6FBBF5"]}>

      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: vw(100) - 40,
    height: vw(100) / 16 * 9,
    backgroundColor: "blue",
    marginTop: getStatusBarHeight() + 20,
    borderRadius: 20,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
    margin: 20,
    marginBottom: 40,
    elevation: 20,
    zIndex: 20
  },
  cardBackground: {
    position: "absolute",
    margin: 20,
    marginTop: getStatusBarHeight() + 20,
    width: vw(100) - 40,
    height: vw(100) / 16 * 9,
    borderRadius: 20,
    opacity: 0.5,
    elevation: 15
  },
  barcodeWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  barcode: {
    position: "absolute",
    width: "100%",
    height: "130%",
    top: "-35%",
    left: 0
  },
  barcodeContainer: {
    padding: 10,
    backgroundColor: "white",
    width: "75%",
    height: "70%",
    overflow: 'hidden',
    borderRadius: 10
  },
  logo: {
    position: "absolute",
    width: "30%",
    resizeMode: "contain",
    top: -115
  }
})
