
const allocationConfig = {
    LineGraph: [
        { key: "base", value: "基础折线图" },
        { key: "hv", value: "阶梯折线图" },
    ],
    BarGraph: [
        { key: "base", value: "基础柱状图" },
        { key: "fenzu", value: "分组柱状图" },
        { key: "duidie", value: "堆叠柱状图" },
    ],
    PieGraph: [
        { key: "base", value: "基础饼图" },
        { key: "circle", value: "基础环图" },
        { key: "multiple", value: "双层饼图" },
        { key: "nightingale", value: "南丁格尔玫瑰环图" },
    ],
    PointGraph: [
        { key: "base", value: "散点图" },
        { key: "bubble", value: "气泡图" },
    ],
    AreaGraph: [
        { key: "base", value: "基础面积图" },
        { key: "duidie", value: "堆叠面积图" },
        // { key: "percent", value: "百分比面积图" },
    ],
    Scale: [
        { key: "cat", value: "cat" },
        { key: "timeCat", value: "timeCat" },
        { key: "linear", value: "linear" },
        { key: "log", value: "log" },
        { key: "pow", value: "pow" },
        { key: "time", value: "time" },
    ],
    coord: [
        { key: 'none', value: '无' },
        { key: "transpose", value: "XY轴转置" },
        { key: "reflect", value: "坐标系转置" },
    ]
}

export default allocationConfig