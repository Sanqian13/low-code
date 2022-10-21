import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import Swiper from "swiper";

@Component({
  selector: "app-swiper",
  templateUrl: "./swiper.component.html",
})
export class SwiperComponent implements OnInit, OnChanges {
  @Input() direction?: "horizontal" | "vertical";
  @Input() slidesPerView = 10;
  @Input() swiperCont = "swiper-container";
  @Input() delay = 3;
  @Input() paginationShow = false;
  @Input() isObserver = true;
  @Input() indexNum = 0;
  @Input() swiperButton = false;
  @Input() allowSlide = true;
  constructor() { }
  swiperBox: any;
  swiperTopBox() { }
  ngOnInit() {
    this.swiperTopBox();
  }
  // 移入
  swiperEnter() {
    if (this.swiperBox) {
      this.swiperBox.autoplay.stop();
    }
  }
  // 移出
  swiperLeave() {
    if (this.swiperBox) {
      this.swiperBox.autoplay.start();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    const _this = this;
    // 轮播图
    setTimeout(() => {
      // tslint:disable-next-line: no-unused-expression
      _this.swiperBox = new Swiper("#" + _this.swiperCont, {
        direction: this.direction,
        loop: false,
        // dynamicBullets: true,
        // dynamicMainBullets: 2,
        observer: _this.isObserver, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: _this.isObserver, // 修改swiper的父元素时，自动初始化swiper
        autoplay: {
          disableOnInteraction: false,
          delay: _this.delay * 1000, // 1秒切换一次
        },
        slidesPerView: _this.slidesPerView,
        roundLengths: true, // 取整 防止字体模糊
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        allowSlideNext: _this.allowSlide,
        allowSlidePrev: _this.allowSlide,
        // loop: true,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
    });
  }
}
