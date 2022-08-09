import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  // mounted(){
  //   setTimeout(()=>{
  //     this.$destroy()
  //   },3000)
  // },
  beforeCreate(){
    Vue.prototype.$bus = this
  },
}).$mount('#app')
