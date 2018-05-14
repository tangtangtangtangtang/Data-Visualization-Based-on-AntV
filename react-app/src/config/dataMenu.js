/**
 * Created by tang on 18/3/5.
 */

import ExhibitionTable from "../components/ExhibitionTable/index"
// import Allocation from "../components/Allocation/index"

export default {
  channel: "usr",
  menus: [
    {
      title: "数据",
      key: "data",
      component: ExhibitionTable,//放用户历史作品componnet todo a1
      items: [
        {
          title: "柱状图",
          key: "bar",
          component: ExhibitionTable//同a1
        },
        {
          title: "散点图",
          key: "point",
          component: ExhibitionTable//同a1
        }
      ]
    },
  ]
}