export default {
    install(Vue){
        //全局过滤器
        Vue.filter('mySlice',function(value){
            return value.slice(0,4)
        })
        //定义混入
        Vue.mixin({
            data(){
                return{
                    x:100,
                    y:200
                }
            },
        })
        //给Vue原型上添加一个方法
        Vue.prototype.hello=()=>{
            alert("你好啊！")
        }
    },
}