import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Alert} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { vw, vh } from 'react-native-css-vh-vw'

import RightArrow from '../../assets/right-arrow.png'
import { LinearGradient } from 'expo-linear-gradient'
import ApiService from '../services/ApiService'
import { StackActions } from '@react-navigation/routers'
import Storage from '../storage/Storage'

export const Registration = ({ navigation, route }: any) => {
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [middlename, setMiddlename] = useState<string>('')
  const [code, setCode] = useState<string>('')

  const [isFormValid, setFormValidationStatus] = useState<boolean>(false)

  const validateName = (name: string) : boolean => name.replace(/\d+/g, '').length >= 2 
  const validateMiddlename = (middlename: string) : boolean => middlename.replace(/\d+/g, '').length >= 0
  const validateCode = (code: string) : boolean => code.length === 4

  const handleNameChange = (string: string) => {
    setName(string)
    setFormValidationStatus(validateName(string) && validateName(surname) && validateMiddlename(middlename) && validateCode(code))
  }

  const handleSurnameChange = (string: string) => {
    setSurname(string)
    setFormValidationStatus(validateName(name) && validateName(string) && validateMiddlename(middlename) && validateCode(code))
  }

  const handleMiddlenameChange = (string: string) => {
    setMiddlename(string)
    setFormValidationStatus(validateName(name) && validateName(surname) && validateMiddlename(string) && validateCode(code))
  }

  const handleCodeChange = (string: string) => {
    setCode(string)
    setFormValidationStatus(validateName(name) && validateName(surname) && validateMiddlename(middlename) && validateCode(string))
  }

  const _getPhone = (phone: string) => phone.split(/ |\(|\)|-/g).join('')

  const handleRegistration = async () => {
    await ApiService.registration(name, surname, middlename, _getPhone(route.params.phone), code)
      .then(response => response.data)
      .then(data => {
        console.log(data);
        
        if (data?.error === "Wrong code") {
          return Alert.alert("Неверный код подтверждения")
        }

        if (data === 'ok') {
          Storage.setUserPhone(route.params.phone)
          return navigation.dispatch(
            StackActions.replace('Card')
          )
        }

        Alert.alert("Ошибка регистрации. Код ошибки: 4")
      })
  }

  useEffect(() => {
    const generate = async () => {
      const res = await ApiService.generateRegistrationCode(route.params.phone)
      if (res.data?.error) {
        Alert.alert("Ошибка регистрации. Код ошибки: 3")
        navigation.goBack()
      }
    }
    generate()
  }, [])

  return (
    <>
      <ScrollView style={styles.main}>
        <View style={styles.topBar}>
          <TouchableOpacity 
            activeOpacity={0.6}
            onPress={() => navigation.goBack()}
          >
            <Image source={RightArrow} style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.title}>Регистрация</Text>
        </View>
        <RegistrationTextField value={surname} setValue={handleSurnameChange} placeholder="Иванов" caption="Фамилия" />
        <RegistrationTextField value={name} setValue={handleNameChange} placeholder="Иван" caption="Имя" />
        <RegistrationTextField value={middlename} setValue={handleMiddlenameChange} placeholder="Иванович" caption="Отчество" required={false} />
        <RegistrationTextField value={route.params.phone} setValue={() => {}} placeholder="+7 (987) 654 32-10" caption="Телефон" editable={false} selectTextOnFocus={false} />
        <RegistrationTextField value={code} setValue={handleCodeChange} placeholder="1234" caption="Код из СМС" selectTextOnFocus={false} maxLength={4} keyboardType={"number-pad"}/>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleRegistration}
          disabled={!isFormValid}
          style={styles.button}
        >
          <LinearGradient colors={isFormValid ? ["#5875D4", "#3A47B8"] : ["#D3D4D6", "#B5B5B6"]} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    <LinearGradient style={styles.background} colors={['#DAEDFF', "white"]}/>
    </>
  )
}


const RegistrationTextField = ({value, setValue, placeholder, caption, required = true, editable = true, selectTextOnFocus = true, maxLength = 50, keyboardType = "default"}: any) => {
  return (
    <>
      <Text 
        style={styles.textFieldCaption}
      >
        {caption}&nbsp;
        { required ? <Text style={styles.textFieldCaptionRequired}>*</Text> : <Text></Text> }
      </Text>

      <TextInput placeholder={placeholder} value={value} style={styles.textField} onChangeText={text => setValue(text)} editable={editable} selectTextOnFocus={selectTextOnFocus} maxLength={maxLength} keyboardType={keyboardType}/>
    </>
  )
}


const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  backButton: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    transform: [{rotate: "180deg"}]
  },
  title: {
    fontSize: 24 + 16 * ((vw(100) - 320) / (1280 - 320)),
    marginLeft: 20
  },
  main: {
    flex: 1,
    paddingTop: getStatusBarHeight() + 20,
    paddingHorizontal: 20
  },
  background: {
    position: "absolute",
    width: vw(110),
    height: vh(110),
    zIndex: -1
  },
  textField: {
    width: "100%",
    height: 40,
    fontSize: 16,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#969696",
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white"
  },
  textFieldCaption: {
    marginBottom: 4,
    fontSize: 16,
    color: "#5A5A5A"
  },
  textFieldCaptionRequired: {
    color: "red"
  },
  button: {
    elevation: 10,
    position: "relative",
    maxHeight: 40,
    borderRadius: 10,
    width: "100%"
  },
  buttonGradient: {
    borderRadius: 10,
    padding: 10,
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  buttonText: {
    color: "white"
  }
})

