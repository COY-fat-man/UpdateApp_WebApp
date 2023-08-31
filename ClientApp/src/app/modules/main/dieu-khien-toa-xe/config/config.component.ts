import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NhietDo_Model } from 'src/app/data/models/toa-xe/nhiet-do.model';
import { TemperatureApiService } from 'src/app/data/services/toa-xe/temperature-api.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',

})
export class ConfigComponent implements OnInit {
  
  
  
  constructor(
    private tempApi:TemperatureApiService,
    private notification:NzNotificationService
  ) {

  }

  ngOnInit() {

  }

  public Click(configTime1:number,configTime2:number)
  {
    if()
    {}
  }


  }


