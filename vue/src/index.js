// new Vue({})

import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./vode/index"
import { initGlobalApi } from "./global-api/index"

// es6的类的写法 一个整体

function Vue(options){
    this._init(options) // 入口方法，做初始化操作 
}

initMixin(Vue)

lifecycleMixin(Vue) //_upadta

renderMixin(Vue)// _render

initGlobalApi(Vue)

export default Vue