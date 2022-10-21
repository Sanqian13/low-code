import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared";

import { NzGridModule } from "ng-zorro-antd/grid";

import {
  WrdScreenHeaderComponent,
  WrdScreenTimeComponent,
  WrdScreenTitleComponent,
  WrdScreenWeatherComponent,
} from "../shared/components";

// 默认组件
import { DefaultComponent } from "./default/default.component";

const COMPONENTS = [
  DefaultComponent,
  WrdScreenHeaderComponent,
  WrdScreenTimeComponent,
  WrdScreenTitleComponent,
  WrdScreenWeatherComponent,
];
// passport
import { LayoutPassportComponent } from "./passport/passport.component";
const PASSPORT = [LayoutPassportComponent];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NzGridModule,
  ],
  declarations: [...COMPONENTS, ...PASSPORT],
  exports: [...COMPONENTS, ...PASSPORT],
})
export class LayoutModule { }
