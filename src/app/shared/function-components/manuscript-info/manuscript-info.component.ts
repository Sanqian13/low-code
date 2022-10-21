import {
  Component,
  OnInit,
  Input
} from "@angular/core";


@Component({
  selector: "app-manuscript-info",
  templateUrl: "./manuscript-info.component.html",
  styleUrls: ["./manuscript-info.component.less"],
})
export class ManusriptInfoComponent implements OnInit {

  constructor() { }

  @Input() title: string = '';  // 稿件标题
  @Input() date = ''; // 稿件发布日期
  @Input() source: string = ''; // 稿件来源
  @Input() showBottom = true; // 是否显示底部

  ngOnInit() {
  }
}
