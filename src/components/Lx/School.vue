<template>
  <div class="school">
    <h1>{{ msg }}</h1>
    <h2>学校姓名：{{ name }}</h2>
    <h2>学校性别：{{ sex }}</h2>
    <h2>学校年龄：{{ myAge + 1 }}</h2>
    <button @click="btnAgeClick">尝试修改收到的年龄</button>
    <button @click="statisClick">100里有多少个6</button>
  </div>
</template>

<script>
import { statis } from "./demo";
export default {
  name: "School",
  data() {
    return {
      msg: "我是一个尚硅谷的学生",
      myAge: this.age,
    };
  },
  props: {
    name: {
      type: String, //类型字符串
      required: true, //必填项
      default: 99, // 默认值
    },
    sex: String,
    age: Number,
  },
  mounted() {},
  methods: {
    statisClick() {
      statis(1, 100, 6);
      console.log(statis(1, 100, 6));
      console.log(statis(1, 1000, 6));
    },
    btnAgeClick() {
      this.myAge++;
    },
  },
};
</script>

<style scoped>
.school {
  background: gray;
}
</style>
