<template>
  <div class="data-box">
    <h2>VueSet</h2>
    <div id="root">
      <h1>学校信息</h1>
      <h2>学校名称：{{ name }}</h2>
      <h2>学校地址：{{ address }}</h2>
      <h2>校长是：{{ leader }}</h2>
      <hr />
      <h1>学生信息</h1>
      <button @click="addSex">添加一个性别属性，默认值是男</button>
      <h2>姓名：{{ student.name }}</h2>
      <h2 v-if="student.sex">性别：{{ student.sex }}</h2>
      <h2>学生年龄：真实{{ student.age.rAge }}. 对外：{{ student.age.sAge }}</h2>
      <h2>朋友们</h2>
      <ul>
        <li v-for="(f, index) in student.friends" :key="index">
          {{ f.name }}--{{ f.age }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "尚硅谷",
      address: "花果山",
      leader: "哈哈哈",
      student: {
        name: "tom",
        // sex: "男",
        age: {
          rAge: 18,
          sAge: 29,
        },
        friends: [
          { name: "jerry", age: 26 },
          { name: "tony", age: 25 },
        ],
      },
    };
  },
  methods: {
    addSex() {
      this.$set(this.student, "sex", "男");
    },
  },
};
</script>

<style scoped></style>
