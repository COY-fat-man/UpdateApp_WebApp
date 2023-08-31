import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { DieuKhienToaXeService } from '../dk-toa-xe.service';
import { Subject, takeUntil } from 'rxjs';
import { NhietDo_Model } from 'src/app/data/models/toa-xe/nhiet-do.model';
import { TemperatureChartDirective } from 'src/app/shared/directives/temperature-chart/temperature-chart.directive';
import { TemperatureApiService } from 'src/app/data/services/toa-xe/temperature-api.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit,OnDestroy {
  @ViewChild("chartHistory",{read:TemperatureChartDirective}) chartRef:TemperatureChartDirective;
  private destroy$=new Subject();
  data:NhietDo_Model[]=[];
  status:NhietDo_Model|null;
  temp0=0;
  temp1=0;
  temp2=0;
time1: number;
  constructor(
    private monitorService: DieuKhienToaXeService,
    private configApi:TemperatureApiService
  ) { }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  ngOnInit() {
    this.monitorService.historyLog$.pipe(takeUntil(this.destroy$)).subscribe(v => {
      if (v != null) {
        this.data=v;
      }
    });
    this.monitorService.status$.pipe(takeUntil(this.destroy$)).subscribe(v => {
      if (v != null) {
        this.chartRef.addPoint(v);
        this.status=v;
        this.temp0=v.temperature0;
        this.temp1=v.temperature1;
        this.temp2=v.temperature2;
        
      }  
    });
    
  }
  public time_Role_Run:any=0;
  public time_Wait:any=0;
  public ClickTimeRoleRun(timeRoleRun:any) {
    this.time_Role_Run=timeRoleRun;
    this.configApi.getConfig(this.time_Role_Run,0);

  }
  public ClickTimeWait(timeWait:any) {
    this.time_Wait=timeWait;
    this.configApi.getConfig(0,this.time_Wait);
  }
}
