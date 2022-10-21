import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, Input, OnInit } from "@angular/core";
import { Constants } from "src/app/commons/constants";
@Component({
  selector: "app-wrd-screen-title",
  template: ` <a routerLink="/" class="wrd-screen-title YouSheBiaoTiHei">{{ name }}</a> `,
})
export class WrdScreenTitleComponent implements OnInit {
  @Input() name = "稿件传播影响力分析平台";
  constructor() { }
  ngOnInit() {
    this.name = Constants.sysName;
  }
}
