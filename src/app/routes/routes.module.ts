import { NgModule, Type } from "@angular/core";
import { SharedModule } from "@shared";
// dashboard pages
import { DataTotalComponent } from './page/data-total/data-total.component';
// single pages
import { CallbackComponent } from "./passport/callback.component";
import { UserLockComponent } from "./passport/lock/lock.component";
// passport pages
import { UserLoginComponent } from "./passport/login/login.component";
import { UserRegisterComponent } from "./passport/register/register.component";
import { RouteRoutingModule } from "./routes-routing.module";

const COMPONENTS: Type<void>[] = [
  //page
  DataTotalComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: COMPONENTS,
})
export class RoutesModule { }
