import install from './install'
import createMatcher from './create-matcher'
class VueRouter {
    constructor(options){
        //根据用户的配置和当前请求的路径 渲染对应组件

        // 创建匹配器 可以用于后续的匹配操作
        // 用户没有传递配置 就默认传入一个空数组
        // 1.match通过路由来匹配组件
        // 2.addRoutes 动态添加匹配规则
        createMatcher(options.routes || [])
    }
    init(app){ //初始化操作

    }
}

VueRouter.install = install

export default VueRouter