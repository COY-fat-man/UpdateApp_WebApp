import { NgModule } from "@angular/core";
import { SpeedGaugeDirective } from "./speed-gauge.directive";

@NgModule({
    imports:[],
    declarations:[
        SpeedGaugeDirective
    ],
    exports:[
        SpeedGaugeDirective
    ]
})
export class TemperatureGaugeDirectiveModule{}