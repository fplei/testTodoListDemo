import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const mutations = {
  
// }

export default new Vuex.Store({
  state: {
    count:0,
    AMsg:'',
    BMsg:'',
  },
  mutations: {
    add(state){
      setTimeout(()=>{
        state.count++
      },1000)
    },
    addN(state,step){
      //变更状态
      state.count += step
    },
    sub(state){
      state.count--
    },
    subN(state,step){
      state.count -= step
    },

    receiveAMsg(state,payload){
      //将A组件的数据存放于state里
      state.AMsg = payload.AMsg
    },
    receiveBMsg(state,payload){
      //  将B组件的数据存放于state中
      state.BMsg = payload.BMsg
    }
  },
  actions: {
  },
  modules: {
  }
})
