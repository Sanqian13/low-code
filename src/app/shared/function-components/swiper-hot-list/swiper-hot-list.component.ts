import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { SwiperInfoData } from "src/app/entity/common.type";

@Component({
  selector: "app-swiper-hot-list",
  templateUrl: "./swiper-hot-list.component.html",
  styleUrls: ["./swiper-hot-list.component.less"],
})
export class SwiperHotListComponent implements OnInit {
  @Output() private outEmit = new EventEmitter<any>();
  @Input() listDatas: SwiperInfoData[] = [];
  @Input() loading = false;
  @Input() slidesPerViewNum = 7;
  @Input() swiperLine: boolean | undefined;
  @Input() swiperID = "swiperID";
  @Input() contentHeight = "100%";
  @Input() isStyle = 0; // 1 显示地区
  constructor() { }

  ngOnInit() { }

  openData(event) {
    this.outEmit.emit(event);
  }
}
