<template>
  <div id="app">
    <div style="width: 1000px; height: 500px; border: 1px solid #ccc; margin-bottom: 10px;">
      <fish-chart-line title="每月数据量统计" subtitle="数据来源myliang" :labels="lineLabels" :data="lineData"></fish-chart-line>
    </div>
    <div style="width: 1000px; height: 500px; border: 1px solid #ccc; margin-bottom: 10px;">
      <fish-chart-column title="每月数据量统计" subtitle="数据来源myliang" :labels="columnLabels" :data="columnData"></fish-chart-column>
    </div>
    <div style="width: 1000px; height: 500px; border: 1px solid #ccc; margin-bottom: 10px;">
      <fish-chart-ring title="测试Ring" subtitle="source: myliang" :data="ringData"></fish-chart-ring>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      lineLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      lineData: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }],
      columnLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      columnData: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
      }],
      ringData: [
        {name: 'Firefox', v: 45.0},
        {name: 'IE', v: 26.8},
        {name: 'Safari', v: 8.5},
        {name: 'Opera', v: 6.2},
        {name: '其他', v: 0.7}
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
