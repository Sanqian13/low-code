import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Constants } from 'src/app/commons/constants';

@Component({
    selector: "app-chart-gender-bar",
    template: `
    <ng-container *ngIf="!loading && isData == 0">
      <app-empty></app-empty>
    </ng-container>
    <ng-container *ngIf="loading">
      <nz-spin [nzSpinning]="loading" style="width:100%;height:100%;"></nz-spin>
    </ng-container>
    <ng-container *ngIf="!loading && isData == 1">
    <div class="rel" style="width: 100%; height: 100%;">
      <div
        echarts
        [options]="chartOption"
        class="chart-body pie-animation pie-animation2"
        style="width: 100%; height: 100%;"
      >
      </div>
      <div class="abs gender-legend fz14 fw300">
        <div class="flex-center mr20">
          <img class="gender-icon" [src]="maleImg.icon" alt="男性">
          男性：<span class="total-num-color">{{genderPer[0]}}</span>
        </div>
        <div class="flex-center">
          <img class="gender-icon" [src]="femaleImg.icon" alt="女性">
          女性：<span class="total-num-color">{{genderPer[1]}}</span>
        </div>
       </div>
    </div>
    </ng-container>
  `,
    styles: [
        `
        .gender-legend {
            width: 100%;
            color: #DCEDFB;
            bottom: 1.5rem;
            display: flex;
            justify-content: center;
        }
        .gender-icon {
            width: 1.43rem;
            height: 1.43rem;
            margin-right: 0.3rem;
        }
    `
    ]
})
export class ChartGenderBarComponent implements OnInit, OnChanges {
    @Input() loading = false;
    @Input() colorList = [  // 设置颜色
        "#F2749E",
        "#5BC0F1",
    ];
    @Input() chartData = [];
    symbolSize = [Constants.countSize(1.1), Constants.countSize(2.5)];
    maleImg = {
        a: '/assets/images/gender/male.png',
        b: '/assets/images/gender/male-bg.png',
        icon: '/assets/images/gender/male-icon.png'
    }
    femaleImg = {
        a: '/assets/images/gender/female.png',
        b: '/assets/images/gender/female-bg.png',
        icon: '/assets/images/gender/female-icon.png'
    }

    isData = 0;
    chartOption: any;
    genderPer = ['0%', '0%'];

    constructor() { }
    ngOnInit() { }

    ngOnChanges(): void {
        if (this.chartData && this.chartData.length > 0) {
            const $this = this;
            this.isData = 1;
            const total = this.chartData[0].value + this.chartData[1].value;
            if (total == 0) {
                this.genderPer = ['0%', '0%'];
            } else {
                const malePer = Math.round((this.chartData[0].value / total) * 100);
                const femalePer = 100 - malePer;
                this.genderPer[0] = `${malePer}%`;
                this.genderPer[1] = `${femalePer}%`;
            }


            this.chartOption = {
                color: this.colorList,
                grid: {
                    left: Constants.countSize(2.6),
                    top: Constants.countSize(1.75),
                    right: Constants.countSize(1.2),
                    bottom: Constants.countSize(4.8),
                    containLabel: true,
                },
                legend: {
                    show: false,
                },
                xAxis: {
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                },
                yAxis: [
                    {
                        type: "category",
                        inverse: false,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        z: 1,
                        type: "pictorialBar",   // 象形柱
                        symbolSize: this.symbolSize,
                        symbolRepeat: "fixed",
                        name: '女性',
                        data: [
                            {
                                value: 100,
                                symbol: "image://" + this.femaleImg.b,
                            },
                            {
                                value: 100,
                                symbol: "image://" + this.maleImg.b,
                            },
                        ],
                    },
                    {
                        z: 2,
                        type: "pictorialBar",
                        name: '男性',
                        symbolSize: this.symbolSize,
                        animation: true,
                        symbolRepeat: "fixed",
                        symbolClip: true,
                        symbolPosition: "start",
                        symbolOffset: [0, 0],
                        data: [
                            {
                                value: (this.chartData[1].value / total) * 100,
                                symbol: "image://" + this.femaleImg.a,
                            },
                            {
                                value: (this.chartData[0].value / total) * 100,
                                symbol: "image://" + this.maleImg.a,
                            },
                        ],
                    },
                    {
                        type: "bar",
                    },
                ]
            };
        }
    }

}
