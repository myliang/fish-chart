<template>
  <svg version="1.1" class="fish chart" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" ref="root">
    <fish-chart-title :title="title" :subtitle="subtitle"></fish-chart-title>
    <g :transform="transform">
      <g class="ring" v-for="shapeGroup in shapeGroups">
        <path :d="shapeGroup.path" :fill="shapeGroup.color"></path>
        <text :x="shapeGroup.textPoint.x" :y="shapeGroup.textPoint.y" :style="{'text-anchor': shapeGroup.textAnchor}">
          <tspan>{{shapeGroup.name}} : {{(shapeGroup.v/vTotal * 100).toFixed(2)}}%</tspan>
        </text>
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
      let degree = 0.0
      let textDegree = 0.0
      this.data.forEach((item, index) => {
        let currentDegree = (item.v / this.vTotal) * 360 // 占用多少度
        // 计算环位置
        degree += currentDegree
        let endp = new Circle(r).getPointFromDegree(degree)
        let endp1 = new Circle(innerR).getPointFromDegree(degree)
        // console.log(endp, ':::', endp1)
        let path = ['M', start.x, start.y, 'A', r, r, 0, currentDegree > 180 ? 1 : 0, 1, endp.x, endp.y, 'L', endp1.x, endp1.y, 'A', innerR, innerR, 0, currentDegree > 180 ? 1 : 0, 0, start1.x, start1.y, 'z'].join(' ')
        start = endp
        start1 = endp1

        // 计算文字位置
        textDegree += currentDegree / 2
        let textAnchor = textDegree > 180 ? 'end' : 'start'
        let tendp = new Circle(r + 10).getPointFromDegree(textDegree)
        textDegree += currentDegree / 2
        this.shapeGroups.push(Object.assign({textPoint: tendp, textAnchor: textAnchor}, item, {path: path, color: item.color || _color.get(index)}))
      })
    }
  }

  export class Circle {
    constructor (r) {
      this.r = r
    }
    getPointFromDegree (degree) {
      let rad = degree * (Math.PI / 180)
      return {x: this.r * Math.sin(rad), y: -this.r * Math.cos(rad)}
    }
  }
</script>
