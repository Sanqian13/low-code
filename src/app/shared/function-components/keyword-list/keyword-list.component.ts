import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-keyword-list",
  templateUrl: "./keyword-list.component.html",
  styleUrls: ["./keyword-list.component.less"],
})
export class KeywordListComponent implements OnInit, OnChanges {
  @Input() zmKeywordData = [];
  @Input() fmKeywordData = [];
  @Input() loading = false;
  @Input() height = '100%';
  @Input() mode = 1;  // 1 正负面都显示 2 只显示正面 3 只显示负面
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.handleData(this.zmKeywordData);
    this.handleData(this.fmKeywordData);
  }

  handleData(arr) {
    if (arr && arr.length && arr.length < 9) {
      const len = 9 - arr.length;
      for (let i = 0; i < len; i++) {
        arr.push({
          name: '占位',
          value: 0
        })
      }
    }
  }

  ngOnInit() {
  }
}
