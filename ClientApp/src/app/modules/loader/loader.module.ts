import { NgModule } from "@angular/core";
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule } from "ngx-ui-loader";
import { SettingAppService } from "src/app/const/setting.service";
import { LoaderComponent } from "./loader.component";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    bgsColor: "##1890FF",
    bgsOpacity: 0.0,
    bgsPosition: "top-right",
    bgsSize: 30,
    bgsType: "wandering-cubes",
    blur: 1,
    delay: 0,
    fastFadeOut: true,
    fgsColor: "#3195EB",
    fgsPosition: "center-center",
    fgsSize: 40,
    fgsType: "rectangle-bounce",
    gap: 30,
    logoPosition: "center-center",
    logoSize: 150,
    logoUrl: "",
    masterLoaderId: "master",
    overlayBorderRadius: "0",
    overlayColor: "rgba(30, 30, 30, 0.2)",
    pbColor: "red",
    pbDirection: "ltr",
    pbThickness: 3,
    hasProgressBar: true,
    text: "",
    textColor: "#FFFFFF",
    textPosition: "center-center",
    maxTime: -1,
    minTime: 300
};

@NgModule({
    imports:[
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderRouterModule,
        NgxUiLoaderHttpModule.forRoot({
          showForeground:true,
          exclude:[
            SettingAppService.getHostUrl()+"/api/temperature/status"
          ],
        }),
    ],
    declarations:[
        LoaderComponent
    ],
    exports:[
        LoaderComponent
    ]
})
export class AppLoaderModule{}