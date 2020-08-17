export let _Vue

export default function install(Vue,options){
    // 插件安装的入口
    _Vue =Vue

    //给所有组件混入一个属性router
    Vue.mixin({
        beforeCreate() {
            // 将父组件传入的router实例共享给所有子组件
            if(this.$options.router){
                this._routerRoot = this //给当前根组件增加一个属性 _routerRoot 代表的是他自己
                this._router = this.$options.router

                this._router.init(this)  //这里的this就是根实例
            }else{
                //组件渲染是一层层的渲染
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
            // 无论是父组件还是子组件 都可以通过 this._routerRoot._router 获取共同的实例

        },
    })
    //插件一般用于定义全局组件 全局指令 过滤器 原型方法
    Vue.component('router-link',{
        render:(h)=> {
            return <h1></h1>
        },
    })
    Vue.component('router-view',{
        render:(h)=> {
            return <h1></h1>
        },
    })

    Vue.prototype.$route = {}
    Vue.prototype.$router = {}
}


