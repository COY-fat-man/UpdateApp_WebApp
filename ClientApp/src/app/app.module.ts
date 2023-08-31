import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { AppLoaderModule } from './modules/loader/loader.module';
import { PageFailModule } from './modules/page-fail/page-fail.module';
import { ConfigLoaderService } from './config-loader.service';
import { PreloadFactory } from './preload-service.factory';
import { GlobalErrorHandler } from './global-error-handle';

registerLocaleData(en);

@NgModule({
  declarations: [	
    AppComponent,    
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    PageFailModule,
    FormsModule,
    AppLoaderModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    ConfigLoaderService,
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {
      provide: APP_INITIALIZER,
      deps: [
        ConfigLoaderService
      ],
      multi: true,
      useFactory: PreloadFactory
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
