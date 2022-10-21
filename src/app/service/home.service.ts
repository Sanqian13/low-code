import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, timer } from "rxjs";
import { delay, map, switchMap, shareReplay } from 'rxjs/operators';
import { CodeConstants } from "../commons/code-constants";
import { ServicesModule } from "./services.module";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  private CACHE_SIZE = 1; // 缓存数量
  private REFRESH_INTERVAL = 12 * 60 * 60 * 1000; // 缓存时间 1分钟
  public singleData$: Observable<any>; // 缓存的Observable

  // 获取单篇稿件列表（缓存）
  getSingleManuscriptCache(param) {
    return this.postSingleManuscript(param);

    // 如果有搜索参数，则重新请求列表，否则使用缓存
    // if (param.title) {
    //   return this.postSingleManuscript(param);
    // } else {
    //   const timer$ = timer(0, this.REFRESH_INTERVAL);
    //   if (!this.singleData$) {
    //     this.singleData$ = timer$.pipe(
    //       switchMap(_ => this.postSingleManuscript(param)),
    //       shareReplay(this.CACHE_SIZE)
    //     )
    //   }
    //   return this.singleData$;
    // }

  }
  // 清空缓存
  clear() {
    this.singleData$ = null;
  }

  // 单篇稿件列表
  private SINGLE_MANUSCRIPT_URL = ServicesModule.getBackendUrl() + '/api/v1/manuscript/analysis/screen/list';
  postSingleManuscript(params): Observable<any> {
    // let data = [];
    // for (let i = 0; i < 10; i++) {
    //   data.push({
    //     id: i,
    //     articleTitle: '许勤:坚决贯彻习近平生态文明思想 保护提升全省河湖生态安全, 保障生物安全',
    //     articlePath: [
    //       '黑龙江省政府',
    //       '省政府',
    //       '督查落实',
    //       '督查关注'
    //     ],
    //     createTime: '2022-5-27'
    //   })
    // }
    // return of(
    //   {
    //     code: '0000',
    //     data
    //   }
    // ).pipe(delay(1000))
    return this.httpClient.post(this.SINGLE_MANUSCRIPT_URL, params).pipe(
      map((res: any) => {
        if (res.code === CodeConstants.SUCCESS_CODE && res.data.length) {
          res.data.forEach(item => {
            item.articlePath = item.articleUrl.split('>>');
          })
        }
        return res;
      })
    );
  }

  // 数据总览
  private TOTAL_DATA_URL = ServicesModule.getBackendUrl() + '/api/v1/manuscript/analysis/screen/getDataScreening';
  postTotalData(params): Observable<any> {
    return this.httpClient.post(this.TOTAL_DATA_URL, params);
  }
}
