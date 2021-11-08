import $api from "../http/index";
import { AxiosResponse } from 'axios';
import DisplayService from "./DisplayService";
import { IErrorResponse } from "../types/response/IErrorResponse";
import { IUserData } from "../types/response/IUserData";
import { IUserDTO } from "../types/response/IUserDTO"
import { IConfirmLoginFalse } from "../types/response/IConfirmLoginFalse";

export default class ApiService {
  static async getInfoByPhone(phone: string): Promise<AxiosResponse<IUserDTO>> {
    console.log(phone)    
    return await $api.get<IUserDTO>(`/app/data?phone=${DisplayService.getRawPhone(phone)}`) 
  }
  static async login(phone: string): Promise<AxiosResponse<IErrorResponse>> {
    console.log("apiService", phone);
    console.log("raw", DisplayService.getRawPhone(phone));
    return await $api.post<IErrorResponse>(`/app/login?phone=${DisplayService.getRawPhone(phone)}`)
  }
  static async confirmLogin(phone: string, code: string): Promise<AxiosResponse<IUserData | IConfirmLoginFalse>> {
    return await $api.post<IUserData | IConfirmLoginFalse>(`/app/confirmlogin?phone=${DisplayService.getRawPhone(phone)}&code=${code}`)
  }
  static async registration(name: string, surname: string, middlename: string, phone: string, code: string): Promise<AxiosResponse<IErrorResponse>> {
    console.log(DisplayService.getRawPhone(phone));
    console.log(phone);
    
    return await $api.post<IErrorResponse>(`/app/registration`, { name, surname, middlename, phone: DisplayService.getRawPhone(phone), code: code.toString() })
  }
  static async generateRegistrationCode(phone: string): Promise<AxiosResponse<IErrorResponse>> {
    return await $api.post<IErrorResponse>(`/app/generatecode?phone=${DisplayService.getRawPhone(phone)}`)
  }
}
