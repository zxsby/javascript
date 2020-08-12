import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-server';

export default {
    input:'./src/index.js',//入口
    output:{
        format:'umd',//模块化的类型
        name:'Vue', //全局变量的名字
        file:'dist/umd/vue.js',
        sourcemap:true,

    },
    plugins:[
        babel({
            exclude:'node_modules/**'
        }),
        serve({ // 打开的浏览器 端口是3000端口
            port:3000,
            contentBase:'',
            openPage:'/index.html' // 打开页面是谁
         })
    ],
}