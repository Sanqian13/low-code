import { NgModule, Type } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlainThemeModule } from "@delon/theme";
import { DelonACLModule } from "@delon/acl";
import * as echarts from 'echarts';
import { NgxEchartsModule } from "ngx-echarts";

import { SHARED_DELON_MODULES } from "./shared-delon.module";
import { SHARED_ZORRO_MODULES } from "./shared-zorro.module";

// directive
import { OpenUrlDirective } from 'src/app/directives/open-url.directive';

// pipe

import {
  CardComponent,
  ModuleTitleComponent,
  SwiperComponent,
  SwiperAutoComponent,
  NumberAnimateComponent,
  EmptyComponent,
  DividerComponent,
  VideoComponent,
  UserModalComponent
} from "./components";
import {
  ChartBarComponent,
  ChartLine2Component,
  ChartPie3DComponent,
  ChartPieComponent,
  ChartScatterComponent,
  ChartBarLineComponent,
  ChartGenderBarComponent,
  ChartPie1Component
} from "./componentsChart";
import {
  KeywordListComponent,
  InfoBoardComponent,
  SpreadBoardComponent,
  SpreadTableComponent,
  SwiperSourceListComponent,
  WrdEmotionInfoComponent,
  SwiperHotListComponent,
  SwiperArticleListComponent,
  SwiperCollapseListComponent,
  EventDetailsComponent,
  HealthPieComponent,
  ManusriptInfoComponent,
  SwiperAccountListComponent,
  ProportionPieComponent,
  VideoMonitorComponent
} from "./function-components";
// #region third libs

const THIRDMODULES = [SHARED_DELON_MODULES, SHARED_ZORRO_MODULES];

// #endregion

// #region your componets & directives

// 视图组件
const VIEW_COMPONENTS: Type<any>[] = [
  CardComponent,
  ModuleTitleComponent,
  EmptyComponent,
  SwiperComponent,
  SwiperAutoComponent,
  NumberAnimateComponent,
  DividerComponent,
  VideoComponent,
  UserModalComponent
];
// 图表组件
const CHART_COMPONENTS: Type<any>[] = [
  ChartBarComponent,
  ChartLine2Component,
  ChartPie3DComponent,
  ChartPieComponent,
  ChartScatterComponent,
  ChartBarLineComponent,
  ChartGenderBarComponent,
  ChartPie1Component
];
// 功能组件
const COMPONENTS: Type<any>[] = [
  KeywordListComponent,
  InfoBoardComponent,
  SpreadBoardComponent,
  SpreadTableComponent,
  SwiperSourceListComponent,
  WrdEmotionInfoComponent,
  SwiperHotListComponent,
  SwiperArticleListComponent,
  SwiperCollapseListComponent,
  EventDetailsComponent,
  HealthPieComponent,
  ManusriptInfoComponent,
  SwiperAccountListComponent,
  ProportionPieComponent,
  VideoMonitorComponent
];
const DIRECTIVES: Type<any>[] = [OpenUrlDirective];

const PIPES: Type<any>[] = [];
// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonACLModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    // third libs
    // ...DIRECTIVES,
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...VIEW_COMPONENTS,
    ...CHART_COMPONENTS,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonACLModule,
    NgxEchartsModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...VIEW_COMPONENTS,
    ...CHART_COMPONENTS,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
})
export class SharedModule { }
