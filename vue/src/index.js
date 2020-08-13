// new Vue({})

import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./vode/index"

// es6的类的写法 一个整体

function Vue(options){
    this._init(options) // 入口方法，做初始化操作 
}

initMixin(Vue)

lifecycleMixin(Vue) //混和生命周期

renderMixin(Vue)

export default Vue