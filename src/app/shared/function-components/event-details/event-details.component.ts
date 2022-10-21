import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { Constants } from "src/app/commons/constants";

@Component({
  selector: "app-event-details",
  templateUrl: "./event-details.component.html",
  styleUrls: ["./event-details.component.less"],
})
export class EventDetailsComponent implements OnInit {
  constructor() { }

  @Input() loading = false;
  @Output() private outEmit = new EventEmitter<any>();

  modalWidth = 980;
  modalType = 1; // 1 原文详情
  isDetailsVisible = false;

  detailData = {  // 原文详情
    title: "",
    webpageUrl: '',
    forwarderContent: "",
    forwarderImages: [],
    startTime: "",
    originalUrl: "",
    endTime: "",
    avgHot: 0, //  热度均值
    topHot: 0, //    热度峰值
    topTime: "", // 热度时间点
    numberDay: 0, // 全网信息量
    eventTime: '',
    imgUrls: []
  };

  ngOnInit() { }

  //信息监测
  showModal(event) {
    this.detailData = null;
    this.isDetailsVisible = true;
    this.detailData = event;

    if (event.img_urls) {
      const imgList = event.img_urls;
      this.detailData.imgUrls = JSON.parse(imgList);
    }

  }
  hideModal() {
    this.isDetailsVisible = false;
    this.outEmit.emit();
  }
}
