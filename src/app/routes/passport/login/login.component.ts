import { _HttpClient, SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { SocialService, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { MyJwtModel } from 'src/app/entity/myJwtModel';
import { Constants } from 'src/app/commons/constants';
import { LoginService } from 'src/app/service/login.service';
import { CodeConstants } from 'src/app/commons/code-constants';
@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    public http: _HttpClient,
    public msg: NzMessageService,
    public location: PlatformLocation,
    public settingsService: SettingsService,
    private loginService: LoginService
  ) {
    this.form = fb.group({
      username: [null, [Validators.required, Validators.minLength(2)]],
      password: [null, Validators.required],
    });
    modalSrv.closeAll();  // 关闭所有模态框
  }

  // #region fields

  get username() {
    return this.form.controls.username;
  }
  get password() {
    return this.form.controls.password;
  }

  form: FormGroup;
  error = '';
  loading = false;


  submit() {
    this.error = '';
    this.username.markAsDirty();
    this.username.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.username.invalid || this.password.invalid) {
      return;
    }
    // 默认配置中对所有HTTP请求都会强制 [校验]() 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    // /auth/api/v1/login?_allow_anonymous=true

    const params = {
      loginType: 2,
      name: this.username.value,
      password: this.password.value
    }
    this.loading = true;
    this.loginService.login(params).subscribe(res => {
      this.loading = false;
      if (res.code === CodeConstants.SUCCESS_CODE) {
        this.msg.success('登录成功~');
        // const app: any = {
        //   description: "微热点媒体管理平台",
        //   name: "",
        //   isExemptionFromAuthentication: false
        // }
        // this.settingsService.setApp(app);

        // 清空路由复用信息
        this.reuseTabService.clear();

        this.router.navigate(['/']);
      } else {
        this.error = res.message;
      }
    }, err => {
      this.loading = false;
      this.msg.error('发生错误了, 请稍后再试~');
    })
  }
  // #endregion
  ngOnInit() {

  }
  ngOnDestroy(): void {
  }
}
