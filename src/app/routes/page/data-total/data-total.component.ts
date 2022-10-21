import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from "rxjs/operators";

import { HomeService } from "src/app/service/home.service";
import { NzMessageService } from 'ng-zorro-antd/message';

import { CodeConstants } from "src/app/commons/code-constants";

@Component({
  selector: "app-data-total",
  templateUrl: "./data-total.component.html",
  styleUrls: ['./data-total.component.less'],
})
export class DataTotalComponent implements OnInit, OnDestroy {
  @ViewChild("spreadChart", { static: true }) spreadChart; // 图表

  constructor(
    private homeService: HomeService,
    private router: Router,
    private message: NzMessageService
  ) { }
  jumpUrl = null; // 跳转定时器

  /* 订阅流 */
  unsubscribe$ = new Subject<void>(); // 取消订阅
  totalDataSub$ = new Subject<any>(); // 总览传播稿件订阅


  // 加载
  loading = false;  // 单篇稿件列表loading

  /* ========== col-1 ========== */
  // 数据总览列表
  totalTopList = [
    {
      name: '传播热度Top5',
      key: 'spreadHot',
      bottomConfig: [ // 底部配置
        {
          icon: 'icon-time',
          label: '日期',
          key: 'date',
        },
        {
          icon: 'icon-source',
          label: '所属',
          key: 'origin',
          urlKey: 'originUrl',
          color: 'source_blue'
        },
        {
          icon: 'icon-hot',
          label: '热度',
          key: 'hot',
          color: 'hot_yellow'
        }
      ]
    },
    {
      name: '全网声量Top5',
      key: 'wholeNetworkVolume',
      bottomConfig: [ // 底部配置
        {
          icon: 'icon-time',
          label: '日期',
          key: 'date',
        },
        {
          icon: 'icon-source',
          label: '所属',
          key: 'origin',
          urlKey: 'originUrl',
          color: 'source_blue'
        },
        {
          icon: 'icon-hot',
          label: '全网声量',
          key: 'totalNum',
          color: 'hot_yellow'
        }
      ]
    },
    {
      name: '媒体传播Top5',
      key: 'mediaSpread',
      bottomConfig: [ // 底部配置
        {
          icon: 'icon-time',
          label: '日期',
          key: 'date',
        },
        {
          icon: 'icon-source',
          label: '所属',
          key: 'origin',
          urlKey: 'originUrl',
          color: 'source_blue'
        },
        {
          icon: 'icon-hot',
          label: '传播量',
          key: 'mediaNum',
          color: 'hot_yellow'
        }
      ]
    },
    {
      name: '微博转发Top5',
      key: 'weiboForward',
      bottomConfig: [ // 底部配置
        {
          icon: 'icon-time',
          label: '日期',
          key: 'date',
        },
        {
          icon: 'icon-source',
          label: '所属',
          key: 'origin',
          urlKey: 'originUrl',
          color: 'source_blue'
        },
        {
          icon: 'icon-hot',
          label: '转发量',
          key: 'totalForwardNumber',
          color: 'hot_yellow'
        }
      ]
    },
    {
      name: '微博评论Top5',
      key: 'weiboComment',
      bottomConfig: [ // 底部配置
        {
          icon: 'icon-time',
          label: '日期',
          key: 'date',
        },
        {
          icon: 'icon-source',
          label: '所属',
          key: 'origin',
          urlKey: 'originUrl',
          color: 'source_blue'
        },
        {
          icon: 'icon-hot',
          label: '评论量',
          key: 'totalCommentNumber',
          color: 'hot_yellow'
        }
      ]
    },
    // {
    //   name: '微博点赞Top5',
    //   key: 'weiboPraise',
    // }
  ]
  // 总览稿件
  totalData = {
    spreadHot: [],
    wholeNetworkVolume: [],
    mediaSpread: [],
    weiboForward: [],
    weiboComment: [],
    weiboPraise: [],
  }

  /* ========== col-2 ========== */
  spreadHealth = [];  // 传播健康度
  spreadHotChart = {
    list: [],
  }
  // 传播影响力
  spreadPlatformList = [];  // 传播平台占比列表
  //  市民六元情绪声量
  emotionInfo = [];
  // 正负面高频词
  highWords = {
    zmKeywordData: [],
    fmKeywordData: [],
  };

  ngOnInit() {
    this.subTotalData();  // 初始化数据订阅
    this.getTotalManuscriptData(); // 获取数据总览数据

    // 解决setInterval定时器在切换浏览器时速度加快导致内存溢出问题
    document.onvisibilitychange = () => {
      if (document.visibilityState == "visible") {
        this.spreadChart.autoPlay();
      } else {
        this.spreadChart.pausePlay();
      }
    }
  }
  ngOnDestroy() {
    // 清楚定时器
    clearInterval(this.jumpUrl);
    // 通过takeUntil完成unsubscribe$以结束订阅
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /* 数据获取 */
  /* ========== col-1 ========== */
  getTotalManuscriptData() { // 数据总览列表
    const params = {
    }
    this.loading = true;
    this.totalDataSub$.next(params);
  }
  subTotalData() {
    this.totalDataSub$.pipe(
      switchMap((param) => this.homeService.postTotalData(param)),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.loading = false;
      if (res.code === CodeConstants.SUCCESS_CODE && res.data) {
        // col-1
        // 数据top5列表
        const { spreadHot, wholeNetworkVolume, mediaSpread, weiboForward, weiboComment, weiboPraise } = res.data;
        this.totalData = {
          spreadHot,
          wholeNetworkVolume,
          mediaSpread,
          weiboForward,
          weiboComment,
          weiboPraise
        };

        // col-2
        this.spreadHealth = res.data.overviewCommunicationHealth.reverse() || [];  // 传播健康度
        this.emotionInfo = res.data.overviewEmotionInsight || []; // 网民情绪洞察

        // col-3
        this.spreadPlatformList = res.data.overviewPlatformDistribution || [];  // 传播平台活跃度
        this.highWords.fmKeywordData = res.data.overviewFmKeywordData || [];  // 正负面高频词
        this.highWords.zmKeywordData = res.data.overviewZmKeywordData || [];

        // 传播热力图
        this.spreadHotChart = {
          list: res.data.heatChart || [],
        }
      } else {
        this.message.warning(res.message);
        // col-1
        // 数据top5列表
        this.totalData = {
          spreadHot: [],
          wholeNetworkVolume: [],
          mediaSpread: [],
          weiboForward: [],
          weiboComment: [],
          weiboPraise: [],
        }

        // col-2
        this.spreadHealth = []; // 传播健康度
        this.emotionInfo = [];  // 网民情绪洞察

        // col-3
        this.spreadPlatformList = []; // 传播平台活跃度
        this.highWords.fmKeywordData = [];
        this.highWords.zmKeywordData = [];

        // 传播热力图
        this.spreadHotChart = {
          list: [],
        }
      }
    })
  }

  // 跳转到单篇稿件
  openSingleData(event) {
    if (event.id) {
      this.router.navigate(['/single'], { queryParams: { id: event.id } });
    } else {
      this.message.warning('未获取到文章id~')
    }
  }

}
