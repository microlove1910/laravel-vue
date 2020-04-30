import '@/utils/common'
import '@/styles/element-variables.scss'

import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/styles/index.scss' // global css
import Cookies from 'js-cookie'

import App from './views/App'
import store from './store'
import router from './router'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// import 'element-ui/lib/theme-chalk/index.css'

import '@/icons' // icon
import '@/permission' // permission control
import Api from '@/api/api'

import * as filters from './filters'; // global filters

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.use(ElementUI, {size: Cookies.get('size') || 'medium'})

Vue.config.productionTip = false
Vue.prototype.$api = new Api()

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
