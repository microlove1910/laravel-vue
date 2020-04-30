<template>
  <div :class="className"></div>
</template>

<style scoped>
  .vue-echarts {
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import ECharts from 'echarts'
  import 'echarts/theme/infographic'
  import 'echarts/theme/roma'
  import 'echarts/theme/shine'
  import 'echarts/theme/vintage'
  import 'echarts/theme/dark'
  import 'echarts/theme/macarons'
  import Debounce from 'lodash.debounce'
  // import Resize from 'element-resize-event'
  import Resize from 'element-resize-detector'
  import Wrapper from './wrapper.js'

  const IEcharts = Wrapper(ECharts, Resize, Debounce)
  export default IEcharts
</script>
