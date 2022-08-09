<template>
  <div class="lx-box">
    <h2>学校姓名：{{ name }}</h2>
    <h2>学校性别：{{ address }}</h2>
    <button @click="sendSchoolNameBtn">把学校名字给APP</button>
  </div>
</template>

<script>
export default {
  name: "school",
  data() {
    return {
      name: "月球",
      address: "北京",
    };
  },
  props: ["getSchoolName"],
  methods: {
    sendSchoolNameBtn() {
      this.getSchoolName(this.name);
    },
  },
};
</script>
<style scoped>
.lx-box {
  position: absolute;
  right: 10px;
  bottom: 180px;
  background: skyblue;
}
</style>
