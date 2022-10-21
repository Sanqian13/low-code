import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-wrd-emotion-info",
  templateUrl: "./wrd-emotion-info.component.html",
  styleUrls: ["./wrd-emotion-info.component.less"],
})
export class WrdEmotionInfoComponent implements OnInit {
  @Input() emotionInfo = [];
  @Input() loading = false;
  @Input() sm = "";
  @Input() height = '100%';
  constructor() {}

  ngOnInit() {
  }
}
