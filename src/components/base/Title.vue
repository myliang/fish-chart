<template>
  <g>
    <text class="title" ref="title" :transform="titleTransform">{{ title }}</text>
    <text class="subtitle" ref="subtitle" :transform="subtitleTransform" v-if="subtitle">{{ subtitle }}</text>
  </g>
</template>
<script>
  export default {
    name: 'fish-chart-title',
    props: {
      title: { type: String, required: true },
      subtitle: { type: String }
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
      this.titleTransform = `translate(${(width - titleWidth) / 2}, 25)`
      if (this.$refs.subtitle) {
        const subtitleWidth = this.$refs.subtitle.getBoundingClientRect().width
        this.subtitleTransform = `translate(${(width - subtitleWidth) / 2}, 45)`
      }
    }
  }
</script>
