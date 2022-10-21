import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { SourceData } from "src/app/entity/common.type";

@Component({
  selector: "app-swiper-article-list",
  templateUrl: "./swiper-article-list.component.html",
  styleUrls: ["./swiper-article-list.component.less"],
})
export class SwiperArticleListComponent implements OnInit {

  @Output() private outEmit = new EventEmitter<any>();
  @Input() listDatas: SourceData[] = [];
  @Input() loading = false;
  @Input() bottomConfig = [ // 底部配置
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
  @Input() reverse = false; // 底部是否反转显示
  // 轮播相关配置
  @Input() slidesPerViewNum = 5;  // 页面内显示条数
  @Input() effect = 'slide'; // 轮播效果
  @Input() delay = 10;  // 轮播延迟
  @Input() swiperLine: boolean | undefined;
  @Input() swiperID = "swiperID";
  @Input() contentHeight = "100%";
  @Input() mousewheel = true; // 是否可以鼠标滚动

  constructor() { }

  openData(event) {
    this.outEmit.emit(event);
  }
  ngOnInit() {
  }
}
