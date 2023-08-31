import { HttpClient } from "@angular/common/http";
import { Injectable, isDevMode } from "@angular/core";
import { tap } from "rxjs/operators";
import { SettingAppService } from "./const/setting.service";

interface AppConfig{
    version:string;
    url:string;
    urls:string;
    extern:{
      url:string;
      urls:string;
    }
}

interface AppConfig{
  version:string;
  url:string;
  urls:string;
}

@Injectable()
export class ConfigLoaderService {

  constructor(private httpClient: HttpClient) { }

  initialize() {
    return  this.httpClient.get<AppConfig>('./assets/config.json')
    .pipe(tap((response: AppConfig) => {       
      if(isDevMode()) {
        SettingAppService.url=response.extern.url;
        SettingAppService.urls=response.extern.urls;
      }
      else{
        SettingAppService.url=response.url;
        SettingAppService.urls=response.urls;
      }
      
    }));
  }

}