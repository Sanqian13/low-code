import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Constants } from 'src/app/commons/constants';
import { legendIconHeight, legendIconWidth, tooltipShadow, tooltipBackgroundColor } from "src/app/commons/chartStyle";

@Component({
  selector: 'app-chart-bar',
  template: `
    <ng-container *ngIf="!loading&&isData== 0">
        <app-empty></app-empty>
    </ng-container>
    <ng-container *ngIf="loading&&isData== 0">
    <nz-spin [nzSpinning]="loading"></nz-spin>
    </ng-container>
    <ng-container *ngIf="isData== 1">
        <div echarts [options]="barChartOption" class="chart-body height-full"></div>
    </ng-container>`
})
export class ChartBarComponent implements OnInit, OnChanges {
  @Input() barDatas = [];
  @Input() loading = false;
  @Input() legendData = ['媒体发文量', '敏感信息量']
  @Input() minHeight = 160;
  colorList = [
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [{
        offset: 0, color: 'rgba(5, 179, 179, 0.3)' // 0% 处的颜色
      }, {
        offset: 1, color: '#46ECEE' // 100% 处的颜色
      }],
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [{
        offset: 0, color: 'rgba(221, 182, 39, 0.31)' // 0% 处的颜色
      }, {
        offset: 1, color: '#DDB627' // 100% 处的颜色
      }],
    }
  ];
  yAxisData = ['商业媒体', '地市级媒体', '省级媒体', '央级媒体'];
  barChartOption;

  isShow = true;
  isData = 0;

  constructor() { }

  ngOnChanges(): void {
    const _this = this;
    if (this.barDatas && this.barDatas.length > 0) {
      this.isData = 1;
      const series = _this.handleSeries();
      let lengendData = [];
      this.barDatas.forEach(item => {
        item.data = item.data.reverse();
        lengendData.push(item.name);
      })
      this.barChartOption = {
        baseOption: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            padding: [10, 15, 10, 15],
            confine: true,
            backgroundColor: tooltipBackgroundColor,
            textStyle: {
              color: '#E3F4F7',
              fontWeight: 300,
              lineHeight: 22
            },
            extraCssText: tooltipShadow
          },
          legend: {
            show: true,
            itemWidth: legendIconWidth,
            itemHeight: legendIconHeight,
            top: 20,
            right: 0,
            textStyle: {
              color: "#A9B8CA",
              fontSize: 14,
              fontWeight: 300,
            },
            data: _this.legendData
          },
          grid: {
            left: '3%',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, '15%'],  // 最小值和最大值延伸范围
            axisLine: { //坐标轴轴线 默认 true,
              show: true,
              lineStyle: {
                color: 'rgba(49, 74, 101, .7)',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: { //坐标轴刻度
              show: false,
              lineStyle: {
                color: '#888',
                width: 1,
                type: 'solid'
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: { //坐标轴刻度标签
              show: true,
              //rotate: 30,  //旋转角度
              textStyle: {
                color: '#B6C1CD',
                fontSize: 12,
                fontWeight: 300
              }
            }
          },
          yAxis: {
            type: 'category',
            axisLine: { //坐标轴轴线 默认 true,
              show: true,
              lineStyle: {
                color: '#314A65',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: { //坐标轴刻度
              show: false,
              lineStyle: {
                color: '#888',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: { //坐标轴刻度标签
              show: true,
              textStyle: {
                color: '#DBEDFB',
                fontSize: 12,
                fontWeight: 300
              }
            },
            data: this.yAxisData
          },
          series
        },
        media: [ // 这里定义了 media query 的逐条规则。
          {
            query: {}, // 这里写规则。
            option: { // 这里写此规则满足下的option。

              textStyle: {
                fontSize: Constants.countSize(0.7),
              },
              xAxis: {
                axisLabel: {
                  textStyle: {
                    fontSize: Constants.countSize(0.7),
                  },
                }
              }
            }
          },
          {
            query: {
              minHeight: this.minHeight
            }, // 第二个规则。
            option: { // 这里写此规则满足下的option。
              textStyle: {
                fontSize: Constants.countSize(0.8),
              },
              xAxis: {
                axisLabel: {
                  textStyle: {
                    fontSize: Constants.countSize(0.8),
                  },
                }
              }
            }
          }

        ]
      };
    } else {
      this.isData = 0
    }
  }

  ngOnInit() {

  }

  handleSeries() {
    let result = [];
    let maxValue = [];
    // 计算y轴单行总量
    this.barDatas.forEach(item => {
      item.data.forEach((item, index) => {
        if (!maxValue[index]) {
          maxValue[index] = 0;
        }
        if (item) {
          maxValue[index] += item;
        }
      })
    })
    maxValue = maxValue.reverse();
    // 添加series堆叠bar
    this.barDatas.forEach((ele, index) => {
      let obj = {
        name: ele.name,
        type: 'bar',
        stack: '总量',
        barWidth: Constants.countSize(0.7),
        showBackground: true,
        backgroundStyle: {
          color: '#20262F',
        },
        itemStyle: {
          normal: {
            color: this.colorList[index],
            opacity: 0.8
          }
        },
        data: ele.data
      };
      // 最后一个series bar右侧添加总量label
      if (index == this.barDatas.length - 1) {
        Object.assign(obj, {
          label: {
            show: true,
            position: 'right',
            distance: 5,
            color: '#3DC4DA',
            formatter: (params) => {
              return maxValue[params.dataIndex];
            }
          }
        })
      }
      result.push(obj)
    })
    return result;
  }


}
