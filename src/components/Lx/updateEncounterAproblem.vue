<template>
  <div class="key">
    <h2>人员列表</h2>
    <button @click="updateMei">更新马冬梅的信息</button>
    <ul>
      <li v-for="p in filPerons" :key="p.id">
        <!-- 注意 :key="p.id" 节点复用问题 -->
        {{ p.name }}-{{ p.age }}-{{ p.sex }}
        <input type="text" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyWord: "",
      sortType: 0, //0原顺序 1降序 2升序
      persons: [
        { id: "001", name: "马冬梅", age: 30, sex: "女" },
        { id: "002", name: "周冬雨", age: 31, sex: "女" },
        { id: "003", name: "周杰伦", age: 18, sex: "男" },
        { id: "004", name: "温兆伦", age: 19, sex: "男" },
      ],
    };
  },
  // 用computed实现
  computed: {
    filPerons() {
      //先过滤后排序
      const arr = this.persons.filter((p) => {
        return p.name.indexOf(this.keyWord) !== -1;
      });
      //判断一下是否需要排序
      if (this.sortType) {
        //拿过滤完的数组进行排序，先过滤后排序
        arr.sort((p1, p2) => {
          //函数体
          return this.sortType === 1 ? p2.age - p1.age : p1.age - p2.age;
        });
      }
      return arr;
    },
  },

  methods: {
    updateMei() {
      this.persons[0] = {
        id: "001",
        name: "马老师",
        age: 50,
        sex: "男",
      };
    },
  },
};
</script>

<style></style>
