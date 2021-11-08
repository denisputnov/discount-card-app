import React, {createRef, MutableRefObject, useRef, useState} from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { vw } from "react-native-css-vh-vw"
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'

export const PINInput = ({setPin}: any) => {
  const [code, setCode] = useState<string>('')
  // const firstInput = useRef<TextInput>() as MutableRefObject<TextInput>
  // console.log(firstInput)
  return (
    <SmoothPinCodeInput 
            cellSize={vw(50) / 4}
            cellStyle={{
              borderWidth: 2,
              borderRadius: 10,
              borderColor: "#969696",
              backgroundColor: 'white',
            }}
            textStyle={{
              fontSize: 24 + 16 * ((vw(100) - 320) / (1280 - 320)),
              color: "#505050",
            }}
            value={code}
            onTextChange={(code: string )=> setCode(code)}
          />
  )
}

const styles = StyleSheet.create({
  check: {
    width: vw(50),
    height: vw(50) / 4
  },
  input: {
    backgroundColor: "white",
    textAlign: "center",
    width: "22%",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#CCCCCC",
    fontSize: 24 + 16 * ((vw(100) - 320) / (1280 - 320))
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  }
})