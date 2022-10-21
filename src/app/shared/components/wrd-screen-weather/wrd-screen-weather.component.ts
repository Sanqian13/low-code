import { Component, OnInit, HostListener, ViewChild } from "@angular/core";
import { permission } from 'src/app/commons/permission';
import { Location } from '@angular/common';
import * as screenfull from "screenfull";
// declare var $: any;
@Component({
  selector: "app-wrd-screen-weather",
  templateUrl: "./wrd-screen-weather.component.html",
  styleUrls: ["./wrd-screen-weather.component.less"],
  host: {
    "[class.d-block]": "true",
  },
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrdScreenWeatherComponent implements OnInit {
  @ViewChild("userModal", { static: true }) userModal; // 弹框

  num: number = 0;
  today: any = Date.now();
  timer: any;
  now: Date;
  week: any;
  // 全屏
  status = false;
  isUserModalVisible = false; // 用户设置弹框是否显示

  private get sf(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }
  constructor(private location: Location) {
    this.timer = setInterval(() => {
      this.today = Date.now();
    }, 1000);
  }
  @HostListener("window:resize")
  _resize() {
    this.status = this.sf.isFullscreen;
  }
  fullScreen() {
    if (this.sf.isEnabled) {
      this.sf.toggle();
    }
  }
  back() {
    this.location.back();
  }

  // 打开设置弹框
  openSettingModal() {
    this.userModal.showModal();
  }
  // 获取当前时间 判断是星期几
  transform(value: any): any {
    if (value !== undefined) {
      const weekArray = new Array(
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六"
      );
      const myDate = new Date(value);
      const week = weekArray[myDate.getDay()];
      return week;
    }
  }

  ngOnInit(): void {
    this.now = new Date();
    this.week = this.transform(this.now);
  }
  ngOnDestory(): void {
    clearInterval(this.timer);
    clearInterval(this.week);
  }
}
