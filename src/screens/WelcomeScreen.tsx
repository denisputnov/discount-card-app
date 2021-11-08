import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'

import { StackActions } from '@react-navigation/routers';

import { vw, vh } from 'react-native-css-vh-vw'

import DisplayService from '../services/DisplayService';
import ApiService from '../services/ApiService';

import Storage from '../storage/Storage'
import { Background } from '../hoc/Background';


export const WelcomeScreen = ({ navigation }: any) => {
  const [code, setCode] = useState<string>('')
  const [showConfirm, setConfirmShowingStatus] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isPhoneValid, setPhoneValidationStatus] = useState<boolean>(false)
  
  
  useEffect(() => {
    const checkPhone = async () => {
      const phone = await Storage.getUserPhone()
      if (phone) navigation.dispatch(
        StackActions.replace("Card")
      )
    }
    checkPhone()
  }, [])

  const _getPhone = (phone: string) => phone.split(/ |\(|\)|-/g).join('')

  const handleNumberChange = (text: string) => {
    const _phone = _getPhone(text)
    setPhoneValidationStatus(_phone.length > 10 && _phone.length <= 14)
    setPhone(DisplayService.formatPhone(_phone))
  }

  const handleLogIn = async () => {
    setLoading(true)
    await ApiService.login(phone)
      .then(response => response.data)
      .then(data => {
        if (data?.error?.indexOf('not found')) {
          return Alert.alert(
            "Номер не найден",
            "Зарегистрироваться?",
            [
              {text: "Зарегистрироваться", onPress: () => {
                navigation.navigate("Registration", { phone })
              }},
              {text: "Отмена", onPress: () => {}}
            ]
          )
        } 

        setConfirmShowingStatus(true)

        return data
      })
      .catch(error => {
        Alert.alert(`Ошибка. Код: 1. ${error}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleCheck = async () => {
    setLoading(true)
    await ApiService.confirmLogin(phone, code)
      .then(response => response.data)
      .then(data => {
        if (!data.logged) {
          Alert.alert("Неверный код")
        }
        return data.logged
      })
      .then((logged: boolean) => {
        if (logged) {
          Storage.setUserPhone(phone)
          navigation.dispatch(
            StackActions.replace("Card")
          )
        }
      })
      .catch(error => {
        Alert.alert(`Ошибка. Код: 2. ${error}`)
          setLoading(false)
      })
  }

  const handleMistake = () => {
    setConfirmShowingStatus(false)
    setPhone('')
    setCode('')
  }

  return (
    <>
      <View style={styles.content}>
        {showConfirm 
        ? <View style={[styles.main, styles.ai_center]}>
            <Text style={styles.infoMessage}>На ваш номер <Text style={styles.boldText}>{phone}</Text> отправлено сообщение с кодом подтверждения. Введите его для продолжения</Text>
            <SmoothPinCodeInput 
              cellSize={vw(50) / 4}
              cellStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: "#969696",
                backgroundColor: '#ffffff',
              }}
              textStyle={{
                fontSize: 24 + 16 * ((vw(100) - 320) / (1280 - 320)),
                color: "#505050",
              }}
              value={code}
              onTextChange={(code: string )=> setCode(code)}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCheck}
              disabled={!(code.length === 4)}
              style={styles.button}
            >
              <LinearGradient colors={(code.length === 4) ? ["#5875D4", "#3A47B8"] : ["#D3D4D6", "#B5B5B6"]} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Проверить</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.linksContainer}>
              <TouchableOpacity 
                activeOpacity={0.6} 
                onPress={handleMistake}
              >
                <Text style={styles.link}>Ошибся номером</Text>
              </TouchableOpacity>
            </View>
          </View>
        : <View style={styles.main}>
            <View>
              <Text>Ваш номер телефона:</Text>
              <TextInput
                style={styles.phoneInput}
                onChangeText={text => handleNumberChange(text)}
                value={phone}
                placeholder={"8 (987) 654 32-10"}
                keyboardType="number-pad"
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleLogIn}
              disabled={!isPhoneValid}
              style={styles.button}
            >
              <LinearGradient colors={isPhoneValid ? ["#5875D4", "#3A47B8"] : ["#D3D4D6", "#B5B5B6"]} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Войти</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.linksContainer}>
              <TouchableOpacity 
                activeOpacity={0.6} 
                onPress={() => Linking.openURL("https://volna64.ru/privacy")}
              >
                <Text style={styles.link}>Нажимая кнопку «Войти» вы принимаете политику конфиденциальности персональных данных</Text>
              </TouchableOpacity>
            </View>
          </View> 
        }
      </View>
      <Background style={styles.background}/>
    </>
  )
}

const styles = StyleSheet.create({
  phoneInput: {
    borderColor: "#CFCFCF",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    fontSize: 24 + 16 * ((vw(100) - 320) / (1280 - 320)),
  },
  main: {
    backgroundColor: "white",
    minHeight: vh(20),
    maxWidth: vw(90),
    zIndex: 2,
    width: "100%",
    justifyContent: "center",
    elevation: 15,
    borderRadius: 20,
    padding: 20,
  },
  button: {
    marginTop: 15,
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
  },
  linksContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  link: {
    color: "#A3A4BB",
    fontSize: 12,
    textAlign: "center"
  },
  ai_center: {
    alignItems: "center"
  },
  infoMessage: {
    marginBottom: 20,
    textAlign: 'center'
  },
  boldText: {
    fontWeight: "bold"
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  background: {
    position: "absolute"
  }
})