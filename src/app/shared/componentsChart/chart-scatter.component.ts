import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { legendIconSize } from 'src/app/commons/chartStyle';
import * as echarts from 'echarts';
import { Constants } from 'src/app/commons/constants';
import { hexToRgba } from 'src/app/shared/utils/public-function';


@Component({
    selector: 'app-chart-scatter',
    template: `
    <ng-container *ngIf="!loading && isData== 0">
        <app-empty></app-empty>
    </ng-container>
    <ng-container *ngIf="loading">
        <nz-spin [nzSpinning]="loading" style="width: 100%; height: 100%"></nz-spin>
    </ng-container>
    <ng-container *ngIf="isData== 1 && !loading">
    <div echarts [options]="chartOption" class="chart-body" style="width: 100%; height: 100%;" (chartInit)="onChartInit($event)"></div>
    </ng-container>`
})
export class ChartScatterComponent implements OnInit, OnChanges {
    @Input() loading = false;

    @Input() colorList = ['#5BC0F1', '#29BCC0', '#13B681', '#C57F31', '#DFC042', '#6E98B9', '#5D75A7'];
    @Input() xAxis = []; // 时间轴

    @Input() data = [];
    @Input() legendData = [];
    @Input() minHeight = 230;

    isData = 0;
    chartOption;
    echartsIntance: any;
    playInterval = null; // tooltip轮播定时器

