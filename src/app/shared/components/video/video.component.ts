import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  ElementRef,
  OnDestroy,
} from "@angular/core";

@Component({
  selector: "app-video",
  template: `
  <div
   style="position: relative;"
   (mouseenter)="videoEnter()"
   (mouseleave)="videoLeave()"
  >
    <video
      preload="auto"
      loop
      muted
      webkit-playsinline="true"
      playsinline="true"
      style="height: {{ height }}; width: {{ width }}; background-color: {{
        backgroundColor
      }}"
      [poster]="imgUrl"
      controls="controls"
    >
      <source [src]="src" type="video/mp4" />
    </video>
    <div [hidden]="controlBtnHide" class="control-btn" (click)="changeStatus()">
      <div class="video-btn" [ngClass]="{'video-pause': videoPlay == true}"></div>
    </div>
  </div>
  `,
  styles: [],
})
export class VideoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() backgroundColor = "rgba(32, 38, 49, .5)";
  @Input() src = "";
  @Input() imgUrl = "";
  @Input() width = "100%";
  @Input() height = "100%";
  @Input() autoplay = false;
  @Input() controlBtnHide = true; // 是否展示控制按钮

  videoDom: any;
  videoPlay = false;  // 视频播放状态
  videoCanplay = false; // 视频是否可以播放

  constructor(private elementRef: ElementRef) { }

  autoPlay() {
    if (this.videoDom) {
      this.videoCanplay = true;
      this.videoDom.play();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src) {
      const video = this.elementRef.nativeElement.querySelector("video");
      this.videoDom = video;
      if (this.autoplay) {
        this.videoDom.addEventListener("canplay", this.autoPlay);
      } else {
        this.videoDom.src = this.src;
        this.videoDom.removeEventListener("canplay", this.autoPlay);
      }
    }

  }
  ngOnInit() {
    const video = this.elementRef.nativeElement.querySelector("video");
    this.videoDom = video;
    const that = this;
    this.videoDom.addEventListener("canplay", function autoPlay2() {
      if (that.autoplay) {
        video.play();
      }
      that.controlBtnHide = false;
      that.videoCanplay = true;
      video.removeEventListener("canplay", autoPlay2);
    });
    this.videoDom.addEventListener("play", this.videoSwitchPlay.bind(that))
    this.videoDom.addEventListener("pause", this.videoSwitchPause.bind(that))
  }


  ngOnDestroy() {
    this.videoDom.removeEventListener("canplay", this.autoPlay);
    this.videoDom.removeEventListener("play", this.videoSwitchPlay);
    this.videoDom.removeEventListener("pause", this.videoSwitchPause);
  }

  videoEnter() {
    if (this.videoCanplay) {
      this.controlBtnHide = false;
    }
  }
  videoLeave() {
    if (this.videoCanplay) {
      this.controlBtnHide = true;
    }
  }

  videoSwitchPlay() {
    const that = this;
    this.videoPlay = true;
  }
  videoSwitchPause() {
    const that = this;
    this.videoPlay = false;
  }

  // 改变播放状态
  changeStatus() {
    if (this.videoDom && this.videoCanplay) {
      if (this.videoDom.paused) {
        this.videoPlay = true;
        this.videoDom.play();
      } else {
        this.videoPlay = false;
        this.videoDom.pause();
      }
    }
  }
}
