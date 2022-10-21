import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Constants } from "src/app/commons/constants";

@Component({
    selector: "app-pie",
    template: `
    <ng-container *ngIf="!loading && isData == 0">
      <app-empty></app-empty>
    </ng-container>
    <ng-container *ngIf="loading">
      <nz-spin [nzSpinning]="loading" style="width:100%;height:100%;"></nz-spin>
    </ng-container>
    <ng-container *ngIf="!loading && isData == 1">
      <div
        echarts
        [options]="pieChartOption"
        class="chart-body pie-animation pie-health-animation"
        style="width: 100%; height: 100%;"
      ></div>
    </ng-container>
  `,
})
export class ChartPieComponent implements OnInit, OnChanges {
    @Input() loading = false;
    @Input() colorList = [
        "#3EA5BB",
        "#E4BC45",
    ]; // 设置颜色
    @Input() chartData = [];
    @Input() name = '传播健康度';   // 图表名称

    @Input() center = ["50%", "50%"]; // 可设置图形位置
    @Input() radius = [Constants.countSize(3.5), Constants.countSize(4.83)]; // 外圈半径
    @Input() insideRadius = [Constants.countSize(3.5), Constants.countSize(4.15)]; // 内圈透明半径
    @Input() left = 'center'; // 饼图背景离左边距离

    isData = 0;
    pieChartOption: any;
    base64ImageBg = '/assets/images/bg/pie-health-bg.png';
    // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOMAAADjCAMAAABAUFN+AAAAXVBMVEUAAAAxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUxSmUvLZ5jAAAAHnRSTlMA8A/uBRYR0szUxFj6tgxCUSLq4XJjqj6if+CRjkA+qyc5AAABTElEQVR42u3WW27bMBBAUdqh6ock23VtJ+lj9r/MUokEtNYOJucAEjifFyQklkn99qmWJFZB/T5mfUniHLPdvUx+Rwwvny4lidc5aIh4a+MlhnuaM/qs9ptoOznGrSR2j10p1+hKYnWIWjaxLZm1vrnx+NIc09TWcer5+X/jLiIOiQ7t6RgRm6fGXIlT5LoxWeIUuWrMljhFPjU+0iW2yHFpfD3Xtkp50zm1p/WlbAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvphLX9t7WxLaLn2bmJbj95JOdyxN65sbdz/SRXaHzVNjZIvsDrFqTBbZEteNuSJb4qrxsW8ep5JEfds3/3xzUv43PiyN1+hKYnWIWsZ4L4ndYl/KOYb3tDvZ3YboP0oXbUziHLH4VSZ/xmvWxut4adNf/YkVfb9dlXQAAAAASUVORK5CYII=";

    constructor() { }
    ngOnInit() { }

    ngOnChanges(): void {
        if (this.chartData && this.chartData.length > 0) {
            const $this = this;
            this.isData = 1;
            const { data, insideData } = this.handleData();
            this.pieChartOption = {
                title: {
                    show: true,
                    text: this.name,
                    textStyle: {
                        fontSize: Constants.countSize(0.8),
                        fontWeight: 500,
                        color: "#DCEDFB"
                    },
                    left: 'center',
                    top: 'center'
                },
                color: this.colorList,
                tooltip: {
                    trigger: "item",
                    formatter: (param) => {
                        if (param.data && param.data.name && param.data.prop) {
                            return param.data.name + ':' + param.data.prop;
                        }
                        return '';
                    },

                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    padding: [10, 15, 10, 15],
                    confine: true,
                    backgroundColor: 'rgba(41, 49, 64, 0.4)',
                    textStyle: {
                        color: '#E3F4F7',
                        fontWeight: 300,
                        lineHeight: 22
                    },
                    extraCssText: 'box-shadow: 0 4px 10px -4px rgba(199, 206, 215, .7);border-radius: 3px;'
                },
                legend: {
                    show: false
                },
                series: [
                    {
                        type: "pie",
                        name: $this.name,
                        radius: $this.radius,
                        center: $this.center,
                        label: {
                            show: false,
                        },
                        data
                    },
                    // 内圈透明半径
                    {
                        radius: $this.insideRadius,
                        center: $this.center,
                        type: "pie",
                        label: {
                            show: false,
                        },
                        labelLine: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false,
                            },
                        },
                        animation: false,
                        tooltip: {
                            show: false,
                        },
                        data: insideData,
                    },
                ],
                graphic: [
                    {
                        type: "image", // 图形元素类型
                        top: "center", // 根据父元素进行定位 （居中）
                        left: $this.left,
                        style: {
                            image: $this.base64ImageBg, // base64背景图
                            width: Constants.countSize(12.3),
                            height: Constants.countSize(8),
                        },
                    },
                ],
            };
        }
    }


    handleData() {
        const holderValue = this.chartData.reduce((a, b) => {
            return a + b.value
        }, 0) * 0.02;
        const occupiedHolderStyle = {
            value: holderValue,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    color: "#191E27",
                    borderColor: "#191E27",
                },
            },
        }
        const data = [];
        const insideData = [];
        this.chartData.forEach((item, index) => {
            data.push(
                {
                    value: item.value,
                    name: item.name,
                    prop: item.proportion,
                    itemStyle: {
                        color: this.colorList[index],
                    }
                },
                occupiedHolderStyle,
            )
            insideData.push(
                {
                    value: item.value,
                    itemStyle: {
                        color: "rgba(0,0,0,0.65)",
                    },
                },
                occupiedHolderStyle,
            )
        })
        return { data, insideData };
    }

}
