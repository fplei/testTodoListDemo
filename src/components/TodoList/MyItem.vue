<template>
  <div>
    <li>
      <label>
        <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)" />
        <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
        <!-- <input type="checkbox" v-model="todo.done" /> -->
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
          v-show="todo.isEdit"
          type="text"
          :value="todo.title"
          @blur="handleBlur(todo, $event)"
          ref="inputTitle"
        />
      </label>
      <div class="btn-content">
        <button class="btn btn-edit" v-show="!todo.isEdit" @click="handleEdit(todo)">
          编辑
        </button>
        <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
      </div>
    </li>
  </div>
</template>

<script>
//订阅消息 pubsub插件
import pubsub from "pubsub-js";
export default {
  name: "MyItem",
  //声明接受todo对象
  props: ["todo"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.todo);
  },
  methods: {
    //勾选 or 取消勾选
    handleCheck(id) {
      console.log(id);
      //通知app组件将对应的todo对象的done值取反
      // this.checkTodo(id);
      this.$bus.$emit("checkTodo", id);
    },
    //删除
    handleDelete(id) {
      if (confirm("确定删除吗？")) {
        console.log(id);
        // this.deleteTodo(id);
        // this.$bus.$emit("deleteTodo", id);
        pubsub.publish("deleteTodo", id);
      }
    },
    //编辑
    handleEdit(todo) {
      // console.log(todo);
      //如果todo身上有isEdit todo是个对象 身上isEdit可能是false，
      //所以借用hasOwnProperty来判断我的身上有没有isEdit属性，如果有就直接改，如果没有就追加
      if (todo.hasOwnProperty("isEdit")) {
        todo.isEdit = true;
      } else {
        console.log("todo身上没有isEdit，追加了一个");
        //给todo添加一个isEdit，开始是没有的
        this.$set(todo, "isEdit", true);
      }
      //会推向队列去执行
      // setTimeout(() => {
      //   //获取焦点
      //   this.$refs.inputTitle.focus();
      // }, 200);
      /**重新解析完模版，整个DOM更新完之后，再去调用this.$refs.inputTitle.focus()函数，
      然后就去解析模版了，然后input框就出现在页面了，然后就执行了this.$refs.inputTitle.focus()函数，
      DOM执行完毕，就可以获取焦点了。*/
      this.$nextTick(function () {
        //获取焦点
        this.$refs.inputTitle.focus();
      });
    },
    //失去焦点回调（真正执行修改逻辑）
    handleBlur(todo, e) {
      todo.isEdit = false;
      // console.log("updateTodo", todo.id, e.target.value);
      if (!e.target.value.trim()) {
        return alert("输入不能为空！！！");
      }
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}
li .btn-content {
  display: flex;
  justify-content: right;
}
li button {
  /* float: right; */
  margin-right: 5px;
  display: none;
  margin-top: 3px;
}
li:before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
li:hover {
  background: #ddd;
}
li:hover button {
  display: block;
}
</style>
