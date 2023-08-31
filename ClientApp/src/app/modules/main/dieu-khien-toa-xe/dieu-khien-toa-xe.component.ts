import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { MediaService } from 'src/app/data/services/common/media.service';
import { DieuKhienToaXeService } from './dk-toa-xe.service';
import * as moment from 'moment';
import { HistoryComponent } from './history/history.component';
import { TemperatureApiService } from 'src/app/data/services/toa-xe/temperature-api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dieu-khien-toa-xe',
  templateUrl: './dieu-khien-toa-xe.component.html',
  styleUrls: ['./dieu-khien-toa-xe.component.scss'],
  providers: [DieuKhienToaXeService]
})
export class DieuKhienToaXeComponent implements OnInit, OnDestroy {
  private mediaService = new MediaService('(min-width: 800px)');
  private destroy$ = new Subject();
  @ViewChild("history",{read:HistoryComponent}) historyRef:HistoryComponent;
  isDesktop: boolean = false;
  startTime=moment().add(-12,'hour').toDate();
  endTime=moment().toDate();
  limit=20000;
  constructor(
    private monitorService: DieuKhienToaXeService,
    private tempApi:TemperatureApiService,
    private notification:NzNotificationService
  ) { }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.monitorService.stop();
  }

  ngOnInit() {
    this.mediaService.match$.pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.isDesktop = value;
      });
    
    this.monitorService.run();
  }

  async searchHistory(){
    try {
      const info= await this.tempApi.getDevice();
      if(info!=null){
        const startTime=moment(this.startTime).format("YYYY-MM-DDTHH:mm:ss");
        const endTime=moment(this.endTime).format("YYYY-MM-DDTHH:mm:ss");
        await this.historyRef.show(info.deviceId,startTime,endTime,this.limit);
      } 
      else{
        this.notification.error("Lỗi","không tải được thông tin thiết bị");
      } 
    } catch (error) {
      this.notification.error("Lỗi","Xảy ra lỗi khi tải dữ liệu");
    }
    
  }

}
