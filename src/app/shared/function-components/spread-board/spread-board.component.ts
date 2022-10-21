import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "app-spread-board",
  templateUrl: "./spread-board.component.html",
  styleUrls: ["./spread-board.component.less"],
})
export class SpreadBoardComponent implements OnInit {
  @Input() spreadHot = 0;
  @Input() totalNum = 0;
  @Input() sensitiveProportion = '0%';
  @Input() loading = false;
  constructor() { }

  ngOnInit() {
  }
}
