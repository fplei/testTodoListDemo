<template>
  <div class="container">
    <p>{{ nameData }}</p>
    <div class="content">
      <h3>当前最新的count值为：{{ $store.state.count }}</h3>
      <button @click="btnHandler1">+1</button>
      <button @click="btnHandler2">+N</button>
      <button @click="lcclick">子传父</button>

      <button @click="showPopup">Bus哈哈哈</button>
    </div>
    <!-- Vuex -->
    <div class="vuex-div">
      <h1>我是A组件</h1>
      <button @click="transfrom">点我让B组件接收数据</button>
      <p>因为点了B,所以信息发生了变化: {{ BMessage }}</p>
    </div>
  </div>
</template>

<script>
import Bus from "@/Bus";
export default {
  data() {
    return {
      a: 123,
      show: false,
      AMessage: "Hello,B组件，我是A组件哦～",
    };
  },
  props: ["nameData"],
  computed: {
    BMessage() {
      //这里存储从store里获取的B组件数据
      return this.$store.state.BMsg;
    },
  },
  methods: {
    btnHandler1() {
      this.$store.commit("add");
    },
    btnHandler2() {
      this.$store.commit("addN", 2);
    },
    lcclick() {
      this.$emit("newLcclick");
    },
    childBtn(val) {
      alert("ref传值给父亲！");
      this.$parent.btnClick();
      // return this.a
    },
    showPopup() {
      this.show = !this.show;
      Bus.$emit("showPopup", this.show);
    },
    transfrom() {
      //触发receiveAMsg,将A组件的数据存放到store里去
      this.$store.commit("receiveAMsg", {
        AMsg: this.AMessage,
      });
    },
  },
};
</script>
