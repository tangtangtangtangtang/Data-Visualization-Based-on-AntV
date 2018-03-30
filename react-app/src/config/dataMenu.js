/**
 * Created by tang on 18/3/5.
 */

import ExhibitionTable from "../components/ExhibitionTable/index"

export default {
  channel: "usr",
  menus: [
    {
      title: "数据",
      key: "data",
      component:ExhibitionTable,//放用户历史作品componnet todo a1
      items: [
        {
          title: "柱状图",
          key: "bar",
          component:ExhibitionTable//同a1
        },
        {
          title: "散点图",
          key: "point",
          component:ExhibitionTable//同a1
        }
      ]
    },
    // {
    //   title: "详细文档",
    //   key: "detail",
    //   items: [
    //     {
    //       title: "折线图",
    //       key: "LineGraph"
    //     },
    //     {
    //       title: "柱状图",
    //       key: "BarGraph"
    //     },
    //     {
    //       title: "饼图",
    //       key: "PieGraph"
    //     },
    //     {
    //       title: "点图",
    //       key: "PointGraph"
    //     },
    //     {
    //       title: "面积图",
    //       key: "AreaGraph"
    //     },
    //     {
    //       title: "箱形图",
    //       key: "BoxGraph"
    //     }
    //   ]
    // },
  ]
}