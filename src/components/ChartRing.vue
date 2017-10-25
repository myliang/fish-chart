<template>
  <svg version="1.1" class="fish chart" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" ref="root">
    <fish-chart-title :title="title" :subtitle="subtitle"></fish-chart-title>
    <g :transform="transform">
      <g class="ring" v-for="shapeGroup in shapeGroups">
        <path :d="shapeGroup.path" :fill="shapeGroup.color"></path>
        <path :d="shapeGroup.line"></path>
        <!--<text><tspan>{{shapeGroup.name}} : {{shapeGroup.v/total}}%</tspan></text>-->
      </g>
    </g>
  </svg>
</template>
<script>
  import { _color, _space } from '../config.js'
  import FishChartTitle from './base/Title.vue'
  export default {
    components: {FishChartTitle},
    name: 'fish-chart-ring',
    props: {
      title: { type: String, required: true },
      subtitle: { type: String, default: '' },
      total: { type: [String, Number] },
      margin: { type: Number, default: 10 },
      data: { type: Array, required: true } // [{name, v, color}]
    },
    data () {
      let _total = 0.0
      this.data.forEach((item) => { _total += item.v })
      return {
        shapeGroups: [],
        vTotal: this.total || _total,
        transform: ''
      }
    },
    mounted () {
      const { width, height } = this.$refs.root.getBoundingClientRect()
      const centerPoint = {x: width / 2, y: (height + _space.top) / 2}
      const r = (width > height ? height / 2 - _space.top / 2 : width / 2) - this.margin
      const innerR = r - r / 5
      this.transform = `translate(${centerPoint.x}, ${centerPoint.y})`
      // 弧度起点坐标
      let start = {x: 0, y: -r}
      let start1 = {x: 0, y: -innerR}
      let degree = 0.0 // 累加角度
      this.data.forEach((item, index) => {
        let currentDegree = (item.v / this.vTotal) * 360 // 占用多少度
        degree += currentDegree
        let rad = degree * (Math.PI / 180)
        let endp = {x: r * Math.sin(rad), y: -r * Math.cos(rad)}
        let endp1 = {x: innerR * Math.sin(rad), y: -innerR * Math.cos(rad)}
        // console.log(endp, ':::', endp1)
        let path = `M ${start.x} ${start.y} A ${r} ${r} 0 ${currentDegree > 180 ? 1 : 0} 1 ${endp.x} ${endp.y} L ${endp1.x} ${endp1.y} A ${innerR} ${innerR} 0 ${currentDegree > 180 ? 1 : 0} 0 ${start1.x} ${start1.y} Z`
        start = endp
        start1 = endp1
        this.shapeGroups.push(Object.assign({}, item, {path: path, color: item.color || _color.get(index)}))
      })
    }
  }
</script>
