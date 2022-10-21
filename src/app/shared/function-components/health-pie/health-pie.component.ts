import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-health-pie",
  templateUrl: "./health-pie.component.html",
  styleUrls: ["./health-pie.component.less"],
})
export class HealthPieComponent implements OnInit {
  @Input() list = [];
  @Input() loading = false;
  constructor() { }

  ngOnInit() {
  }
}
