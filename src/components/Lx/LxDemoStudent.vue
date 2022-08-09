<template>
  <div class="lx-box">
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生性别：{{ sex }}</h2>
    <h2>当前求和为：{{ number }}</h2>
    <button @click="add">点我number++</button>
    <button @click="sendStudentNameBtn">把学生名字给APP</button>
    <button @click="unbind">解绑haha事件</button>
    <button @click="death">销毁当前student组件的实例对象（vc）</button>
  </div>
</template>

<script>
export default {
  name: "student",
  data() {
    return {
      name: "张三",
      sex: "男",
      number: 0,
    };
  },
  methods: {
    //一个组件如果被销毁了，它身上的自定义事件也就失效了
    add() {
      console.log("add回调被调用了！！！");
      this.number++;
    },
    sendStudentNameBtn() {
      //使用$emit触发LxDemo组件实例身上的haha事件
      this.$emit("haha", this.name, 666, 888);
      this.$emit("demo");
    },
    unbind() {
      // $off() 解绑自定义事件, 这么写只能解绑一个自定义事件
      // this.$off("haha");
      // this.$off(["haha", "demo"]); //解绑一个自定义事件
      // this.$off(); //暴力写法，解绑所有自定义事件
    },
    death() {
      //销毁了当前LxDemoSchool组件的实例，销毁后所有LxDemoSchool实例的自定义事件全都奏效。（事件是绑定在vc上的，vc被销毁了，事件自然不能用了）
      this.$destroy();
    },
  },
};
</script>
<style scoped>
.lx-box {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: pink;
}
</style>
