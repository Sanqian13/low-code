import { ServicesModule } from "./services.module";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  public configMenuData: any; // 全局菜单权限
  public loopState: BehaviorSubject<any[]> = new BehaviorSubject([false]); // 打开ppt 是否轮播

  constructor(private httpClient: HttpClient) { }
  // 存储
  setData(key: string, data: any) {
    this[key] = data;
  }
  // 获取
  getData(key: string) {
    return this[key];
  }
}
