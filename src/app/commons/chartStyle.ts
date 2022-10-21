import { Constants } from "./constants";

/**
 * echarts 图表公共样式
 */
export let splitLineStyle = { // 坐标轴分割线样式
  lineStyle: {
    type: "dotted",
    color: ["#2A4A68"],
    opacity: 0.7,
  },
};
export let splitLineStyle2 = {
  type: "solid",
  color: ["#1f2558"],
  opacity: 0.7,
};
// 渐变颜色--orange
export let globalColorOrange = {
  type: "linear",
  1: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: "#EFD429", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#F8AA0E", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
// 渐变颜色--蓝色
export let globalColorBlue = {
  type: "linear",
  x: 1,
  y: 0,
  x2: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#32b4ff", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#57dde9", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
export let globalColorBlue2 = "rgba(29, 255, 247, 1)";
export let globalColorOrange2 = "rgba(239, 212, 41, 1)";
export let globalColorBlue3 = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: "#0d49ff", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#b25cff", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
// 紫色渐变
export let globalColorViolet = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: "#2e00ff", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#dd00ff", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};

export let globalColorViolet2 = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: "#a15aff", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#1549ff", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
export let globalColorYellow = {
  type: "linear",
  x: 1,
  y: 0,
  x2: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#f8aa0e", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#f2d82b", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
export let globalColorPink = {
  type: "linear",
  x: 1,
  y: 0,
  x2: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#E35E50", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#FA897D", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};

export let globalColorGreen = {
  type: "linear",
  x: 1,
  y: 0,
  x2: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#15637a", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#0bed90", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};

export let globalColorGreenOpp = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 1,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#15637a", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#0bed90", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};

// 青色渐变
export let globalColorCyan = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 1,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#00c9c7", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#58dbe7", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};

// 青色渐变2
export let globalColorCyan2 = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 1,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#0c6e93", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#3debff", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};

export let globalColorRed = {
  type: "linear",
  x: 1,
  y: 0,
  x2: 0,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#f64b40", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#f17c73", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
// 黄色渐变
export let globalColorYellow2 = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: "#e84002", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#f2c939", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
// 青色渐变
export let globalColorCyan3 = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 1,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#00ffe4", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#00b4fd", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
// 蓝色渐变
export let globalColorBlue4 = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 1,
  y2: 0,
  colorStops: [
    {
      offset: 0,
      color: "#00b9ff", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#0077ff", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
// 渐变颜色 蓝色
export let ColorTransparent = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: "rgba(0,0,0,0)", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "rgba(0,0,0,0)", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};

// 类型颜色组
export let globalColor1 = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: "#6ED1E8", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#66C2D7", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
export let globalColor2 = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: "#3D74B8", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#62A8FC", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
export let globalColor3 = {
  type: "linear",
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [
    {
      offset: 0,
      color: "#20A69B", // 0% 处的颜色
    },
    {
      offset: 1,
      color: "#32D9CB", // 100% 处的颜色
    },
  ],
  globalCoord: false, // 缺省为 false
};
export let textColor2 = "#8dd5ff";
export let legendIconSize = Constants.countSize(0.25);
export let legendIconWidth = Constants.countSize(0.6);
export let legendIconHeight = Constants.countSize(0.3);
export let textColor = "#94a1b0"; // 图标文字基础颜色
export let lineColorList = ["#54D2DD", "#EFD429"];
export let pieColorList = [
  "#6ED1E8",
  "#3D74B8",
  "#32D9CB",
  "#F0DC59",
  "#EE9133",
  "#E772B1",
  "#BDDD4E",
];


// 六元情绪颜色
export let emotionColorList = ['#29BCC0', '#5BC0F1', '#13B681', '#C57F31', '#DFC042', '#6E98B9'];

// tooltip shadow
export let tooltipShadow = 'box-shadow: 0 4px 10px -4px rgba(199, 206, 215, .7);border-radius: 3px;';
// tooltip background color
export let tooltipBackgroundColor = 'rgba(41, 49, 64, 0.4)';
