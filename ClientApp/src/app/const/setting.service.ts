import {environment} from "../../environments/environment";
const TokenName='token';
export class SettingAppService{
    constructor(){
        
    }

    public static speedRun=2;// tốc độ báo tàu chạy 2km/h
    public static url=environment.API_URL;
    public static urls=environment.API_URLS;

    public static getHostUrl(){
        if(location.protocol !== 'https:'){
            return this.url;
        }
        else{
            return this.urls;
        }
    }

    public static getToken() {
        let token = localStorage.getItem(TokenName);
        return token;
    }
    

    
}