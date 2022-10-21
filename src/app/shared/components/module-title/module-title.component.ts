import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-module-title",
  templateUrl: "./module-title.component.html",
})
export class ModuleTitleComponent implements OnInit {
  @Input() title = "";
  @Input() marginBottom = '0';
  constructor() {}

  ngOnInit() {}
}
