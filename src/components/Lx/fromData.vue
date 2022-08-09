<template>
  <div class="fromData">
    <div class="root">
      <form @submit.prevent="demo">
        账号：<input type="text" v-model.trim="userInfo.account" /> <br /><br />
        密码：<input type="password" v-model="userInfo.password" /> <br /><br />
        年龄：<input type="number" v-model.number="userInfo.age" /> <br /><br />
        性别： 男<input type="radio" name="sex" v-model="userInfo.sex" value="male" />
        女<input type="radio" name="sex" v-model="userInfo.sex" value="female" />
        <br /><br />
        爱好：学习<input type="checkbox" v-model="userInfo.hobby" value="study" />
        打游戏<input type="checkbox" v-model="userInfo.hobby" value="game" /> 玩<input
          type="checkbox"
          v-model="userInfo.hobby"
          value="play"
        />
        <br /><br />
        所属校区：
        <select v-model="userInfo.city">
          <option value="">请选择校区</option>
          <option value="beijing">北京</option>
          <option value="tianjing">天津</option>
          <option value="hebei">河北</option></select
        ><br /><br />
        其它信息：
        <textarea v-model.lazy="userInfo.other"></textarea><br /><br />
        <input type="checkbox" v-model="userInfo.agree" />
        阅读并接受《用户协议》<br /><br />
        <button>提交</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        account: "",
        password: "",
        age: "",
        sex: "male",
        hobby: [],
        city: "beijing",
        other: "",
        agree: "",
      },
    };
  },
  methods: {
    demo() {
      //   console.log(JSON.stringify(this._data));
      console.log(this.userInfo);
      console.log(JSON.stringify(this.userInfo));
    },
  },
};
</script>
<style scoped></style>
