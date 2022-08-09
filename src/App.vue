<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo"></MyHeader>
        <MyList :todos="todos"></MyList>
        <MyFooter
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllTodo="clearAllTodo"
        ></MyFooter>
        <!-- 练习小知识点专用组件 -->
        <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
        <lx-demo-school :getSchoolName="getSchoolName"></lx-demo-school>

        <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第一种写法，使用 @符 或v-on：）-->
        <lx-demo-student @haha="getStudentName" @demo="m1"></lx-demo-student>
        <!-- .once点击一次，在点没反应 -->
        <!-- <lx-demo-student v-on:haha.once="getStudentName"></lx-demo-student> -->

        <!-- 通过app的VM 实例对象就可以获取到lx-demo-student的组件对象，（第二种写法，使用ref）-->
        <!-- 第二种方法灵活性强，比如：想让app组件挂载之后，等待三秒钟，再给lx-demo-student组件实例绑定自定义事件，
          用第一种方法就无法实现，因为整个app里的模版在被解析的时候，在执行到第一种方法时候，v-on:haha="getStudentName"自定义事件，
          瞬间就给lx-demo-student组件的实例对象绑定完了，等待三秒，或者等待请求结束在绑定，那就写不下去了-->
        <!-- <lx-demo-student ref="student"></lx-demo-student> -->
      </div>
    </div>
  </div>
</template>

<script>
//订阅消息 pubsub插件
import pubsub from "pubsub-js";
import { statis } from "./components/demo";
import MyHeader from "./components/TodoList/MyHeader.vue";
import MyList from "./components/TodoList/MyList.vue";
import MyFooter from "./components/TodoList/MyFooter.vue";
// 练习小知识点专用组件
import LxDemoStudent from "./components/Lx/LxDemoStudent.vue";
import LxDemoSchool from "./components/Lx/LxDemoSchool.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    MyList,
    MyFooter,
    // 练习小知识点专用组件
    LxDemoStudent,
    LxDemoSchool,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  mounted() {
    //从1到100有多少个6？
    statis(1, 100, 6);
    console.log(statis(1, 500, 5));
    console.log(statis(1, 100, 6));

    //等待三秒在给组件的实例对象绑定ref
    // setTimeout(() => {
    // this.$refs.student.$on("haha", this.getStudentName);   //绑定自定义事件
    // this.$refs.student.$once("haha", this.getStudentName); //绑定自定义事件 （一次性）
    // }, 3000);
    this.$bus.$on("checkTodo", this.checkTodo);
    // this.$bus.$on("deleteTodo", this.deleteTodo);
    this.$bus.$on("updateTodo", this.updateTodo);
    this.pubId = pubsub.subscribe("deleteTodo", this.deleteTodo);
  },
  beforeDestroy() {
    this.$bus.$off("checkTodo");
    // this.$bus.$off("delet;eTodo");
    this.$bus.$off("updateTodo");
    pubsub.unsubscribe(this.pubId);
  },

  methods: {
    //添加一个todo
    addTodo(todoObj) {
      // console.log("我是APP组件，我收到了数据", todoObj);
      this.todos.unshift(todoObj);
    },
    //勾选or取消勾选一个todo
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done;
      });
    },
    //更新一个todo
    updateTodo(id, title) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.title = title;
      });
    },

    //删除一个todo
    deleteTodo(_, id) {
      // this.todos = this.todos.filter((todo) => todo.id !== id);
      this.todos = this.todos.filter((todo) => {
        return todo.id != id;
      });
    },
    //全选 or 取消全选
    checkAllTodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done;
      });
    },
    //清除所有已经完成的todo
    clearAllTodo() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done;
      });
    },
    // 以下是知识点练习的事件
    getSchoolName(name) {
      console.log("我是APP,收到了学校名：", name);
    },
    // 自定义事件
    getStudentName(name, ...params) {
      console.log("我是APP,收到了学生名：", name, params);
    },
    m1() {
      console.log("demo事件被触发了！！");
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}
.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 0px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}
.btn-danger {
  color: #fff;
  background: #da4f49;
  border: 1px solid #bd362f;
}
.btn-danger:hover {
  color: #fff;
  background: #bd362f;
}

.btn-edit {
  color: #fff;
  background: skyblue;
  border: 1px solid rgb(112, 186, 215);
}
.btn-edit:hover {
  color: #fff;
  background: rgb(95, 169, 199);
}
.btn:focus {
  outline: none;
}
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
