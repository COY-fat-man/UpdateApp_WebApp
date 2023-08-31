import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NhietDo_Model } from "../../models/toa-xe/nhiet-do.model";
import { SettingAppService } from "src/app/const/setting.service";
import { lastValueFrom } from "rxjs";
import { ToaTauDevice_Model } from "../../models/toa-xe/toa-tau-device.model";
import { number } from "echarts";

@Injectable({
    providedIn:"root"
})
export class TemperatureApiService{
    constructor(
        private http:HttpClient
    ){

    }

    public async getDevice(){
        return await lastValueFrom(this.http.get<ToaTauDevice_Model>(
            SettingAppService.getHostUrl()+"/api/temperature/device",
            {
                responseType:'json'
            }
        ));
    }

    public async getStatus(deviceId:number){
        let params=new HttpParams();
        params=params.append("deviceId",deviceId);
        return await lastValueFrom( this.http.get<NhietDo_Model>(
            SettingAppService.getHostUrl()+"/api/temperature/status",
            {
                params:params,
                responseType:'json'
            })); 
    }

    public async getHistory(deviceId:number,startTime:string,endTime:string,limit:number){
        let params=new HttpParams();
        params=params.append("deviceId",deviceId);
        params=params.append("startTime",startTime);
        params=params.append("endTime",endTime);
        params=params.append("limit",limit);
        return await lastValueFrom( this.http.get<NhietDo_Model[]>(
            SettingAppService.getHostUrl()+"/api/temperature/history",
            {
                params:params,
                headers:{
                    'Content-Type': 'application/json'
                },
                responseType:'json'
            })); 
    }   
    public async getConfig(configTime1:number,configTime2:number){
        let params=new HttpParams();
        params=params.append("configTime1",configTime1);
        params=params.append("configTime2",configTime2);
        return await lastValueFrom( this.http.get<NhietDo_Model[]>(
            SettingAppService.getHostUrl()+"/api/temperature/config",
            {
                params:params,
                headers:{
                    'Content-Type': 'application/json'
                },
                responseType:'json'
            })); 
    }
}