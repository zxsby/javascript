import Vue from 'vue'
import Router from './vue-router'  // Router是一个插件
import Home from './views/Home'
import About from './views/About'

Vue.use(Router) // 使用这个插件 内部会提供给你两个全局组件 router-link router-view 并且还会提供原型上的属性 $router $route

// 路由： 不同的路径 渲染不同的组件


//路由导出后需要在实例中引用
export default new Router({
    mode:'hash',
    routes:[
        {
            path:'/',
            component:Home
        },
        {
            path:'/about',
            component:About,
            children:[
                {
                    path:'a',
                    component: {
                        render:(h) => {
                            return <h1>about A</h1>
                        }
                    }
                },
                {
                    path:'b',
                    component: {
                        render:(h) => {
                            return <h1>about B</h1>
                        }
                    }
                }
            ]
        }
    ]
})