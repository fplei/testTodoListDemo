<template>
  <div class="container">
    <div class="content">
      <h3>当前最新的count值为：{{ count }}</h3>
      <button @click="btnHandler1">-1</button>
      <button @click="btnHandler2">-N</button>
    </div>
    <div v-show="show">哈哈哈哈啊</div>

    <!-- Vuex -->
    <div class="vuex-div">
      <h1>我是B组件</h1>
      <button @click="transform">点我让A组件接收到数据</button>
      <p>点了A，我的信息发生了变化：{{ AMessage }}</p>
    </div>
  </div>
</template>

<script>
import Bus from "@/Bus";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      show: false,
      BMessage: "Hello,A组件，我是B组件",
    };
  },
  computed: {
    ...mapState(["count"]),
  },
  mounted() {
    Bus.$on("showPopup", (data) => {
      this.show = data;
    });
  },
  computed: {
    AMessage() {
      //这里存储从store里获取的A组件的数据
      return this.$store.state.AMsg;
    },
  },
  methods: {
    ...mapMutations(["sub", "subN", "count"]),
    btnHandler1() {
      this.sub();
    },
    btnHandler2() {
      this.subN(3);
    },
    transform() {
      //触发receiveBMsg,将B组件的数据存放到store里去
      this.$store.commit("receiveBMsg", {
        BMsg: this.BMessage,
      });
    },
  },
};
</script>
