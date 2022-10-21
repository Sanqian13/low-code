import {
  Component,
  OnInit,
  Input,
  OnChanges,
  OnDestroy,
} from "@angular/core";
import {
  splitLineStyle,
  tooltipShadow,
  tooltipBackgroundColor
} from "src/app/commons/chartStyle";
import * as echarts from "echarts";
import { Constants } from "src/app/commons/constants";
@Component({
  selector: "app-chart-line2",
  template: `
    <ng-container *ngIf="!loading && isData == 0">
      <app-empty></app-empty>
    </ng-container>
    <ng-container *ngIf="isData == 1">
      <div
        echarts
        [options]="ChartOption"
        (chartInit)="onChartInit($event)"
        class="chart-body"
        style="width:100%;height:100%;"
      ></div>
    </ng-container>
    <ng-container *ngIf="loading && isData == 0">
      <nz-spin [nzSpinning]="loading" style="width:100%;height:100%;"></nz-spin>
    </ng-container>
  `,
})
export class ChartLine2Component implements OnInit, OnChanges, OnDestroy {
  @Input() loading = true;
  @Input() colorLists = ["#46ECEE", "#DDB627"]; // 颜色

  // legend
  @Input() legendShow = true; // legend 是否显示
  @Input() legendName = [];  // legend name
  @Input() legendRight = '0';   // 离右侧距离
  @Input() icon = 'rect'; // legend icon

  // tooltip
  @Input() tooltipStyle = 1;  // 1 custom 2 normal

  @Input() xAxis = []; // x轴
  @Input() values = []; // 数据

  // series
  @Input() lineWidth = 1; // 折线宽度
  @Input() showSymbol = false;  // 是否展示symbol
  @Input() areaStyle = 0; // 折线透明度
  @Input() markPoint = 0; // 拐点透明度

  @Input() markLinesShow = false; // 平均线是否显示
  @Input() markLines = 0; // 平均线y轴数值
  @Input() maxHeight = 240; // 最大高度为240以上 媒体查询
  lineY = []; // series处理后数据
  isData = 0;
  ChartOption;
  echartsIntance: any;
  playInterval = null; // tooltip轮播定时器

