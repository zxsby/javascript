//Promise 是一个类 需要new 这个类

// 1.executor 执行器 默认会立即执行
// 2.默认promise 的状态是等待态 (三个状态 等待 成功 失败)
// 3.当调用resolve 时 会变成成功状态 当调用reject时会变成失败状态
// 4.返回的实例上有一个then方法，then中需要提供两个参数，分别是成功对应的函数和失败对应的函数
// 5.如果同时调用成功和失败默认采取第一次调用结果
// 6.抛出异常就走失败
// 7.成功时可以传入成功的值，失败时可以传入失败的原因
// let Promise = require('./promise.js')
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


//链式调用 （上一次的输出是下一次的输入）
//1.如何执行 恶魔金字塔 （1.处理错误不方便 2.代码不方便维护）
//2.promise可以通过the连来简化流程 

let fs = require('fs')

function read(url){
    return new Promise((resolve,reject)=>{
        resolve(100)
        // fs.readFile(url,'utf8',function(err,data){
        //     if(err){
        //         reject(err)
        //     }
        //     resolve(data)
        // })
    })
}

//then的使用方法 普通值意味着不是promise
//1.then中的回调有两个方法，成功或者失败，他们的返回结果（普通值） 会传递给外层的下一个then中
//2.可以在成功和失败中抛出异常，会走到下一次then的失败中
//3.返回的是一个promise，那么会用这个promise的状态来作为结果,会用promise的结果向下传递
//4.错误处理 是默认先找最近的错误处理 ，如果找不到接着向下找，找到后执行。（catch是没有成功的then）

//then中抛出异常 或者返回一个失败的promise 都会执行错误
read('./name.txt').then(data=>{
    return 123
}).then(data=>{
    console.log(data)
})

//一旦成功不能失败 一旦失败不能成功
//promise.then的实现原理 通过返回一个新的promise来实现的

