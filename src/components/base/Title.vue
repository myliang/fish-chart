<template>
  <g>
    <text class="title" ref="title" :transform="titleTransform">{{ title }}</text>
    <text class="subtitle" ref="subtitle" :transform="subtitleTransform">{{ subtitle }}</text>
  </g>
</template>
<script>
  export default {
    name: 'fish-chart-title',
    props: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true }
    },
    data () {
      return {
        titleTransform: '',
        subtitleTransform: ''
      }
    },
    mounted () {
      const { width } = this.$parent.$el.getBoundingClientRect()
      const titleWidth = this.$refs.title.getBoundingClientRect().width
      const subtitleWidth = this.$refs.subtitle.getBoundingClientRect().width
      this.titleTransform = `translate(${(width - titleWidth) / 2}, 25)`
      this.subtitleTransform = `translate(${(width - subtitleWidth) / 2}, 50)`
    }
  }
</script>
