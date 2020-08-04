// 1.如果一个函数的参数中有函数那么当前这个函数就是高阶函数
// 2.如果一个函数返回了一个函数，那么当前这个函数就是高阶函数

//核心业务代码
function say (...args) {
    console.log(args)
    console.log('说话')
}

//扩展方法
//当前实例都可以调用
Function.prototype.before = function(callback){ // AOP 切片编程
    // this = say
    //剩余运算符 可以把所有参数组成一个数组列表
    return (...args) => { //newSay 箭头函数的特点没有this 没有arguments 没有prototype 不能new
        callback()
        this(...args) // apply 方法 将参数展开一次传入
    }
}

let newSay = say.before(() => {
    console.log('说话前')
})


newSay(1,2,3,4,5,6)
