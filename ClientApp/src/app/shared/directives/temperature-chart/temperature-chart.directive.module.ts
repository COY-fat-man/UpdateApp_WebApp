import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TemperatureChartDirective } from "./temperature-chart.directive";

@NgModule({
    imports:[
        FormsModule,
        CommonModule
    ],
    declarations:[
        TemperatureChartDirective
    ],
    exports:[
        TemperatureChartDirective
    ]
})
export class TemperatureChartDirectiveModule{}