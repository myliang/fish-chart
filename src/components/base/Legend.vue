<template>
  <g class="legend" :transform="rootTransform" ref="root">
    <g class="item" v-for="(legend, index) in data" :transform="itemsTransform[index]" ref="items">
      <rect x="2" y="4" :height="size" :width="size" :fill="legend.color" :rx="radius" :ry="radius"></rect>
      <text x="20" y="15"><tspan>{{ legend.name }}</tspan></text>
    </g>
  </g>
</template>
<script>
  import { _space } from '../../config'

  const spacing = 20

  export default {
    name: 'fish-chart-legend',
    props: {
      start: { type: Object, default: () => { return {x: 0, y: 0} } },
      size: { type: Number, default: 12 },
      radius: { type: Number, default: 6 },
      data: { type: Array, required: true } // [{name: '', color: ''}]
    },
    data () {
      return {
        rootTransform: '',
        itemsTransform: []
      }
    },
    mounted () {
      let start = 0
      let offset = _space.bottom / 2
      const { width, height } = this.$parent.$el.getBoundingClientRect()
      this.$refs.items.forEach((item, index) => {
        let clientRect = item.getBoundingClientRect()
        this.itemsTransform.splice(index, 1, `translate(${start},0)`)
        start += clientRect.width + spacing
      })
      this.rootTransform = `translate(${(width - start) / 2}, ${height - offset})`
    }
  }
</script>
