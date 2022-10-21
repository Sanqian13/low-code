import { ServicesModule } from "./services.module";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NoticeService {

  public headerBackBtnShow: BehaviorSubject<any[]> = new BehaviorSubject([false]); // 打开ppt 是否轮播


  constructor(private httpClient: HttpClient) { }


  // // 发送 当前页面地址
  // public sendAutoPlayControlSub(message: any): void {
  //   this.autoPlayControl.next(message);
  // }

  // // 接收 前一个页面
  // public getAutoPlayControlSub(): Observable<any> {
  //   return this.autoPlayControl.asObservable();
  // }
}
