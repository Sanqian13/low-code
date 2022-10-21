import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "@env/environment";
import { DefaultComponent } from "../layout/default/default.component";
import { LayoutPassportComponent } from "../layout/passport/passport.component";
// dashboard pages
import { DataTotalComponent } from "./page/data-total/data-total.component";

// single pages
import { CallbackComponent } from "./passport/callback.component";
import { UserLockComponent } from "./passport/lock/lock.component";
// passport pages
import { UserLoginComponent } from "./passport/login/login.component";
import { UserRegisterComponent } from "./passport/register/register.component";
import { CanActivateGuard } from '../commons/canactive';

import { ACLGuard } from '@delon/acl';
import { permission } from 'src/app/commons/permission';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [CanActivateGuard],
    children: [
      { path: '', redirectTo: "home", pathMatch: "full" },
      // 数据总览
      {
        path: 'home',
        component: DataTotalComponent,
        canActivate: [ACLGuard],
        data: {
          title: `数据总览`,
          guard: {
            ability: [permission.page.total],
          },
          guard_url: '/site'
        },
      },
      {
        path: 'exception',
        loadChildren: () =>
          import("./exception/exception.module").then((m) => m.ExceptionModule),
      }
    ],
  },
  // passport
  {
    path: "passport",
    component: LayoutPassportComponent,
    children: [
      {
        path: "login",
        component: UserLoginComponent,
        data: { title: "登录", titleI18n: "登录" },
      },
      {
        path: "register",
        component: UserRegisterComponent,
        data: { title: "注册", titleI18n: "pro-register" },
      },
      {
        path: "lock",
        component: UserLockComponent,
        data: { title: "锁屏", titleI18n: "lock" },
      },
    ],
  },
  // 单页不包裹Layout
  { path: "passport/callback/:type", component: CallbackComponent },
  { path: "**", redirectTo: "exception/404" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
