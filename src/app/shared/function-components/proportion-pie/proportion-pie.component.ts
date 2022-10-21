import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-proportion-pie",
  templateUrl: "./proportion-pie.component.html",
  styleUrls: ["./proportion-pie.component.less"],
})
export class ProportionPieComponent implements OnInit {
  @Input() list = [];
  @Input() loading = false;
  @Input() height = '100%';
  constructor() { }

  ngOnInit() {
  }
}
