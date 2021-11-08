import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, StyleSheet } from 'react-native'

export const Background = ({children, style}: any) =>  {
  return (
    <LinearGradient colors={["#4988BB", "#2D3899"]} style={[styles.gradient, style]}>
      {children}
      <Image source={require('../../assets/background.jpeg')} resizeMode="cover" style={styles.image} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    position: "absolute",
    opacity: 0.04
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
}) 
