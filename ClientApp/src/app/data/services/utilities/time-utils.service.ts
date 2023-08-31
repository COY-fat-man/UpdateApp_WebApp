import { Injectable } from "@angular/core";
import * as moment from 'moment';

@Injectable({
    providedIn:"root"
})
export class TimeUtilsService{
    constructor(){

    }

    formatTime(value:string){
        return moment(value).format("DD-MM-YYYY HH:mm:ss");
    }

    calculatorLastTimeConnect(secTotal:number|null){
        if(secTotal!=null){
            let day=parseInt((secTotal/86400).toString());
            secTotal-=day*86400;
            let hour=parseInt((secTotal/3600).toString());
            secTotal-=hour*360;;
            let minute=parseInt((secTotal/60).toString());
            secTotal-=minute*60;
            let sec=secTotal;
            if(day>0)
                return "+"+day+" Ngày";
            else if(hour>0)
                return "+"+hour+" Giờ";
            else if(minute>1)
                return "+"+minute+" Phút";
            else
                return minute+":"+sec;
        }
        else{
            return "---";
        }
    }

    convertTotalSecToTime(total_second:number){
        let day=parseInt((total_second/86400).toString());
        total_second-=day*86400;
        let hour=parseInt((total_second/3600).toString());
        total_second-=hour*3600;
        let minute=parseInt((total_second/60).toString());
        total_second-=minute*60;
        let second=parseInt(total_second.toString());
        return day+" Ngày " +hour+":"+minute+":"+second;
    }

    calculatorDeltaTime2(time_start:moment.Moment ,time_end:moment.Moment){
        let ms=time_end.utc().diff(time_start.utc());
        let total_second=ms/1000;
        let day=parseInt((total_second/86400).toString());
        total_second-=day*86400;
        let hour=parseInt((total_second/3600).toString());
        total_second-=hour*3600;
        let minute=parseInt((total_second/60).toString());
        total_second-=minute*60;
        let second=parseInt(total_second.toString());
        return day+" Ngày " +hour+":"+minute+":"+second;
    }

    deltaTime(timeBefore:moment.Moment,timeAfter:moment.Moment){
        let ms=timeAfter.utc().diff(timeBefore.utc());
        return ms/1000;
    }


}