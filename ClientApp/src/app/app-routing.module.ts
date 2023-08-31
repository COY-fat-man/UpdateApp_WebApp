import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageFailComponent } from './modules/page-fail/page-fail.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'main', pathMatch: 'full' 
  },
  {
    path: 'main', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule),    
  },
  {
    path:'**',component:PageFailComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
    scrollPositionRestoration: "enabled"
},
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
