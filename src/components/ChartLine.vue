<template>
  <svg version="1.1" class="fish chart" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" ref="root">
    <fish-chart-title :title="title" :subtitle="subtitle"></fish-chart-title>
    <fish-chart-axis :labels="labels"></fish-chart-axis>
    <fish-chart-axis :labels="yLabels" vertical></fish-chart-axis>
    <fish-chart-legend :data="legends"></fish-chart-legend>
    <g :transform="transform">
      <fish-chart-base-line
        :points="shapeGroup.points"
        :pointSize="pointSize"
        :color="shapeGroup.color"
        :key="index"
        v-for="(shapeGroup, index) in shapeGroups"></fish-chart-base-line>
    </g>
  </svg>
</template>
<script>
  import { _color, _space } from '../config.js'
  import helper from '../helper.js'
  import FishChartLegend from './base/Legend.vue'
  import FishChartAxis from './base/Axis.vue'
  import FishChartTitle from './base/Title.vue'
  import FishChartBaseLine from './base/Line.vue'
  export default {
    components: {
      FishChartBaseLine,
      FishChartTitle,
      FishChartAxis,
      FishChartLegend},
    name: 'fish-chart-line',
    props: {
      title: { type: String, required: true },
      subtitle: { type: String, default: '' },
      labels: { type: Array, required: true },
      pointSize: { type: Number, default: 8 },
      data: { type: Array, required: true } // [{name: '', data: []}]
    },
    data () {
      const { data } = this
      return {
        legends: data.map((item, index) => { return { name: item.name, color: (item.color || _color.get(index)) } }),
        yLabels: getYLabels(data),
        shapeGroups: [],
        transform: ''
      }
    },
    mounted () {
      const { width, height } = this.$refs.root.getBoundingClientRect()
      const centerPoint = {x: _space.left, y: (height - _space.bottom) * this.yLabels.indexOf(0) / (this.yLabels.length - 1)}
      // 定位到y-axis === 0的位置
      this.transform = `translate(${centerPoint.x}, ${centerPoint.y})`

      // 每个像素占用的多少刻度
      const pixScales = (height - _space.bottom - _space.top) / Math.abs(this.yLabels[this.yLabels.length - 1] - this.yLabels[0])
      // console.log(pixScales)
      // x axis 间距
      let xSpacing = (width - _space.left - _space.right) / (this.labels.length - 1)
      this.data.forEach((item, i) => {
        const color = item.color || _color.get(i)
        const points = item.data.map((v, index) => {
          return { y: -v * pixScales, x: index * xSpacing }
        })
        this.shapeGroups.push({points: points, color: color})
      })
    }
  }

  const getYLabels = (data) => {
    let min = Math.min(...data.map((item) => Math.min(...item.data)))
    let max = Math.max(...data.map((item) => Math.max(...item.data)))
    return helper.generateAxisScales(min, max, 8).sort((a, b) => a < b)
  }
</script>
