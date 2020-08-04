// 函数柯里化
//判断一个元素的类型

//类型判断应该使用什么方法来判断
//1.typeof 不能区分对象类型 
//2.constructor ([]).constructor 可以判断这个实例是谁构造出来的
//3.instanceof 区分实例__proto__
//4.object.prototype.toString.call() 区分具体类型 （不能区分实例）


// function isType(content, typing) {
//     return Object.prototype.toString.call(content) === `[object ${typing}]`
// }

// //内置参数 isString() isNumber()
// console.log(isType('hello','String'))

// //细化函数的功能 让他变得更具体一些(柯里化的作用)
// const isType = (typing)=>(value) => {
//     return Object.prototype.toString.call(value) === `[object ${typing}]`
// }

// let util = {};
// ['String','Number','Null','Undefined'].forEach((typing) => {
//     util['is'+typing] = isType(typing)
// })

// console.log(util.isString('111'))

//偏函数 表示也是分开传递参数 但是参数个数不一定是一个

//通用的函数柯里化

// function sum(a,b,c,d){

// }
const curring = (fn,arr = []) =>{ //arr记录调用函数时传入的参数个数 和 函数fn=>(sum) 个数的关系
    let len = fn.length //fn函数参数的个数 == sum参数个数
    return (...args) => {//每次传入的参数 == 调用newSum传入的参数
        let concatArgs = [...args,...arr]//新传入的与之前传入的组成新数组
        if(concatArgs.length<len){
           return curring(fn,concatArgs) //递归
        }else{
           return fn(...concatArgs) // 执行fn->(sum)并传入参数
        }
    }
}

// let newSum = curring(sum)

// newSum(1)(2)(3)(4)


function isType(content,typing) {
    return Object.prototype.toString.call(content) === `[object ${typing}]`
}

let util = {};
['String','Number','Null','Undefined'].forEach((typing) => {
    util['is'+typing] = curring(isType)(typing)
})

console.log(util.isString(11111))