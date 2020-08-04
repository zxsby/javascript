//finally实现原理

// const Promise = require("./promise")

// //finally 传入的函数 无论成功1和失败都执行
// Promise.prototype.finally = function (callback) {
//     return this.then((value)=>{
//         return Promise.resolve(callback()).then(()=>value)
//     },(err)=>{
//         return Promise.resolve(callback()).then(()=>{throw err})
//     })
// }
// new Promise.resolve(1).finally(()=>{
//     //如果返回的是成功的promise 会采用上一次的结果
//     //如果返回的失败的promise 会用这个失败的结果，传入到catch中

// }).then((res) => {

// }).catah(err=> {
//     console.log(err)
// })

// all 的实现原理
// promise.all 解决异步并发 多个异步并发获取最终结果


// Promise.prototype.all = function (values) {
//     let resultArr = []
//     let count = 0 
//     const processResultByKey = (value,index)=>{
//         resultArr[index] = value
//         if(++count == values.length){
//             resolve(resultArr)
//         }
//     }
//     return new Promise((resolve,reject)=>{
//         for(let i=0; i<values.length; i++){
//             let value = values[i]
//             if(typeof value.then == 'function'){
//                 value.then((val)=>{
//                     processResultByKey(val,i)
//                 },reject)
//             }else{
//                 processResultByKey(value,i)
//             }
//         }
//     })
// }