  constructor() { }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.pausePlay();
    this.echartsIntance = null;
  }

  ngOnChanges(): void {
    if (this.values && this.values.length > 0) {
      this.isData = 1;
      this.lineY = [];
      this.handleSeries();

      const tooltip1 = {
        trigger: "axis",
        backgroundColor: "rgba(26, 30, 38, 0.01)",
        padding: [10, 18],
        textStyle: {
          fontSize: Constants.countSize(0.6),
        },
        formatter(param) {
          if (param[1] && param[1].value && param[1].value !== undefined) {
            const boxhtml =
              '<div' +
              "<p>" +
              param[0].name +
              "<br/>" +
              '<span style="color:#46ECEE;">' +
              param[0].value +
              "</span>" +
              '<span style="color:#E3F4F7;">' +
              "条" +
              "</span>" +
              "<br/>" +
              '<span style="color:#DDB627;">' +
              param[1].value +
              "</span>" +
              '<span style="color:#E3F4F7;">' +
              "条" +
              "</span>" +
              "<br/>" +
              "</p>" +
              "</div>" +
              '<div class="border-style">' +
              "<span></span>" +
              "<span></span>" +
              "<span></span>" +
              "<span></span>" +
              "</div>";
            return boxhtml;
          }
          if (!param[1] || !param[1].value) {
            const boxhtml =
              "<div>" +
              "<p>" +
              param[0].name +
              "<br/>" +
              '<span style="color:#CE9012;">' +
              param[0].value +
              "</span>" +
              '<span style="color:#E3F4F7;">' +
              "条" +
              "</span>" +
              "<br/>" +
              "</p>" +
              "</div>" +
              '<div class="border-style">' +
              "<span></span>" +
              "<span></span>" +
              "<span></span>" +
              "<span></span>" +
              "</div>";
            return boxhtml;
          }
        },
      }
      const tooltip2 = {
        trigger: 'axis',
        padding: [10, 15, 10, 15],
        confine: true,
        backgroundColor: tooltipBackgroundColor,
        textStyle: {
          color: '#E3F4F7',
          fontWeight: 300,
          lineHeight: 22
        },
        extraCssText: tooltipShadow
      }

      this.ChartOption = {
        baseOption: {
          textStyle: {
            fontSize: Constants.countSize(0.6),
            fontWeight: 300,
            color: '#A6B8CC',
          },
          grid: {
            top: '15%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          tooltip: this.tooltipStyle == 1 ? tooltip1 : tooltip2,
          legend: {
            show: this.legendShow,
            top: 0,
            right: this.legendRight,
            icon: this.icon,
            itemGap: 30,
            itemWidth: Constants.countSize(0.6),
            itemHeight: Constants.countSize(0.2),
            textStyle: {
              fontSize: Constants.countSize(0.7),
              color: "#A9B8CA",
            },
            data: this.legendName,
          },
          xAxis: [
            {
              type: "category",
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(42, 74, 104, .7)",
                },
              },
              boundaryGap: false, // 紧挨边缘
              axisLabel: {
                // 坐标轴刻度标签
                show: true,
                textStyle: {
                  fontSize: Constants.countSize(0.6),
                },
                formatter(value) {
                  return isNaN(Date.parse(value)) ? value : echarts.format.formatTime('MM-dd hh', new Date(value));
                }
              },
              data: this.xAxis,
            },
          ],
          yAxis: [
            {
              type: "value",
              splitNumber: 4, // 刻度分割数量
              splitLine: splitLineStyle,
              axisLabel: {
                // 坐标轴刻度标签
                show: true,
                textStyle: {
                  fontSize: Constants.countSize(0.6),
                },
                formatter(value: number) {
                  if (value >= 10000) {
                    return value / 1000 + 'k';
                  } else {
                    return value;
                  }
                },
              },
            },
          ],
          color: this.colorLists,
          series: this.lineY,
        },
        // media: [
        //   // 这里定义了 media query 的逐条规则。
        //   {
        //     query: {
        //       maxHeight: this.maxHeight,
        //     }, // 第二个规则。
        //     option: {
        //       // 这里写此规则满足下的option。
        //       textStyle: {
        //         fontSize: Constants.countSize(0.8),
        //       },
        //       xAxis: {
        //         axisLabel: {
        //           textStyle: {
        //             fontSize: Constants.countSize(0.8),
        //           },
        //         },
        //       },
        //       yAxis: {
        //         axisLabel: {
        //           textStyle: {
        //             fontSize: Constants.countSize(0.8),
        //           },
        //         },
        //       },
        //     },
        //   },
        // ],
      };

      this.handleMarkLines();
      this.autoPlay();
    } else {
      this.isData = 0;
    }
  }

  handleSeries() {
    // 数据转换
    for (let i = 0; i < this.legendName.length; i++) {
      const data = {
        name: this.legendName[i],
        type: "line",
        smooth: true,
        showSymbol: this.showSymbol,
        // symbol: 'circle', // 圆圈
        // symbolSize: 6,
        markPoint: {
          symbol: "triangle",
          symbolRotate: "180",
          itemStyle: {
            color: this.colorLists[i],
            shadowBlur: 8,
            shadowColor: "rgba(0,0,0,0.5)",
            opacity: this.markPoint,
          },

          symbolSize: [6, 5], // 容器大小
          symbolOffset: [0, -10], // 位置偏移
        },
        lineStyle: {
          width: this.lineWidth,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: this.colorLists[i],
                },
                {
                  offset: 1,
                  color: "rgba(58, 234, 226, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
            opacity: this.areaStyle,
          },
        },
        data: this.values[i],
      };
      this.lineY.push(data);
    }
  }

  handleMarkLines() {
    let sum = 0;
    for (let i = 0; i < this.values.length; i++) {
      sum = this.values[i].reduce((prev, cur) => {
        return prev + cur;
      }, 0);
      this.markLines = sum / this.values[i].length;

      if (this.markLinesShow == true) {
        this.lineY[0].markLine = {
          silent: true,
          data: [
            {
              yAxis: this.markLines,
            },
          ],
        };
      }
    }
  }
  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  // 自动轮播
  autoPlay() {
    if (this.playInterval) {
      clearInterval(this.playInterval);
      this.playInterval = null;
    }
    let lastIndex = 0;
    let currentIndex = 0;
    this.playInterval = setInterval(() => {
      if (this.echartsIntance) {
        this.echartsIntance.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: lastIndex,
        });
        this.echartsIntance.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        this.echartsIntance.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        lastIndex = currentIndex;
        ++currentIndex;
        if (currentIndex >= this.xAxis.length) {
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
