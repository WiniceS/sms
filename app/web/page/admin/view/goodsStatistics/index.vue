<template>
  <div class="goodsStatistics">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="总览" name="first">
        商品库存top，热销top，冷淡top
        <el-row>
          <el-col :span="12">
            <v-chart auto-resize :options="option2"></v-chart>
          </el-col>
          <el-col :span="12">
            <v-chart auto-resize :options="option2"></v-chart>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              <el-date-picker
                v-model="value5"
                type="datetimerange"
                size="small"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              ></el-date-picker>
            </div>
            <div :style="{height:'300px'}">
              <v-chart auto-resize :options="option"></v-chart>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-date-picker
                v-model="value5"
                type="datetimerange"
                size="small"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              ></el-date-picker>
            </div>
            <div :style="{height:'300px'}">
              <v-chart auto-resize :options="option"></v-chart>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品销售量" name="second">
        <el-row>
          <el-date-picker
            v-model="value5"
            type="datetimerange"
            size="small"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
          <el-select v-model="value" placeholder="请选择品类" size="small">
            <el-option
              v-for="item in varietyOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-model="name" size="small" placeholder="请输入商品名称" :style="{width:'194px'}"></el-input>
          <el-input v-model="name" size="small" placeholder="请输入商品编号" :style="{width:'194px'}"></el-input>
          <el-button type="primary" size="small">查询</el-button>
        </el-row>
        <el-row>
          <v-chart auto-resize :options="option2"></v-chart>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品库存" name="third">
        <el-row>
          <el-select v-model="value" placeholder="请选择品类" size="small">
            <el-option
              v-for="item in varietyOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-model="name" size="small" placeholder="请输入商品编号" :style="{width:'194px'}"></el-input>
          <el-button type="primary" size="small">查询</el-button>
        </el-row>
        <el-row>
          <v-chart auto-resize :options="option2"></v-chart>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import echarts from "vue-echarts";
export default {
  name: "GoodsStatistics",
  data() {
    return {
      activeName: "first",
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value5: "",
      value: "",
      name: "",
      option: {
        xAxis: {
          data: ["点", "击", "柱"],
          axisLabel: {
            inside: true,
            textStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              normal: { color: "rgba(0,0,0,0.05)" }
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            data: [500, 500, 500],
            animation: false
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#188df0" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: [220, 182, 191]
          }
        ]
      },
      option2: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value"
          }
        ],
        yAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        series: [
          {
            name: "利润",
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: [200, 170, 240, 244, 200, 220, 210]
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["winHeight"]),
    ...mapState("goodsInput", ["varietyOption"])
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components: {
    "v-chart": echarts
  }
};
</script>

<style lang="scss">
.goodsStatistics {
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
