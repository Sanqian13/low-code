// tslint:disable: no-duplicate-imports
import { HttpClientModule } from "@angular/common/http";
import {
  APP_INITIALIZER,
  LOCALE_ID,
  NgModule,
  Type,
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NzMessageModule } from "ng-zorro-antd/message";
import { NzNotificationModule } from "ng-zorro-antd/notification";

import { default as ngLang } from "@angular/common/locales/zh";
import { DELON_LOCALE, zh_CN as delonLang } from "@delon/theme";
import { zhCN as dateLang } from "date-fns/locale";
import {
  NZ_DATE_LOCALE,
  NZ_I18N,
  zh_CN as zorroLang,
} from "ng-zorro-antd/i18n";
const LANG = {
  abbr: "zh",
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang,
  delon: delonLang,
};
// register angular
import { registerLocaleData } from "@angular/common";
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: LANG.abbr },
  { provide: NZ_I18N, useValue: LANG.zorro },
  { provide: NZ_DATE_LOCALE, useValue: LANG.date },
  { provide: DELON_LOCALE, useValue: LANG.delon },
];
// #endregion

// #region Http Interceptors
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { DefaultInterceptor } from "@core";
import { JWTInterceptor, SimpleInterceptor } from '@delon/auth';
const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
];
// #endregion

// #region global third module
const GLOBAL_THIRD_MODULES: Type<any>[] = [];
// #endregion

// #region Startup Service
import { StartupService } from "@core";
export function StartupServiceFactory(
  startupService: StartupService
): () => Promise<void> {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true,
  },
];
// #endregion

// #region route reuse strategy
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from "src/app/strategy/custom-route-reuse-strategy";
const ROUTE_REUSE_PROVIDES = [
  {
    provide: RouteReuseStrategy,
    useClass: CustomRouteReuseStrategy
  },
];
// #endregion

import { NgxRulerModule } from 'ngx-ruler';

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { GlobalConfigModule } from "./global-config.module";
import { LayoutModule } from "./layout/layout.module";
import { RoutesModule } from "./routes/routes.module";
import { SharedModule } from "./shared/shared.module";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GlobalConfigModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    NzMessageModule,
    NzNotificationModule,
    NgxRulerModule,
    ...GLOBAL_THIRD_MODULES,
  ],
  providers: [...LANG_PROVIDES, ...INTERCEPTOR_PROVIDES, ...APPINIT_PROVIDES, ...ROUTE_REUSE_PROVIDES],
  bootstrap: [AppComponent],
})
export class AppModule { }