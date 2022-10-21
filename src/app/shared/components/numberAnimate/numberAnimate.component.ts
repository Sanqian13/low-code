import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { map } from 'rxjs/operators';
import { ChangeFilter } from 'src/app/shared/utils/change-filter';

declare let $: any;
@Component({
  // tslint:disable-next-line: component-selector
  selector: "app-numberAnimate",
  template: `
    <div class="numberRun text-center inline-block" [id]="numberRunID"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberAnimateComponent implements OnInit, OnChanges, OnDestroy {
  @Input() nums = 0;
  @Input() numberRunID = "";
  @Input() numName: any;
  @Input() dot = 0; // 小数点
  @Input() percentage = false;  // 是否是百分比
  numRun: any;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const filter = ChangeFilter.of(changes);
    const _this = this;
    filter.has<number>('nums').subscribe(value => {
      _this.numRun = $("#" + _this.numberRunID).numberAnimate({
        num: value + "",
        speed: 1000,
        dot: _this.dot,
        percentage: _this.percentage
      });
    })
  }
  ngOnInit() { }
  ngOnDestroy(): void {
    this.numRun = null;
  }

}
