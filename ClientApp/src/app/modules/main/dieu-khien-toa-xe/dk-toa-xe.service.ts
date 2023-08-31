import { Injectable } from "@angular/core";
import { setIntervalAsync } from 'set-interval-async/dynamic';
import { clearIntervalAsync } from 'set-interval-async';
import { TemperatureApiService } from "src/app/data/services/toa-xe/temperature-api.service";
import * as moment from "moment";
import { BehaviorSubject } from "rxjs";
import { NhietDo_Model } from "src/app/data/models/toa-xe/nhiet-do.model";
import { Task } from "src/app/data/services/utilities/task.service";

@Injectable()
export class DieuKhienToaXeService {
    public historyLog$=new BehaviorSubject<NhietDo_Model[]|null>(null);
    public status$=new BehaviorSubject<NhietDo_Model|null>(null);

    idTaskMonitor:any=null;
    idTaskData:any=null;
    step=0;
    deviceId=1000;
    lastStatus:NhietDo_Model|null=null;
    constructor(
        private temperatureApi:TemperatureApiService
    ){

    }

    public async run(){
        this.idTaskMonitor= setIntervalAsync(async()=>{
            //await this.monitorRun();
        },1000);
    }

    public stop() {
        clearIntervalAsync(this.idTaskMonitor);
        clearIntervalAsync(this.idTaskData);
    }

    async monitorRun(){
        try {
            switch(this.step){
                case 0:
                    {
                        let res=await this.temperatureApi.getDevice();
                        if(res!=null){
                            this.deviceId=res.deviceId;
                            this.step++;
                        }
                    }
                    break;
                case 1:
                    {
                        // tải dữ liệu lịch sử
                        let start=moment().add(-3600,"s").format("YYYY-MM-DDTHH:mm:ss");
                        let end=moment().format("yyyy-MM-DDTHH:mm:ss");
                        let log=await this.temperatureApi.getHistory(this.deviceId,start,end,1000);
                        this.historyLog$.next(log);
                        this.step++;
                    }
                    break;
                case 2:
                    {
                        let status=await this.temperatureApi.getStatus(this.deviceId);
                        if(this.lastStatus==null){
                            this.lastStatus=status;
                            this.status$.next(status);
                        }
                        else{
                            let current=moment(status.createdAt);
                            let last=moment(this.lastStatus.createdAt);
                            if(last.isBefore(current)){
                                this.status$.next(status);
                            }
                        }
                        await Task.DelayAsync(1000);
                    }
                    break;
            }    
        } catch (error) {
            
        }
        
    }
}