import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NhietDo_Model } from 'src/app/data/models/toa-xe/nhiet-do.model';
import { TemperatureApiService } from 'src/app/data/services/toa-xe/temperature-api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  visible=false;
  data:NhietDo_Model[]=[];
  isWait=false;
  constructor(
    private tempApi:TemperatureApiService,
    private notification:NzNotificationService
  ) {

  }

  ngOnInit() {

  }

  public async show(deviceId:number, startTime:string,endTime:string,limit:number){
    this.visible=true;
    try {

      this.isWait=true;
      this.data=await this.tempApi.getHistory(deviceId,startTime,endTime,limit);
      if(this.data.length==0)
        this.notification.info("Thông báo","Không có dữ liệu trong khoảng thời gian này");
      this.isWait=false;
    } catch (error) {
      this.notification.error("Lỗi","Xảy ra lỗi khi tải dữ liệu");
      this.isWait=false;
    }
    
  }

  close(){
    this.visible=false;
  }

}
