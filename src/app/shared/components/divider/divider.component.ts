import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-divider",
  template: `
  <span class="divider-spot v-a-m" style="margin-right: 5px"></span>
  <span class="divider-line v-a-m"></span>
  <span class="divider-spot v-a-m" style="margin-left: 5px"></span>
  `,
  styles: [
    `
    .divider-spot {
      width: 3px;
      height: 3px;
      background: #2B6180;
      display: inline-block;
    }
    .divider-line {
      width: calc(100% - 16px);
      height: 1px;
      background-color: #314a65;
      opacity: 0.7;
      display: inline-block;
    }
    `
  ]
})
export class DividerComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}
