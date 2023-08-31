import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const mainRoutes: Routes = [
    {
        path: '', component: MainComponent, children: [

            { path: '', redirectTo: 'toa_xe', pathMatch: 'full' },
            
            {
                path: "toa_xe",
                loadChildren:()=>import('./dieu-khien-toa-xe/dieu-khien-toa-xe.module')
                                                .then(m=>m.DieuKhienToaXeModule),
            },
        ]
    }

]