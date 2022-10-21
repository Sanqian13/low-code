import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { SourceData } from "src/app/entity/common.type";
import { SwiperAutoComponent } from "../../components";

@Component({
  selector: "app-swiper-account-list",
  templateUrl: "./swiper-account-list.component.html",
  styleUrls: ["./swiper-account-list.component.less"],
})
export class SwiperAccountListComponent implements OnInit, OnChanges {

  @Output() private outEmit = new EventEmitter<any>();
  @Input() listDatas: SourceData[] = [];
  @Input() verifiedType: number = 4;  // 1 金v 2 蓝v 3 橙v 4 普通
  @Input() loading = false;
  @Input() virtual = false; // 是否使用虚拟列表
  @Input() bottomConfig = [
    {
      icon: 'icon-time',
      label: '日期',
      key: 'published',
    },
    {
      icon: 'icon-article',
      label: '相似文章数',
      key: 'repeatNum',
      color: 'article_green'
    }
  ]
  @Input() showBottom = true; // 是否显示底部
  // 轮播相关配置
  @Input() slidesPerViewNum = 5;  // 页面内显示条数
  @Input() effect = 'slide'; // 轮播效果
  @Input() delay = 10;  // 轮播延迟
  @Input() swiperLine: boolean | undefined;
  @Input() swiperID = "swiperID";
  @Input() contentHeight = "100%";
  @Input() mousewheel = true; // 是否可以鼠标滚动

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  openData(event) {
    this.outEmit.emit(event);
  }
  ngOnInit() {
  }
}
