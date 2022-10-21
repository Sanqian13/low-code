import { Component, Input, OnInit } from "@angular/core";
import { permission } from 'src/app/commons/permission';
@Component({
  selector: "app-wrd-screen-time",
  templateUrl: "./wrd-screen-time.component.html",
  styleUrls: [],
})
export class WrdScreenTimeComponent implements OnInit {
  @Input() contentHeight = "calc(100% - 0rem)";

  pagePermission = permission.page;
  constructor() {
  }

  ngOnDestroy() {

  }
  ngOnInit(): void {

  }
}
