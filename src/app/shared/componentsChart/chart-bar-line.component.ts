import { Component, Input, OnChanges, OnInit } from "@angular/core";
import * as echarts from "echarts";
import { Constants } from "src/app/commons/constants";

@Component({
    selector: "app-chart-bar-line",
    template: ` <ng-container *ngIf="!loading && isData == 0">
      <app-empty></app-empty>
    </ng-container>
    <ng-container *ngIf="loading">
      <nz-spin [nzSpinning]="loading" style="width:100%;height:100%;"></nz-spin>
    </ng-container>
    <ng-container *ngIf="!loading && isData == 1">
      <div
        echarts
        [options]="chartOption"
        class="chart-body"
        style="height:100%"
      ></div>
    </ng-container>`,
    styles: [],
})
export class ChartBarLineComponent implements OnInit, OnChanges {
    @Input() barData = [];
    @Input() loading = false;
    constructor() { }
    isData = 0;
    chartOption: any;
    dataZoomShow = true;
    dataZoomEnd = 100;

    ngOnChanges() {
        if (this.barData && this.barData.length > 0) {
            this.isData = 1;
            let preBarData = [];
            let max = 100;
            this.barData.forEach((element) => {
                const number = element.value;
                element.value = parseFloat(element.proportion); // 用百分比作数值大小
                let obj = {
                    name: element.name,
                    value: max,
                    mgPerStr: element.proportion,
                    number
                };
                preBarData.push(obj);
            });

            if (this.barData && this.barData.length > 5) {
                const gpd = (4 / this.barData.length) * 100;
                this.dataZoomShow = true;
                this.dataZoomEnd = Math.floor(gpd);
            }
            this.chartOption = {
                backgroundColor: "#191E27",
                grid: {
                    top: "5%",
                    bottom: -25,
                    right: 10,
                    left: "10%",
                    containLabel: true,
                },
                xAxis: {
                    show: false,
                },
                yAxis: [
                    {
                        show: true,
                        inverse: true,
                        data: this.getArrByKey(this.barData, "name"),
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                            interval: 0,
                            color: "#fff",
                            align: "left",
                            margin: 45,
                        },
                    },
                    {
                        show: true,
                        inverse: true,
                        data: this.getArrByKey(this.barData, "name"),
                        position: "right",
                        axisLine: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                    },
                ],
                dataZoom: [
                    {
                        type: "inside",
                        show: this.dataZoomShow,
                        moveOnMouseMove: true,
                        zoomOnMouseWheel: false,
                        moveOnMouseWheel: true,
                        height: 100,
                        left: "0",
                        yAxisIndex: 0,
                        start: 0,
                        end: this.dataZoomEnd,
                        handleIcon:
                            "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
                        handleSize: "110%",
                        handleStyle: {
                            color: "#d3dee5",
                        },
                        textStyle: {
                            color: "#fff",
                        },
                        borderColor: "#90979c",
                        orient: "vertical",
                        zlevel: 66,
                    },
                    {
                        type: "inside",
                        show: this.dataZoomShow,
                        moveOnMouseMove: true,
                        zoomOnMouseWheel: false,
                        moveOnMouseWheel: true,
                        yAxisIndex: 1,
                        height: 100,
                        left: "0",
                        start: 0,
                        end: this.dataZoomEnd,
                        handleIcon:
                            "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
                        handleSize: "110%",
                        handleStyle: {
                            color: "#d3dee5",
                        },
                        textStyle: {
                            color: "#fff",
                        },
                        borderColor: "#90979c",
                        orient: "vertical",
                        zlevel: 66,
                    },
                ],
                series: [
                    // 柱体末尾光标
                    {
                        name: "icon",
                        type: "pictorialBar",
                        symbol: "image:///assets/images/icon/bar-line-top.png",
                        symbolSize: [Constants.countSize(0.4), Constants.countSize(0.65)],
                        symbolOffset: [2, 0],
                        z: 12,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                color: "red",
                            },
                        },
                        data: this.getSymbolData(this.barData),
                    },
                    // 标号
                    {
                        name: "xuhao",
                        type: "pictorialBar",
                        symbol: "",
                        symbolSize: 0,
                        symbolOffset: 0,
                        z: 1,
                        yAxisIndex: 0,
                        data: this.getSymbolData(this.barData),
                        label: {
                            normal: {
                                show: true,
                                position: [-Constants.countSize(2.25), Constants.countSize(0)],
                                textStyle: {
                                    fontSize: Constants.countSize(0.8),
                                    fontWeight: 400,
                                },
                                color: "#fff",
                                align: "left",
                                margin: Constants.countSize(2.25),
                                rich: {
                                    a1: {
                                        color: "#D5E8FF",
                                        backgroundColor: {
                                            image: "/assets/images/icon/index1.png",
                                        },
                                        width: Constants.countSize(1),
                                        height: Constants.countSize(1),
                                        align: "center",
                                        borderRadius: 2,
                                        fontSize: Constants.countSize(0.8),
                                        fontStyle: "italic",
                                        padding: [0, 2, 0, 0],
                                    },
                                    a4: {
                                        color: "#D5E8FF",
                                        backgroundColor: {
                                            image: "/assets/images/icon/index2.png",
                                        },
                                        width: Constants.countSize(1),
                                        height: Constants.countSize(1),
                                        align: "center",
                                        borderRadius: 2,
                                        fontSize: Constants.countSize(0.8),
                                        fontStyle: "italic",
                                        padding: [0, 2, 0, 0],
                                    },
                                },
                                formatter: function (param: any) {
                                    let index = param.dataIndex + 1;
                                    if (index <= 3) {
                                        return "{a1|" + index + "}";
                                    } else {
                                        return "{a4|" + index + "}";
                                    }
                                },
                            },
                        },
                    },
                    // 末尾值百分比label
                    {
                        name: "pre",
                        type: "pictorialBar",
                        symbol: "",
                        symbolSize: 0,
                        symbolOffset: 0,
                        z: 1,
                        yAxisIndex: 1,
                        data: this.getSymbolData(preBarData),
                        label: {
                            normal: {
                                show: true,
                                position: ["100%", Constants.countSize(0.6)],
                                interval: 0,
                                color: "#72CDF8",
                                align: "right",
                                verticalAlign: "bottom",
                                fontWeight: "400",
                                fontStyle: "italic",
                                fontSize: Constants.countSize(0.8),
                                formatter: function (param: any) {
                                    return param.data.pre;
                                }
                            },
                        },
                    },

                    // 末尾值条数label
                    {
                        name: "pre",
                        type: "pictorialBar",
                        symbol: "",
                        symbolSize: 0,
                        symbolOffset: 0,
                        z: 1,
                        yAxisIndex: 1,
                        data: this.getSymbolData(preBarData),
                        label: {
                            normal: {
                                show: true,
                                position: ["88%", Constants.countSize(0.6)],
                                interval: 0,
                                align: "right",
                                verticalAlign: "bottom",
                                formatter: function (param: any) {
                                    return "{num|" + param.data.number + "}" + "{text|条}";
                                },
                                rich: {
                                    num: {
                                        color: "#3DC4DA",
                                        fontWeight: "400",
                                        fontStyle: "italic",
                                        fontSize: Constants.countSize(0.8),
                                    },
                                    text: {
                                        color: "#BFCBD9",
                                        fontWeight: "400",
                                        fontStyle: "italic",
                                        fontSize: Constants.countSize(0.8),
                                    }
                                }
                            },
                        },
                    },
                    // 柱体
                    {
                        name: "条",
                        type: "bar",
                        showBackground: true,
                        // backgroundStyle: '#212733',
                        barBorderRadius: Constants.countSize(1),
                        yAxisIndex: 0,
                        data: this.barData,
                        barWidth: Constants.countSize(0.45),
                        // align: left,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    1,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(5, 179, 179, 0.3)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(70, 236, 238, 1)",
                                        },
                                    ],
                                    false
                                ),
                                barBorderRadius: Constants.countSize(0.5),
                            },
                            barBorderRadius: Constants.countSize(0.1),
                        },
                        label: {
                            show: true,
                            color: "#BFCBD9",
                            position: [0, -Constants.countSize(1.6)],
                            textStyle: {
                                fontSize: Constants.countSize(0.8),
                                fontWeight: 300,
                            },
                            formatter: function (a: { name: any }, b: any) {
                                if (a.name.length > 26 && a.name.length < 52) {
                                    a.name = a.name.substring(0, 26) + '\n' + a.name.substring(26, a.name.length);
                                } else if (a.name.length >= 52) {
                                    a.name = a.name.substring(0,28) + '\n' + a.name.substring(28, 52) + '...'
                                }
                                return a.name;
                            },
                        },
                    },
                ],
            };
        }
    }

    getArrByKey(data: any[], k: string) {
        let key = k || "value";
        let res: any[] = [];
        if (data) {
            data.forEach(function (t) {
                res.push(t[key]);
            });
        }
        return res;
    }

    getSymbolData(data: string | any[]) {
        let arr = [];
        for (var i = 0; length = data.length, i < length; i++) {
            arr.push({
                value: data[i].value,
                pre: data[i].mgPerStr,
                symbolPosition: "end",
                number: data[i].number
            });
        }
        return arr;
    }

    ngOnInit() { }
}
