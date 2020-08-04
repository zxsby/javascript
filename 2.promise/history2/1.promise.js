//Promise 是一个类 需要new 这个类

// 1.executor 执行器 默认会立即执行
// 2.默认promise 的状态是等待态 (三个状态 等待 成功 失败)
// 3.当调用resolve 时 会变成成功状态 当调用reject时会变成失败状态
// 4.返回的实例上有一个then方法，then中需要提供两个参数，分别是成功对应的函数和失败对应的函数
// 5.如果同时调用成功和失败默认采取第一次调用结果
// 6.抛出异常就走失败
// 7.成功时可以传入成功的值，失败时可以传入失败的原因
let Promise = require('./promise.js')
let promise = new Promise((resolve ,reject) => { //resolve 成功的回调 reject失败的回调
   setTimeout(()=>{
    resolve('111')
   },5000)
})
promise.then((val) => {
    console.log('成功'+val)
},(reason)=>{
    console.log('失败'+reason)
})

// 1.同一个promise可以then多次 （发布订阅模式）
//调用then时 当前状态如果是等待态，我需要将成功和失败的回调分别进行存放 （订阅）
//调用resolve时 ，将订阅的函数依次执行（发布的过程）