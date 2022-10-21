import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-spread-table",
  templateUrl: "./spread-table.component.html",
  styleUrls: ["./spread-table.component.less"],
})
export class SpreadTableComponent implements OnInit {
  constructor() {}
  @Input() list = [];
  @Input() loading = false;

  ngOnInit() {}
}
