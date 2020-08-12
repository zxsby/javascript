// new Vue({})

import { initMixin } from "./init"

// es6的类的写法 一个整体

function Vue(options){
    this._init(options) // 入口方法，做初始化操作 
}

initMixin(Vue)



export default Vue