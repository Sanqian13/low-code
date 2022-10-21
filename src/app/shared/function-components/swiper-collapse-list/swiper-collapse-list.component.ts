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
import { SwiperAutoComponent } from "../../components";

@Component({
  selector: "app-swiper-collapse-list",
  templateUrl: "./swiper-collapse-list.component.html",
  styleUrls: ["./swiper-collapse-list.component.less"],
})
export class SwiperCollapseListComponent implements OnInit, OnChanges {
  @ViewChild("collapseSwiper", { static: true }) collapseSwiper: SwiperAutoComponent; // swiper

  @Output() private outEmit = new EventEmitter<any>();
  @Output() private outSingleManuscript = new EventEmitter<any>();
  @Input() showType: number = 1;  // 1 专题列表 2 站点列表
  @Input() listDatas = [];
  @Input() loading = false;
  @Input() slidesPerViewNum = 5;  // 页面内显示条数
  @Input() swiperLine: boolean | undefined;
  @Input() swiperID = "collapseSwiperID";
  @Input() contentHeight = "100%";
  @Input() activeIndex = 0;
  @Input() mousewheel = true; // 是否可以鼠标滚动

  isData = 0;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listDatas && this.listDatas.length) {
      this.listDatas[0].checked = true;
    }
    if (changes.activeIndex && this.collapseSwiper && this.collapseSwiper.swiperBox) {
      // 控制swiper滑动到待激活文章index
      this.collapseSwiper.swiperBox.slideTo(this.activeIndex);
    }
  }
  openData(event) {
    this.outEmit.emit(event);
  }
  openManuscript(id) {
    this.outSingleManuscript.emit(id);
  }
  ngOnInit() {
  }

  expand(event) {
    this.listDatas.forEach(item => {
      if (item.id == event.id) {
        item.checked = !item.checked;
      } else {
        item.checked = false;
      }
    })
    // this.collapseSwiper.swiperBox.update();
  }
}
