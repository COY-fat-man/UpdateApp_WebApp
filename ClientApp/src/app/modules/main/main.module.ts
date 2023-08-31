import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzNotificationModule } from "ng-zorro-antd/notification";
import { MainComponent } from "./main.component";
import { mainRoutes } from "./main.routing";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,        
        NzModalModule,
        NzButtonModule,
        NzIconModule,
        NzNotificationModule,
        NzLayoutModule,
        NzMenuModule,
        NzDividerModule,
        NzDrawerModule,
        NzInputModule,
        NzGridModule,
        RouterModule.forChild(mainRoutes),
    ],
    declarations:[MainComponent],
    exports:[

    ],
    providers:[
    ],
    
})
export class MainModule{
    
}
