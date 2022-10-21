import { Component, OnInit, Input } from "@angular/core";
import { Constants } from "src/app/commons/constants";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
})
export class CardComponent implements OnInit {
  @Input() title = "";
  @Input() cardHeight = "50%";
  @Input() marginBottom = "0";
  @Input() marginTop = "0";
  @Input() bodyStyle = "";
  @Input() link = "";
  @Input() describe = "";
  @Input() customType = 0; // 定制路径  0 默认 1 2定制
  constructor() {}
  confirm() {}
  cancel() {}
  ngOnInit() {}
}
