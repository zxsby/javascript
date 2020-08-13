import { observer } from "./observer/index"
import { Proxy } from "./util.js"

export function initState (vm){ // vm.$options
    const opts = vm.$options
    if(opts.props){
        initProps(vm)
    }
    if(opts.methods){
        initMethods(vm)
    }
    if(opts.data){
        initData(vm)
    }
    if(opts.computed){
        initComputed(vm)
    }
    if(opts.watch){
        initWatch(vm)
    }
}

function initProps(vm){

}
function initMethods(vm){

}

function initData(vm){
    let data = vm.$options.data // 数据的初始化操作
    vm._data = data = typeof data == 'function' ? data.call(vm):data


    //当我去vm上取属性时，帮我将属性的取值代理到vm._data上
    for(let key in data){
        Proxy(vm,'_data',key)
    }

    //数据的劫持方案 对象的  Object.defineProperty
    observer(data);
    //数组是单独处理的
   
}
function initComputed(vm){

}
function initWatch(vm){

}