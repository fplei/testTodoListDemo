/***
 * 题目：从1到100里，有多少个6？
 * 
 * 
 * ***/
//从start到end有多少个C
function statis(start, end, c) {
  let count = 0; //计数器

  //遍历start到end
  for (let i = start; i <= end; i++) {
    var left = i; // left 当前要处理的数

    while (left > 0) {
      //获取当前数的每一位
      let last = left % 10; //获取个位数
      left = parseInt(left / 10); //去取个位后的数据
      if (last == c) count++;
    }
  }
  return count;
}
export { statis };
