<template>
  <div class="data-box">
    <h2>Vue监测数据改变的原理</h2>
    <div id="root">
      <h2>学校名称：{{ name }}</h2>
      <h2>学校地址：{{ address }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "尚硅谷",
      address: "花果山",
      student: {
        name: "tom",
        age: {
          rAge: 40,
          sAge: 29,
        },
        friends: [{ name: "jerry", age: 35 }],
      },
    };
  },
};
let data = {
  name: "尚硅谷",
  address: "花果山",
};

//创建一个监视的实例对象，用于监视data中属性的变化
const obs = new Observer(data);
console.log(obs);

//准备一个vm对象
let vm = {};
vm._data = data = obs;

function Observer(obj) {
  //汇总对象中所有的属性形成一个数组
  const keys = Object.keys(obj);
  //遍历
  keys.forEach((k) => {
    Object.defineProperty(this, k, {
      get() {
        return obj[k];
      },
      set(val) {
        console.log(`${k}被改了，我要去解析模版，生成虚拟DOM，进行比较... 我要开始忙了`);
        obj[k] = val;
      },
    });
  });
}
</script>

<style scoped></style>
