/**
 * Created by tang on 18/3/5.
 */
export default {
  channel:"main",
  defaultOpenKeys:["/main/BarGraph","/main/LineGraph","/main/PieGraph","/main/AreaGraph","/main/PointGraph"],
  menus: [
    {
      title: "柱状图",
      key: "BarGraph",
      icon:"bar-graph",
      items: [
        {
          title: "简介",
          key: "brief"
        },
        {
          title: "快速开始",
          key: "quick-start"
        }
      ]
    },
    {
      title: "折线图",
      key: "LineGraph",
      icon:"line-graph",
      items: [
        {
          title: "柱状图",
          key: "bar"
        }
      ]
    },
    {
      title: "饼图",
      key: "PieGraph",
      icon:"pie-graph",
      items: [
        {
          title: "柱状图",
          key: "bar"
        }
      ]
    },
    {
      title: "点图",
      key: "PointGraph",
      icon:"point-graph",
      items: [
        {
          title: "柱状图",
          key: "bar"
        }
      ]
    },
    {
      title: "面积图",
      key: "AreaGraph",
      icon:"area-graph",
      items: [
        {
          title: "柱状图",
          key: "bar"
        }
      ]
    },

  ]
}