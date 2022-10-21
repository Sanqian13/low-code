import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable, Inject, Injector } from "@angular/core";
import { DA_SERVICE_TOKEN, ITokenService } from "@delon/auth";
import { PlatformLocation } from "@angular/common";
import { MyJwtModel } from '../entity/myJwtModel';

@Injectable({
  providedIn: "root",
})
export class CanActivateGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private injector: Injector,
    public location: PlatformLocation
  ) { }
  async canActivate(
    next: ActivatedRouteSnapshot, // ActivatedRouteSnapshot 包含了即将被激活的路由
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // RouterStateSnapshot 包含了该应用即将到达的状
    console.log('===========路由拦截=========', (this.injector.get(DA_SERVICE_TOKEN) as ITokenService).get(MyJwtModel).token)
    if (!(this.injector.get(DA_SERVICE_TOKEN) as ITokenService).get(MyJwtModel).token) {
      this.router.navigate(['/passport/login']);
    }
    return true;
  }
}
