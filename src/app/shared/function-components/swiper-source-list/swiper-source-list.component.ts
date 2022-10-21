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
import { ChangeFilter } from 'src/app/shared/utils/change-filter';


@Component({
  selector: "app-swiper-source-list",
  templateUrl: "./swiper-source-list.component.html",
  styleUrls: ["./swiper-source-list.component.less"],
})
export class SwiperSourceListComponent implements OnInit, OnChanges {
  @ViewChild("singleSwiper", { static: true }) singleSwiper: SwiperAutoComponent; // swiper

  @Output() private outEmit = new EventEmitter<any>();
  @Input() listDatas: SourceData[] = [];
  @Input() loading = false;
  @Input() slidesPerViewNum = 5;  // 页面内显示条数
  @Input() swiperLine: boolean | undefined;
  @Input() swiperID = "swiperID";
  @Input() contentHeight = "100%";
  @Input() isEmpty = 1;
  @Input() activeIndex = 0;
  @Input() mousewheel = true; // 是否可以鼠标滚动

  isData = 0;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.listDatas && this.listDatas.length) {
      this.isData = 1;
    } else {
      this.isData = 0;
    }
    const filter = ChangeFilter.of(changes);
    filter.has<number>('activeIndex').subscribe(value => {
      this.slideToActiveIndex();
    })

  }

  slideToActiveIndex() {
    if (this.singleSwiper && this.singleSwiper.swiperBox) {
      const currentFirstIndex = this.singleSwiper.swiperBox.activeIndex;  // 当前显示起始index
      const currentLastIndex = this.singleSwiper.swiperBox.activeIndex + this.slidesPerViewNum - 1; // 当前显示末尾index
      // 待激活文章index超出当前显示范围
      if (currentFirstIndex && currentLastIndex && this.activeIndex < currentFirstIndex || this.activeIndex > currentLastIndex) {
        // 控制swiper滑动到待激活文章index
        this.singleSwiper.swiperBox.slideTo(this.activeIndex);

      }
    }
  }
  openData(event) {
    this.outEmit.emit(event);
  }
  ngOnInit() {
  }
}
