import { Component, OnInit } from "@angular/core";

import { LoginService } from "src/app/service/login.service";
import { ACLService } from '@delon/acl';

import { Constants } from 'src/app/commons/constants';

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styles: [],
})
export class DefaultComponent implements OnInit {

  constructor(
    private loginSrv: LoginService,
    private aclSrv: ACLService
  ) { }

  ngOnInit() {
    const userData = this.loginSrv.getUserData();
    // 获取用户数据设置页签icon
    Constants.setSystemIcon(userData);

  }
}
