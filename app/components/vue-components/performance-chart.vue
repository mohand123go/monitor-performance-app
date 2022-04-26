<template>
  <div class="c-chart__container">
    <input type="date" v-model="startDate" />
    <input type="date" v-model="endDate" />
    <v-chart ref="chart" :option="chartOptions" />
  </div>
</template>

<script>
import moment from "moment";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: "PerformanceChartComponent",

  components: {
    VChart,
  },
  data() {
    return {
      startDate: null,
      endDate: null,
    };
  },
  created() {
    this.$store.dispatch("performance/UPDATE_CHART_DATA").catch(() => {
      console.log("error");
    });
  },

  computed: {
    originChartData() {
      return this.$store.getters["performance/getOriginChartData"];
    },
    chartData: {
      get() {
        return this.$store.getters["performance/getChartData"];
      },
      set(value) {
        this.$store.commit("performance/UPDATE_CHART_DATA", value);
      },
    },
    initOptions() {
      return {
        width: "auto",
        height: "300px",
      };
    },

    chartOptions() {
      return {
        title: {
          text: "Team Performance Index",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
          formatter: function (params) {
            return `
        <div class="c-chart__tooltip">
          <div class="c-chart__tooltip-title">${params[0].axisValueLabel}</div>
          <div class="c-chart__tooltip-content">
                ${params[0].marker} Team Performance Index: ${params[0].data}%
          </div>
        </div>
`;
          },
        },
        grid: {
          left: "30px",
          right: "12px",
          bottom: "2px",
          top: "6px",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            data: this.yAxisData,
            type: "line",
            symbol: "circle",
            symbolSize: 2,
            cursor: "default",
            lineStyle: {
              width: 2,
            },
          },
        ],
        visualMap: {
          top: 50,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "red",
            },
            {
              gt: 50,
              lte: 80,
              color: "yellow",
            },
            {
              gt: 80,
              lte: 100,
              color: "green",
            },
          ],
        },
      };
    },

    xAxisData() {
      return this.chartData?.map((item) => this.formatDate(item?.date_ms));
    },

    yAxisData() {
      return this.chartData?.map((item) => +item?.performance * 100);
    },
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format("DD MMM YYYY");
    },
    fiterChartDataByDate(startDate, endDate) {
      const formateDateToInputFormat = (date) =>
        moment(date).format("YYYY-MM-DD");
      const filterChartData = this.originChartData.filter(({ date_ms }) =>
        moment(formateDateToInputFormat(date_ms)).isBetween(
          startDate,
          endDate,
          undefined,
          "[]"
        )
      );
      if (filterChartData.length) this.chartData = filterChartData;
      else this.chartData = this.originChartData;
    },
  },
  watch: {
    startDate(startDate) {
      this.fiterChartDataByDate(startDate, this.endDate);
    },
    endDate(endDate) {
      this.fiterChartDataByDate(this.startDate, endDate);
    },
  },
};
</script>
<style lang="scss" >
.c-chart__container {
  .c-chart__tooltip {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #223048;
    border-radius: 5px;
    padding: 10px;
    .c-chart__tooltip-title {
      font-size: 13px;
      font-weight: bold;
      color: #fff;
    }
    .c-chart__tooltip-content {
      font-size: 14px;
      color: #fff;
    }
    border: 1px solid #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }
}
</style>
