import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-info-board",
  templateUrl: "./info-board.component.html",
  styleUrls: ["./info-board.component.less"],
})
export class InfoBoardComponent implements OnInit {
  @Input() list = [];
  @Input() loading = false;
  @Input() height = '100%';
  constructor() { }

  ngOnInit() {
  }
}
