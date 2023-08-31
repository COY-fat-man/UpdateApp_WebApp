import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NhietDo_Model } from 'src/app/data/models/toa-xe/nhiet-do.model';
import { TemperatureChartDirective } from 'src/app/shared/directives/temperature-chart/temperature-chart.directive';
import { DieuKhienToaXeService } from '../dk-toa-xe.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit ,OnDestroy{

  @ViewChild("chartHistory",{read:TemperatureChartDirective}) chartRef:TemperatureChartDirective;
  private destroy$=new Subject();
  data:NhietDo_Model[]=[];
  status:NhietDo_Model|null;
  temp0=0;
  temp1=0;
  temp2=0;
  constructor(
    private monitorService: DieuKhienToaXeService
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

}
