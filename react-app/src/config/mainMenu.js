/**
 * Created by tang on 18/3/5.
 */

import ExhibitionTable from "../components/ExhibitionTable/index"

export default {
  channel: "main",
  defaultOpenKeys: ["/main/BarGraph", "/main/LineGraph", "/main/PieGraph", "/main/AreaGraph", "/main/PointGraph"],
  component: ExhibitionTable,
  menus: [
    {
      title: "柱状图",
      key: "BarGraph",
      icon: "bar-graph",
      component: ExhibitionTable,
    },
    {
      title: "折线图",
      key: "LineGraph",
      icon: "line-graph",
      component: ExhibitionTable,

    },
    {
      title: "饼图",
      key: "PieGraph",
      icon: "pie-graph",
      component: ExhibitionTable,
    },
    {
      title: "点图",
      key: "PointGraph",
      icon: "point-graph",
      component: ExhibitionTable,

    },
    {
      title: "面积图",
      key: "AreaGraph",
      icon: "area-graph",
      component: ExhibitionTable,
    },
  ]
}