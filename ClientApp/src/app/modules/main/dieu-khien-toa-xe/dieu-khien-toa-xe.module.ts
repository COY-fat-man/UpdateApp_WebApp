import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DieuKhienToaXeComponent } from "./dieu-khien-toa-xe.component";
import { RouterModule, Routes } from "@angular/router";
import { TemperatureChartDirectiveModule } from "src/app/shared/directives/temperature-chart/temperature-chart.directive.module";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzModalModule } from "ng-zorro-antd/modal";
import { MobileComponent } from "./mobile/mobile.component";
import { DesktopComponent } from "./desktop/desktop.component";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from "ng-zorro-antd/grid";
import { TimeFormatPipeModule } from "src/app/shared/pipes/time/time-format-pipe.module";
import { TemperatureGaugeDirectiveModule } from "src/app/shared/directives/speed-gauge/speed-gauge.directive.module";
import { HistoryComponent } from "./history/history.component";
import { NzSpinModule } from 'ng-zorro-antd/spin';

const routes:Routes=[
    {
        path:"",
        component:DieuKhienToaXeComponent
    }
]

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        NzButtonModule,
        NzIconModule,
        NzInputModule,
        NzDrawerModule,
        NzModalModule,
        NzDatePickerModule,
        NzGridModule,
        TemperatureChartDirectiveModule,
        TimeFormatPipeModule,
        NzSpinModule,
        TemperatureGaugeDirectiveModule
    ],
    declarations:[
        DieuKhienToaXeComponent,
        MobileComponent,
        DesktopComponent,
        HistoryComponent
    ],
    providers:[

    ]
})
export class DieuKhienToaXeModule{}