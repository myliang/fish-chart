import './chart.css'
import ChartLine from './components/ChartLine.vue'
import ChartColumn from './components/ChartColumn.vue'

const components = {
  ChartLine,
  ChartColumn
}
const install = function (Vue, opts = {}) {
  Object.values(components).forEach((component) => {
    // console.log(component.name)
    Vue.component(component.name, component)
  })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign({}, components, {install})  // eslint-disable-line no-undef
