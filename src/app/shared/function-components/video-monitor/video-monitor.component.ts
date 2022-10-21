import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  ViewChild,
  ElementRef
} from "@angular/core";
import { SwiperComponent } from "src/app/shared/components/swiper";
import { VideoComponent } from "src/app/shared/components/video";

@Component({
  selector: "app-video-monitor",
  templateUrl: "./video-monitor.component.html",
  styleUrls: ["./video-monitor.component.less"],
})
export class VideoMonitorComponent implements OnInit, OnChanges {
  @ViewChild("videoSwiper", { static: false }) videoSwiper: SwiperComponent;

  constructor(private elementRef: ElementRef) { }

  @Input() loading: boolean = false; // 视频加载
  @Input() videoList = []; // 视频列表数据

  isData: number = 0; // 无数据
  activeIndex: number = 0; // 当前index

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.videoList && this.videoList.length) {
        this.isData = 1;
        this.activeIndex = 0;
      } else {
        this.isData = 0;
      }
    }
  }
  ngOnInit() { }

  videoPlay() { }
  getActiveIndex(activeIndex) {
    this.pauseVideos();
    this.activeIndex = activeIndex;
  }
  pauseVideos() {
    const videos = this.elementRef.nativeElement.querySelectorAll("video");
    if (videos.length) {
      videos.forEach(item => {
        item.pause();
      })
    } else {
      videos.pause();
    }

  }
}