    constructor() { }
    ngOnInit() {
    }
    ngOnDestroy(): void {
        this.pausePlay();
        this.echartsIntance = null;
    }
    ngOnChanges(): void {
        const _this = this;
        // 数据转换
        if (this.data.length > 0) {
            this.isData = 1;
            _this.chartOption = {
                baseOption: {
                    color: this.colorList,
                    textStyle: {
                        color: '#94a1b0'
                    },
                    tooltip: {
                        trigger: 'item',
                        position: function (point, params, dom, rect, size) {
                            // 固定在顶部
                            const x = point[0] - (size.contentSize[0] / 2);
                            const y = point[1] - size.contentSize[1] - 50;
                            return [x, y];
                        },
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        formatter(obj) {
                            // return obj.data[3] + '<br/>' + '热度峰值：' + obj.value[1];
                            const boxHtml = `
                                <div class="myTooltip">
                                    <span class="pos"></span>
                                    <div class="myTooltipBody">
                                        <div class="label">${obj.data[3]}</div>
                                        <div class="text">热度峰值:<span class="num">${obj.value[1]}</span></div>
                                  </div>
                                </div>
                            `
                            return boxHtml;
                            // '<div' +
                            // "<p>" +
                            // param[0].name +
                            // "<br/>" +
                            // '<span style="color:#46ECEE;">' +
                            // param[0].value +
                            // "</span>" +
                            // '<span style="color:#E3F4F7;">' +
                            // "条" +
                            // "</span>" +
                            // "<br/>" +
                            // '<span style="color:#DDB627;">' +
                            // param[1].value +
                            // "</span>" +
                            // '<span style="color:#E3F4F7;">' +
                            // "条" +
                            // "</span>" +
                            // "<br/>" +
                            // "</p>" +
                            // "</div>" +
                            // '<div class="border-style">' +
                            // "<span></span>" +
                            // "<span></span>" +
                            // "<span></span>" +
                            // "<span></span>" +
                            // "</div>";
                        }
                    },
                    legend: {
                        right: 'center',
                        itemWidth: legendIconSize,
                        itemHeight: legendIconSize,
                        textStyle: {
                            color: '#B6C1CD',
                            fontSize: Constants.countSize(0.6),
                            fontWeight: 300,
                        },
                        data: this.legendData
                    },
                    grid: {
                        left: '3%',
                        right: '7%',
                        bottom: '3%',
                        top: '10%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'time',
                        boundaryGap: ['5%', '20%'],
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: 'rgba(40, 80, 95, 1)',
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(42, 74, 104, .7)',
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                fontSize: Constants.countSize(0.6),
                            },
                            formatter(value) {
                                return echarts.format.formatTime('MM-dd', new Date(value));
                            }
                        },
                        // data: this.xAxis
                    },
                    yAxis: {
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed', // 线的类型
                                color: 'rgba(42, 74, 104, .7)',
                            }
                        },
                        min: 0,
                        boundaryGap: false,
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            margin: Constants.countSize(1),
                            textStyle: {
                                fontSize: Constants.countSize(0.6),
                            },
                        },
                        scale: true
                    },
                    series: _this.handleData()
                },
                // media: [ // 这里定义了 media query 的逐条规则。
                //     {
                //         query: {}, // 这里写规则。
                //         option: { // 这里写此规则满足下的option。
                //             textStyle: {
                //                 fontSize: Constants.countSize(0.6),
                //             },
                //             xAxis: {
                //                 axisLabel: {
                //                     textStyle: {
                //                         fontSize: Constants.countSize(0.6),
                //                     },
                //                 }
                //             },
                //             yAxis: {
                //                 axisLabel: {
                //                     textStyle: {
                //                         fontSize: Constants.countSize(0.6),
                //                     },
                //                 }
                //             }
                //         }
                //     },
                //     {
                //         query: {
                //             minHeight: this.minHeight
                //         }, // 第二个规则。
                //         option: { // 这里写此规则满足下的option。
                //             textStyle: {
                //                 fontSize: Constants.countSize(0.7),
                //             },
                //             xAxis: {
                //                 axisLabel: {
                //                     textStyle: {
                //                         fontSize: Constants.countSize(0.7),
                //                     },
                //                 }
                //             },
                //             yAxis: {
                //                 axisLabel: {
                //                     textStyle: {
                //                         fontSize: Constants.countSize(0.7),
                //                     },
                //                 }
                //             }
                //         }
                //     }
                // ]
            }
            if (this.echartsIntance) {
                this.echartsIntance.clear();
                this.echartsIntance.setOption(_this.chartOption, true);
                this.autoPlay();
            }
        }
    }
    onChartInit(ec) {
        this.echartsIntance = ec;
    }

    handleData() {
        const scatterSeries = [];

        this.data.forEach((item, i) => {
            const randomColorIndex = Math.floor(Math.random() * 6);
            const series = {
                name: '传播热力图',
                data: [item],
                type: 'scatter',
                symbolSize(data) {
                    return data[2];
                },
                emphasis: {
                    label: {
                        show: false,
                    }
                },
                itemStyle: {
                    color: hexToRgba(this.colorList[randomColorIndex], .4),
                    borderColor: this.colorList[randomColorIndex],
                    shadowColor: this.colorList[randomColorIndex],
                    borderWidth: 1,
                    shadowBlur: 20,
                    shadowOffsetY: 4,
                }
            }
            scatterSeries.push(series);
        })

        return scatterSeries;
    }

    // 自动轮播
    autoPlay() {
        if (this.playInterval) {
            this.pausePlay();
        }
        let lastIndex = 0;
        let currentIndex = 0;
        this.playInterval = setInterval(() => {
            if (this.echartsIntance) {
                this.echartsIntance.dispatchAction({
                    type: 'downplay',
                    seriesIndex: lastIndex,
                    dataIndex: 0,
                });
                this.echartsIntance.dispatchAction({
                    type: 'highlight',
                    seriesIndex: currentIndex,
                    dataIndex: 0,
                });
                this.echartsIntance.dispatchAction({
                    type: 'showTip',
                    seriesIndex: currentIndex,
                    dataIndex: 0,
                });
                lastIndex = currentIndex;
                ++currentIndex;
                if (currentIndex >= this.data.length) {
                    currentIndex = 0;
                }
            }
        }, 10 * 1000);
    }

    pausePlay() {
        clearInterval(this.playInterval);
        this.playInterval = null;
    }

}
