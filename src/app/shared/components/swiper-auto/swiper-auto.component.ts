import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from "@angular/core";
import Swiper from "swiper";

@Component({
  selector: "app-swiper-auto",
  templateUrl: "./swiper-auto.component.html",
})
export class SwiperAutoComponent implements OnInit, OnChanges {
  @Input() direction?: "horizontal" | "vertical"; // 轮播方向 水平|垂直
  @Input() slidesPerView = 10;  // 一页显示轮播条数
  @Input() swiperCont = "swiper-container-auto";  // 轮播标识class
  @Input() autoplayShow = false;  // 是否自动轮播
  @Input() delay = 3; // 自动轮播间隔
  @Input() paginationShow = false;  // swiper分页器
  @Input() isObserver = true; // 是否自动刷新
  @Input() swiperButton = false;  // swiper切换按钮
  @Input() allowSlide = true; // 是否允许滑动
  @Input() mousewheel = false; // 是否可以鼠标滚动
  @Input() effect = 'slide';  // 切换效果
  @Input() nextButton = "swiper-button-prev swiper-left";
  @Input() prevButton = "swiper-button-next swiper-left";
  @Input() noSwiping = false; // 是否禁止鼠标滑动
  @Input() virtual = false; // 是否虚拟列表
  @Input() roundLengths = false;  // 取整
  @Output() private slidesIndexChange = new EventEmitter();

  constructor() { }
  swiperBox: any;
  swiperTopBox() { }
  ngOnInit() {
    this.swiperTopBox();
  }
  // 移入
  swiperEnter() {
    if (this.autoplayShow && this.swiperBox) {
      this.swiperBox.autoplay.stop();
    }
  }
  // 移出
  swiperLeave() {
    if (this.autoplayShow && this.swiperBox) {
      this.swiperBox.autoplay.start();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    const that = this;
    // 轮播图
    setTimeout(() => {
      // 自动轮播配置
      const autoPlaySetting = {
        delay: this.delay * 1000
      }
      that.swiperBox = new Swiper("#" + this.swiperCont, {
        direction: this.direction,
        loop: false,
        speed: 500,
        // dynamicBullets: true,
        // dynamicMainBullets: 2,
        observer: this.isObserver, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: this.isObserver, // 修改swiper的父元素时，自动初始化swiper
        autoplay: this.autoplayShow ? autoPlaySetting : this.autoplayShow,
        slidesPerView: this.slidesPerView,
        mousewheel: this.mousewheel,
        roundLengths: this.roundLengths, // 取整 防止字体模糊
        navigation: {
          nextEl: "." + this.nextButton,
          prevEl: "." + this.prevButton,
        },
        effect: this.effect,
        allowSlideNext: this.allowSlide,
        allowSlidePrev: this.allowSlide,
        // loop: true,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        noSwiping: this.noSwiping,
        virtual: this.virtual,
        on: {
          slideChangeTransitionEnd: function () {
            that.slidesIndexChange.emit(this.activeIndex);
          },
        },
      });
    });
  }
}
