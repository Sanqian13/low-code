import { Injectable, Injector, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { zip } from "rxjs";
import { catchError } from "rxjs/operators";
import { DA_SERVICE_TOKEN, ITokenService } from "@delon/auth";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { MyJwtModel } from "../../entity/myJwtModel";
import { LoginService } from "src/app/service/login.service";
import {
  ALAIN_I18N_TOKEN,
  MenuService,
  SettingsService,
  TitleService,
} from "@delon/theme";
import { ACLService } from "@delon/acl";

import { NzIconService } from "ng-zorro-antd/icon";
import { ICONS } from "../../../style-icons";
import { ICONS_AUTO } from "../../../style-icons-auto";
import { CodeConstants } from "src/app/commons/code-constants";
import { getQueryString } from 'src/app/shared/utils/public-function';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }

  // 项目启动 设置app信息&设置免鉴权用户信息
  private viaHttp(resolve: any, reject: any): void {

    const name = getQueryString('loginName');
    const code = getQueryString('code');
    console.log('===============queryParams=====', name, code)
    // 如果url query参数有登录名和token则直接请求detail接口获取用户信息
    if (name && code) {
      const params = {
        loginName: name,
        code
      }
      this.loginService.loginDetail(params).subscribe(res => {
        if (res.code === CodeConstants.SUCCESS_CODE && res.data) {

        } else {
          this.notification.error(`${res.message}`, ``);
          this.tokenService.clear();
          this.aclService.setAbility([]);
        }
        resolve({});
      }, err => {
        this.tokenService.clear();
        this.aclService.setAbility([]);
        resolve({});
      })
    } else {
      this.loginService.setUserPermission();
      this.loginService.setTitle();
      resolve({});
    }
    // 设置用户Token信息
    // const myJwtModel = new MyJwtModel();
    // myJwtModel.token = "dhfsksdfjsfjsfsfslfmslvm";
    // this.tokenService.set(myJwtModel);
  }

  private viaMock(resolve: any, reject: any): void {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `ng-alain`,
      description: `Ng-zorro admin panel front-end framework`,
    };
    const user: any = {
      name: "Admin",
      // avatar: "./assets/tmp/img/avatar.jpg",
      email: "cipchk@qq.com",
      token: "123456789",
    };
    // Application information: including site name, description, year
    this.settingService.setApp(app);
    // User information: including name, avatar, email address
    this.settingService.setUser(user);
    // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
    this.aclService.setFull(true);
    // Menu data, https://ng-alain.com/theme/menu
    this.menuService.add([
      {
        text: "Main",
        group: true,
        children: [
          {
            text: "Dashboard",
            link: "/dashboard",
            icon: { type: "icon", value: "appstore" },
          },
        ],
      },
    ]);
    // Can be set page suffix title, https://ng-alain.com/theme/title
    this.titleService.suffix = app.name;

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      // this.viaMock(resolve, reject);
    });
  }
}
