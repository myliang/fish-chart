<template>
  <g class="line">
    <path :d="line" :stroke="color"></path>
    <rect v-for="(point, index) in points"
          class="point"
          :x="point.x - pointSize/2"
          :y="point.y - pointSize/2"
          :height="pointSize"
          :width="pointSize"
          :fill="color"
          :rx="pointSize/2"
          :ry="pointSize/2"></rect>
  </g>
</template>
<script>
  export default {
    name: 'fish-chart-base-line',
    props: {
      points: { type: Array, required: true },
      pointSize: { type: Number, required: true },
      color: { type: String, required: true }
    },
    data () {
      return {
        line: this.points.map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join('')
      }
    }
  }
</script>
