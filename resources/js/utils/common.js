/* eslint-disable */
(function(window, document, undefined) {
  'use strict'

  window.commonControl = {
    getLongDate: function(date) {
      if (date != undefined && date != '') {
        var re = /(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/.exec(date)
        return new Date(re[1], (re[2] || 1) - 1, re[3] || 1, re[4] || 0, re[5] || 0, re[6] || 0).getTime() / 1000
      } else {
        return ''
      }
    },
    getHost() {
      const host = process.env.BASE_API
      return host
    },
    getStringDate: function(date) {
      try {
        var d = date
        var Y = d.getFullYear() + '-'
        var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-'

        var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate()) + ' '
        var h = (d.getHours() < 10 ? '0' + (d.getHours()) : d.getHours()) + ':'
        var m = (d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes()) + ':'
        var s = (d.getSeconds() < 10 ? '0' + (d.getSeconds()) : d.getSeconds())
        return (Y + M + D + h + m + s)
      } catch (error) {
        return date
      }
    },
    getStringDateNoHour: function(date) {
      if (date != undefined && date != '') {
        var d = new Date(date * 1000)
        var Y = d.getFullYear() + '-'
        var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-'

        var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate()) + ' '
        return (Y + M + D)
      } else {
        return ''
      }
    },
    getMonth: function() {
      var d, s
      d = new Date()
      s = d.getFullYear() + '-'

      s += (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1)

      return (s)
    },
    GetDateT: function(AddDayCount) {
      var d, s
      d = new Date()
      d.setDate(d.getDate() + AddDayCount)
      s = d.getFullYear() + '-'

      s += (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-'
      s += (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate()) + ' '
      s += (d.getHours() < 10 ? '0' + (d.getHours()) : d.getHours()) + ':'
      s += (d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes()) + ':'
      s += (d.getSeconds() < 10 ? '0' + (d.getSeconds()) : d.getSeconds())

      return (s)
    },
    getDateYMD: function(AddDayCount) {
      var d, s
      d = new Date()
      d.setDate(d.getDate() + AddDayCount)
      s = d.getFullYear() + '-'

      s += (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-'
      s += (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate())

      return (s)
    },
    getCurrentTime: function() {
      return parseInt(new Date().getTime() / 1000)
    },
    transferDateYMD: function(d) {
      if (d == undefined || d == null) { return d }
      try {
        if (new Date(d).getDate() == d.substring(d.length - 2)) {
          return d
        } else {
          return null
        }
      } catch (error) {
        var s = d.getFullYear() + '-'
        s += (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-'
        s += (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate())

        return (s)
      }
    },
    transferToMonth: function(d) {
      if (d == undefined || d == null || (d + '').indexOf('-') !== -1) { return d }
      try {
        if (new Date(d).getDate() == d.substring(d.length - 2)) {
          return d
        } else {
          return null
        }
      } catch (error) {
        var s = d.getFullYear() + '-'
        s += (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1)

        return (s)
      }
    },
    getFirstDayOfWeek: function(date) {
      var day = date.getDay() || 7
      return commonControl.getDateYMD(-day + 1)
    },
    transfer: function(data) {
      for (var serie of data) {
        var datapoints = []
        for (var key in serie.datapoints) {
          datapoints.push({ x: key, y: serie.datapoints[key] })
        }
        serie.datapoints = datapoints
      }
    },
    getAxisData: function(data, type) {
      var ticks = []
      if (data[0]) {
        data[0].datapoints.forEach((value, index, array) => {
          ticks.push(value.x)
        })
      }
      return {
        type: 'category',
        boundaryGap: type === 'bar',
        data: ticks
      }
    },
    getSeries: function(data, config, type) {
      var series = []
      data.forEach((serie) => {
        var datapoints = []
        serie.datapoints.forEach((datapoint) => {
          datapoints.push(datapoint.y)
        })
        var conf = {
          type: type || 'line',
          name: serie.name,
          data: datapoints,
          itemStyle: {}
        }
        // area chart is actually line chart with special itemStyle
        if (type === 'area') {
          conf.type = 'line'
          conf.itemStyle = { normal: { areaStyle: { type: 'default' }}}
        }

        if (serie.stack) {
          conf.stack = serie.stack
        }

        // gauge chart need many special config
        if (type === 'gauge') {
          conf = Object.assign(conf, {
            splitNumber: 10,
            // 分割段数，默认为5
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[0.2, '#228b22'], [0.8, '#48b'], [1, '#ff4500']],
                width: 8
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 10,
              // 每份split细分多少段
              length: 12,
              // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              // 坐标轴文本标签，详见axis.axisLabel
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: 'auto'
              }
            },
            splitLine: {
              // 分隔线
              show: true,
              // 默认显示，属性show控制显示与否
              length: 30,
              // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: { width: 5 },
            title: {
              show: true,
              offsetCenter: [0, '-40%'],
              // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder'
              }
            },
            detail: {
              formatter: '{value}%',
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: 'auto',
                fontWeight: 'bolder'
              }
            }
          })
        }
        // datapoints for pie chart and gauges are different
        // if (!isAxisChart(type)) {
        //   conf.data = [];
        //   angular.forEach(serie.datapoints, function (datapoint) {
        //     if (datapoint.selected) {
        //       conf.data.push({
        //         value: datapoint.y,
        //         name: datapoint.x,
        //         selected:true
        //       });
        //     } else {
        //       conf.data.push({
        //         value: datapoint.y,
        //         name: datapoint.x
        //       });
        //     }
        //
        //   });
        // }
        // if (isPieChart(type)) {
        //   // donut charts are actually pie charts
        //   conf.type = 'pie';
        //   // pie chart need special radius, center config
        //   conf.center = config.center || ['50%', '55%'];
        //   conf.radius = config.radius || '60%';
        //   // donut chart require special itemStyle
        //   if (type === 'donut') {
        //     conf.radius = config.radius || ['50%', '70%'];
        //     conf.avoidLabelOverlap =false;
        //     conf = angular.extend(conf, {
        //       itemStyle: {
        //         normal: {
        //           label: {show: false, position: 'center', formatter: "{b}: {c} ({d}%)"},
        //           labelLine: {show: false}
        //         },
        //         emphasis: {
        //           label: {
        //             show: true,
        //             position: 'center',
        //             textStyle: {
        //               fontSize: '20',
        //               fontWeight: 'bold'
        //             }
        //             , formatter: "{b}: {c} ({d}%)"
        //           }
        //         }
        //       }
        //     }, config.donut || {});
        //   } else if (type === 'pie') {
        //     conf.avoidLabelOverlap =false;
        //     conf.center = config.center || ['50%', '55%'];
        //     conf = angular.extend(conf, {
        //       itemStyle: {
        //         emphasis: {
        //           shadowBlur: 10,
        //           shadowOffsetX: 0,
        //           shadowColor: 'rgba(0, 0, 0, 0.5)'
        //           ,formatter: "{b}: {c} ({d}%)"
        //         }
        //       },
        //       label: {
        //         normal: {
        //           show: true,formatter: '{b}: {d}%'
        //         },
        //         emphasis: {
        //           show: true,formatter: '{b}: {d}%'
        //         }
        //       },
        //     }, config.pie || {});
        //   } else if (type ==='twopie') {
        //
        //     if (series.length == 0) {
        //       conf = angular.extend(conf, {
        //         selectedMode: 'single',
        //         radius: [0, '30%'],
        //         center : ['50%', 200],
        //         label: {
        //           normal: {
        //             position: 'inner'
        //           }
        //
        //         },
        //         labelLine: {
        //           normal: {
        //             show: false
        //           }
        //         }
        //       }, config.pie || {});
        //     } else {
        //       conf.radius = config.radius || ['40%', '55%'];
        //       conf.center = ['50%', 200];
        //     }
        //   } else if (type === 'rose'){
        //     conf = angular.extend(conf, {
        //       radius : [30, 110],
        //       center : ['50%', 200],
        //       roseType : 'area',
        //       x: '50%',               // for funnel
        //       max: 40,                // for funnel
        //       sort : 'ascending',
        //       label: {
        //         normal: {
        //           show: true,formatter: '{b}: {d}%'
        //         },
        //         emphasis: {
        //           show: true,formatter: '{b}: {d}%'
        //         }
        //       }
        //     }, config.pie || {});
        //     conf.data.sort(function (a, b) { return a.value - b.value});
        //   }
        // }
        // if (isMapChart(type)) {
        //   conf.type = 'map',
        //     conf.mapType = 'china',
        //     conf = angular.extend(conf, {
        //       itemStyle:{
        //         normal:{label:{show:false}},
        //         emphasis:{label:{show:true}}
        //       }
        //     }, config.map || {});
        // }
        // if stack set to true
        // if (config.stack) {
        //   conf.stack = 'total';
        // }
        // if (type === 'radar') {
        //   conf.data = serie.data;
        // }
        series.push(conf)
      })
      return series
    },

    isAxisChart: function(type) {
      return ['line', 'bar', 'area'].indexOf(type) > -1
    },
    getLegend(data, config, type) {
      var legend = { data: [] }

      data.forEach((serie) => {
        legend.data.push(serie.name)
      })
      legend.orient = 'horizontal'
      return legend
    },
    uuId() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
          (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) +
          (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1) + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    },
    getUrl(url, params) {
      console.info(params)
      let queryString = []

      Object.keys(params).forEach(key => params[key] != undefined && queryString.push(`${key}=${params[key]}`))
      if (queryString.length > 0) {
        queryString = queryString.join('&')
        url += `?${queryString}`
      }
      return url
    },
    /**
     * post 方法
     */
    post(url, params) {
      // 创建form元素
      var form = document.createElement('form')
      // 设置form属性
      form.action = url
      form.target = '_self'
      form.method = 'post'
      form.style.display = 'none'
      // 处理需要传递的参数
      for (var x in params) {
        var opt = document.createElement('textarea')
        opt.name = x
        opt.value = params[x]
        form.appendChild(opt)
      }
      document.body.appendChild(form)
      // 提交表单
      form.submit()
      return form
    }
}
})(window, document)

