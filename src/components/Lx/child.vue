<template>
  <div class="child">
    <div>child的内容，传给父组件</div>
    <!-- 准备好一个容器 -->
    <div id="root">
      <div class="basic" :class="mood" @click="changeMood">{{ name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childName: "我是 child~",
      name: "🐱喵～～",
      mood: "normal",
    };
  },
  methods: {
    childHello() {
      alert("我是子组件~");
    },
    changeMood() {
      this.mood = "basic";
    },
  },
};
</script>
<style>
.basic {
  width: 300px;
  height: 35px;
  line-height: 35px;
  background: pink;
}
.normal {
  width: 300px;
  height: 35px;
  line-height: 35px;
  background: red;
}
</style>
