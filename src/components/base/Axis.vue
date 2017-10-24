<template>
  <g :class="['axis', vertical ? 'y-axis' : 'x-axis']">
    <g class="labels" :transform="labelTransform">
      <text v-for="(label, index) in labels" :x="xyLabels[index] && xyLabels[index].x" :y="xyLabels[index] && xyLabels[index].y" ref="labelItems">
        <tspan>{{ label }}</tspan>
      </text>
    </g>
    <g class="grid">
      <path :d="d" v-for="d in lines"></path>
    </g>
  </g>
</template>
<script>
  import { _space } from '../../config'
  export default {
    name: 'fish-chart-axis',
    props: {
      labels: { type: Array, required: true },
      vertical: { type: Boolean, default: false },
      type: { type: String, default: 'line' }
    },
    data () {
      return {
        labelTransform: '',
        xyLabels: [],
        lines: []
      }
    },
    mounted () {
      // console.log('labels:', this.labels)
      const { height, width } = this.$parent.$el.getBoundingClientRect()
      this.labelTransform = `translate(${_space.left},${height - _space.bottom})`
      let step = (width - _space.left - _space.right) / (this.labels.length - (this.type === 'line' ? 1 : 0))
      // 如果垂直
      if (this.vertical) {
        this.labelTransform = `translate(${_space.left},${_space.top})`
        step = (height - _space.top - _space.bottom) / (this.labels.length - (this.type === 'line' ? 1 : 0))
      }
      let start = 0
      // 设置label的位置
      this.labels.forEach((label, index) => {
        this.updateXY(index, start, step)
        this.updateLines(index, start, width, height)
        start += step
      })
      if (this.type === 'column') {
        this.updateLines(this.labels.length, start, width, height)
      }
      // this.updateLines(this.labels.length, start, width, height)
    },
    methods: {
      updateXY (index, start, step) {
        if (this.vertical) {
          this.xyLabels.splice(index, 1, {x: -15, y: start})
        } else {
          let x = start
          if (this.type === 'column') {
            const { width } = this.$refs.labelItems[index].getBoundingClientRect()
            x += (step - width) / 2 + width / 2
          }
          this.xyLabels.splice(index, 1, {x: x, y: 15})
        }
      },
      updateLines (index, start, width, height) {
        if (this.vertical) {
          this.lines.splice(index, 1, `M ${_space.left} ${_space.top + start} L ${width - _space.right} ${_space.top + start}`)
        } else {
          this.lines.splice(index, 1, `M ${_space.left + start} ${_space.top} L ${_space.left + start} ${height - _space.bottom}`)
        }
      }
    }
  }
</script>
