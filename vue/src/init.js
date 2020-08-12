import { initState } from "./state";

export function initMixin(Vue){
    //初始化操作
    Vue.prototype._init =function (options){
        const vm = this;
        vm.$options = options

        //初始化状态（将数据做一个初始化的劫持 当我改变数据时应该跟新视图）
        initState(vm)
        //vue组件中有很多状态 data props watcch computed


        //vue里面核心特性 响应式数据原理
        //vue 是一个什么样的框架 

        // MVVM 数据变化视图会更新，视图变化数据会被影响 MVVM不能跳过数据取跟新视图
    }
}