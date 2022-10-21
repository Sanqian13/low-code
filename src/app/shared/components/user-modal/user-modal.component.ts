import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { Router } from '@angular/router';

import { DA_SERVICE_TOKEN, ITokenService } from "@delon/auth";
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginService } from "src/app/service/login.service";

import { MyJwtModel } from 'src/app/entity/myJwtModel';
import { CodeConstants } from "src/app/commons/code-constants";

@Component({
  selector: "app-user-modal",
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.less"],
})
export class UserModalComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private loginService: LoginService,
    private notification: NzNotificationService,
    private router: Router,
    private message: NzMessageService
  ) { }

  maskStyle = {
    'background': 'rgba(0, 0, 0, .6)'
  }

  isVisible = false;
  modalWidth = 784;
  loading = false;

  username: string = '';  // 用户名
  unitName: string = '';  // 单位名称
  expirationTime: string = '2022-10-26T11:03:31.000+0000';  // 到期时间

  ngOnInit() {
    const myJwtModel = this.tokenService.get(MyJwtModel);
    this.username = myJwtModel.username || '';
    this.unitName = myJwtModel.unitName || '';
    this.expirationTime = myJwtModel.expirationTime || '';
  }

  ngOnDestroy() {
    this.username = '';
    this.unitName = '';
    this.expirationTime = '';
  }

  showModal() {
    this.isVisible = true;
  }
  hideModal() {
    this.isVisible = false;
  }
  logout() {
    this.loading = true;
    this.loginService.logout().subscribe(res => {
      this.loading = false;
      if (res.code === CodeConstants.SUCCESS_CODE) {
        this.notification.success(`账号已退出登录`, ``);
        this.tokenService.clear();
        this.router.navigateByUrl('/passport/login');
      } else {
        this.message.error(res.message);
      }
    }, err => {
      this.message.error('出错了, 请稍后再试~');
      this.loading = false;
    })
  }
}
