//generator = redux-saga (generator) 可以暂停

//generator 生成器 生成迭代器 iterator

//类数组转化成数组
//[...args]  // 需要迭代器
//Array.from(args) // 不需要迭代器

// let likeArray = {'0':1,'1':2,'2':3,'3':4,length:4} // 默认这样写数组是不能被迭代的，缺少迭代方法

// js的基础数据类型 ， Symbol中有很多“元编程”的方法，可以更改js本身的功能
// likeArray[Symbol.iterator] = function(){
//     // 迭代器是一个对象， 对象中有next方法，每次调用next 都需要返回一个对象 {value，done}
//     let index = 0
//     return {
//         next:() => {
//             return {value:this[index],done:index ++ === this.length}
//         }
//     }
// }
// likeArray[Symbol.iterator] = function * (){
//     // 迭代器是一个对象， 对象中有next方法，每次调用next 都需要返回一个对象 {value，done}
//     let index = 0
//     while(index !==this.length){
//         yield this[index++];
//     }
// }
// console.log([...likeArray])
// console.log(Array.from(likeArray)) // 不需要迭代器

//迭代器的作用，没有迭代器的数据，不能被迭代（不能被循环）

//生成器 es6的一个api

// function * read(){ // generator 函数，碰到yeild就会暂停
//     yield 1; //yield 生产 产出
//     yield 2;
//     return undefined
// }
//生成器返回的是迭代器

// let it = read()
// console.log(it.next())



//通过generator 来忧患 promise (promise的缺点是 不停的回调 不停的链式调用)
const fs = require('fs').promises

function * read(){
    let content = yield fs.readFile('./name.text','utf8')
    let age = yield fs.readFile(content,'utf8')
    return age
}

// let it = read();   

// let{value,done} = it.next()
// value.then(data=>{
//     let{value,done} = it.next()
//     value.then(data => {
//         let{value,done} = it.next()
//         console.log(value,done)
//     })
// })