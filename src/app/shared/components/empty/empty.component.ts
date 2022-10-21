import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-empty",
  template: `
    <div
      class="height-full flex-center width-full"
      [ngClass]="{ large: size == 'large', small: size == 'small' }"
    >
      <nz-empty
        [nzNotFoundImage]="iconImg"
        [nzNotFoundContent]="'暂无数据'"
      ></nz-empty>
    </div>
  `,
})
export class EmptyComponent implements OnInit {
  @Input() iconImg = "/assets/images/noData/no-data2.png";
  @Input() size = "";
  constructor() {}
  ngOnInit() {}
}
