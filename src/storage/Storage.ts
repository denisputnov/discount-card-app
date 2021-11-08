import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayService from '../services/DisplayService';

class Storage {
  async getUserPhone(): Promise<string | undefined> {
    try {
      const phone = await AsyncStorage.getItem("phone")
      return phone === null ? undefined : phone
    } catch(error) {
      console.error(error)
    }
  }

  async setUserPhone(phone: string): Promise<void> {
    try {
      await AsyncStorage.setItem('phone', DisplayService.getRawPhone(phone))
    } catch (error) {
      console.error(error)
    }
  }

  async delUserPhone(): Promise<void> {
    try {
      await AsyncStorage.removeItem('phone')
    } catch (error) {
      console.error(error)
    }
  }
}

export default new Storage()