import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { DA_SERVICE_TOKEN, ITokenService } from "@delon/auth";
import { ServicesModule } from "./services.module";
import { ACLService } from "@delon/acl";

import { MyJwtModel } from "src/app/entity/myJwtModel";
import { CodeConstants } from "../commons/code-constants";
import { Constants } from 'src/app/commons/constants';

@Injectable({
  providedIn: "root",
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private aclSrv: ACLService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) { }
  // 存储
  setUserData(res) {
    // 设置用户Token信息
    const myJwtModel = new MyJwtModel();
    myJwtModel.token = res.data.token;
    myJwtModel.sysName = res.data.sysName;
    myJwtModel.tabImageUrl = res.data.tabImageUrl;
    myJwtModel.username = res.data.username;
    myJwtModel.userType = res.data.userType;
    myJwtModel.unitName = res.data.unitName;
    myJwtModel.expirationTime = res.data.expirationTime;
    myJwtModel.permission = res.data.permission;

    this.tokenService.set(myJwtModel);
  }

  getUserData() {
    return this.tokenService.get(MyJwtModel);
  }

  // 设置用户权限
  setUserPermission() {
    const userData = this.getUserData();
    let permissionArr = [];
    if (userData && userData.permission) {
      for (const key in userData.permission) {
        if (userData.permission[key]) {
          permissionArr.push(key);
        }
      }
    }
    this.aclSrv.setAbility(permissionArr);
    console.log('=========permissionArr======', permissionArr)
  }

  setTitle() {
    const userData = this.getUserData();
    console.log('=========userdata=======', userData)
    // 设置系统标题
    if (userData && userData.sysName) {
      Constants.sysName = userData.sysName;
    }
  }


  private LOGIN_URL = ServicesModule.getBackendUrl() + '/api/v1/manuscript/analysis/screen/login?_allow_anonymous=true';
  login(param): Observable<any> {
    return this.httpClient.post(this.LOGIN_URL, param).pipe(
      map((res: any) => {
        if (res.code === CodeConstants.SUCCESS_CODE && res.data) {
          this.setUserData(res);
          this.setUserPermission();
          this.setTitle();
        }
        return res;
      })
    );
  }

  private LOGIN_DETAIL_URL = ServicesModule.getBackendUrl() + '/api/v1/manuscript/analysis/screen/hlj/details?_allow_anonymous=true';
  loginDetail(param): Observable<any> {
    return this.httpClient.post(this.LOGIN_DETAIL_URL, param).pipe(
      map((res: any) => {
        if (res.code === CodeConstants.SUCCESS_CODE && res.data) {
          this.setUserData(res);
          this.setUserPermission();
          this.setTitle();
        }
        return res;
      })
    );
  }

  private LOGOUT_URL = ServicesModule.getBackendUrl() + '/api/v1/manuscript/analysis/screen/out';
  logout(): Observable<any> {
    return this.httpClient.post(this.LOGOUT_URL, {});
  }
}
