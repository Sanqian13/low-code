import {
    Component,
    OnInit,
    Input,
    SimpleChanges,
    OnChanges,
} from "@angular/core";
import { globalColorOrange } from "src/app/commons/chartStyle";
import { Constants } from "../../commons/constants";

@Component({
    selector: "app-chart-pie1",
    template: `
      <div class="text-center hull flex-flow-center">
        <div
          class="chart-animation chart-animation-circle"
        >
          <div
            echarts
            [options]="pieChartOption"
            class="chart-body"
            style="height: 100%;width: 100%"
          ></div>
        </div>
      </div>
    `,
})
export class ChartPie1Component implements OnInit, OnChanges {
    @Input() value = '20';
    @Input() title = "开通数";
    @Input() titleShow = true; // 可选择设置标题
    @Input() colorList = []; // 设置颜色
    @Input() center = ["50%", "50%"]; // 可设置图形位置
    @Input() radius = ["70%", "85%"]; // 可设置图形大小
    subValue = 100;
    pieChartOption: any;

    constructor() { }
    ngOnChanges(changes: SimpleChanges): void {
        const $this = this;
        this.pieChartOption = {
            textStyle: {
                color: "#b6c1cd",
            },
            title: {
                show: true,
                text: this.title,
                textStyle: {
                    fontSize: Constants.countSize(0.7),
                    fontWeight: 400,
                    color: "#DCEDFB"
                },
                left: 'center',
                bottom: '20%'
            },
            series: [
                {
                    name: "同比",
                    type: "pie",
                    radius: this.radius,
                    center: this.center,
                    silent: true,
                    z: 0,
                    zlevel: 0,
                    label: {
                        normal: {
                            show: false,
                            position: "center",
                        },
                    },
                    data: [
                        {
                            value: parseFloat(this.value),
                            name: this.title,
                            label: {
                                normal: {
                                    show: true,
                                    formatter(params: { name: string; value: number }) {
                                        return params.value + '%';
                                    },
                                    position: 'center',
                                    textStyle: {
                                        fontSize: Constants.countSize(1.1),
                                        fontWeight: 500,
                                        color: "#F7B023",
                                        align: "center",
                                    },
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: globalColorOrange,
                                },
                            },
                        },
                        {
                            value: 100 - parseFloat(this.value),
                            name: "",
                            label: {
                                normal: {
                                    show: false,
                                },
                            },
                            itemStyle: {
                                normal: {
                                    color: "rgba(41, 48, 61, 0.48)",
                                },
                            },
                        },
                    ],
                },
            ],
        };
    }
    ngOnInit() { }
}
