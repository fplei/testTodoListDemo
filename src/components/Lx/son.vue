<template>
  <div class="son">
    <p v-for="(item, index) in data" :key="index">{{ item.name }}-{{ item.sex }}</p>
    <button @click="commit">点我～</button>
    <div class="root">
      姓：<input type="text" v-model="firstName" /> <br /><br />
      名：<input type="text" v-model="lastName" /> <br /><br />
      全名:<span>{{ fullName }}</span>
      <h2>今天天气很-{{ info }}.{{ x }}</h2>
      <button @click="changeWeather">切换天气</button>
      <hr />
      <h3>a的值是：{{ number.a }}</h3>
      <button @click="number.a++">点我让A+1</button>
      <h3>b的值是：{{ number.b }}</h3>
      <button @click="number.b++">点我让B+1</button>
      <button @click="number = { a: 666, b: 888 }">彻底替换掉number</button>
      <!-- {{ number.c.d.e }} -->
    </div>
  </div>
</template>
ß
<script>
export default {
  props: {
    data: Array,
  },
  data() {
    return {
      name: "子组件嘻嘻～",
      firstName: "张",
      lastName: "三",
      isHot: true,
      x: 1,
      number: {
        a: 1,
        b: 2,
        c: {
          d: {
            e: 100,
          },
        },
      },
    };
    ß;
  },
  methods: {
    commit() {
      this.$emit("sonClick");
    },
    changeWeather() {
      this.isHot = !this.isHot;
      this.x++;
    },
  },
  computed: {
    fullName: {
      //get有什么作用？当有人读区fullName时，get就会被调用，且返回值作为fullName的值
      get() {
        console.log("get被调用了！");
        return this.firstName + "-" + this.lastName;
      },
      set() {},
    },
    info() {
      return this.isHot ? "炎热" : "凉快";
    },
  },
  watch: {
    isHot: {
      //初始化时，让handler调用一下
      immediate: true,
      //handler什么时候调用？当isHot发生改变时
      handler(newValue, oldValue) {
        console.log("isHot被修改了！", newValue, oldValue);
      },
    },

    number: {
      deep: true,
      handler() {
        console.log("number改变了！");
      },
    },
  },
};
</script>

<style></style>
