const ENUM = {
    PENDING:'PENDING', //等待
    FULFLLED:'FULFLLED',//成功
    REJECTED:'REJECTED'//失败
}

//根据x的值来解析promise2是成功resolve还是失败reject
//需要兼容其他人的promise
const resolvePromise = (x,proimse2,resolve,reject)=>{
    if(x === proimse2){
        reject(new TypeError('TypeError'))
    }
    // 如果x是一个promise 那么就采用他的状态
    //如何判断一个值是不是promise（看有没有then方法，有then方法说明是promise）
    if((typeof x === 'object' && x !== null) || typeof x === 'function'){
        //x是一个对象或者是一个函数
        //再进行一个判断
        //这里解析x，如果是一个promise的话，了能是别人家的promise
        let called;
        try{
            let then = x.then //取出then方法
            if(typeof then === 'function'){                                                                                        
                //就是promise,复用上次取出来额then方法，x-then
                then.call(x,(y)=>{
                    // 这里的y可能也是一个promise
                    if(called){
                        return
                    }
                    called = true
                    resolvePromise(y,proimse2,resolve,reject)//递归解析y的值知道这个结果是一个普通值，将结果作为promise2的成功或失败
                },(r)=>{
                   //一旦失败就直接失败 
                    if(called){
                        return
                    }
                    called = true
                    reject(r)
                })
            }else{
                resolve(x)
            }
        }catch(e){
            if(called){
                return
            }
            called = true
            reject(e)
        }
    }else{
        //普通值
        resolve(x)
    }
}
class Promise {
    constructor(executor){
        this.status = ENUM.PENDING
        this.value = undefined //成功值
        this.reason = undefined // 失败值
        this.onResolvedCallbacks = [] //成功回调数组
        this.onRejectedCallbacks = [] //失败回调数组
        const resolve = (value) => {
            // 如果value是一个promise，那么我们的库中应该也要实现一个递归解析
            if(value instanceof Promise){
                return value.then(resolve,reject)
            }
            if(this.status === ENUM.PENDING){//如果是等待态可以修改状态
                this.status = ENUM.FULFLLED
                this.value = value //赋值
                this.onResolvedCallbacks.forEach(fn => fn()) //成功后依次调用成功回调
            }
        }
        const reject = (reason) => {
            if(this.status === ENUM.PENDING){//如果是等待态可以修改状态
                this.status = ENUM.REJECTED
                this.reason = reason //赋值
                this.onRejectedCallbacks.forEach(fn => fn())//失败后依次调用失败回调
            }
        }
        try{
            executor(resolve,reject)
        }catch(e){
            reject(e)
        }
        
    }

    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled == 'function'?onFulfilled:v=>v
        onRejected = typeof onRejected == 'function'?onFulfilled:err=>{throw err}
        //调用then方法 创建一个新的promise
        let proimse2  = new Promise((resolve,reject)=>{
            // 我需要根据 x的状况来判断是调用resolve还是reject
            if(this.status == ENUM.FULFLLED){
                setTimeout(() => {
                    try{
                        let x = onFulfilled(this.value)
                        // 解析promise
                        resolvePromise(x,proimse2,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                },0)
              }
              if(this.status == ENUM.REJECTED){
                setTimeout(() => {
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(x,proimse2,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                },0)
              }
              if(this.status == ENUM.PENDING){ //用户还没有调用resolve或者reject
                  this.onResolvedCallbacks.push(()=>{
                    setTimeout(() => {
                        try{
                            let x = onFulfilled(this.value)
                            resolvePromise(x,proimse2,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    },0)
                  })
                  this.onRejectedCallbacks.push(()=>{
                    setTimeout(() => {
                        try{
                            let x = onRejected(this.reason)
                            resolvePromise(x,proimse2,resolve,reject)
                        }catch(e){
                            reject(e)
                        }
                    },0)
                  })
              }
        })
        return proimse2
    }
    catch(errCallback){
        return this.then(null,errCallback)
    }
    static resolve(value){
        return new Promise((resolve,reject)=>{
            resolve(value)
        })
    }
    static reject(reason){
        return new Promise((resolve,reject)=>{
            reject(reason)
        })
    }
}

//finally 传入的函数 无论成功1和失败都执行
Promise.prototype.finally = function (callback) {
    return this.then((value)=>{
        return Promise.resolve(callback()).then(()=>value)
    },(err)=>{
        return Promise.resolve(callback()).then(()=>{throw err})
    })
}
Promise.prototype.all = function (values) {
    let resultArr = []
    let count = 0 
    const processResultByKey = (value,index)=>{
        resultArr[index] = value
        if(++count == values.length){
            resolve(resultArr)
        }
    }
    return new Promise((resolve,reject)=>{
        for(let i=0; i<values.length; i++){
            let value = values[i]
            if(typeof value.then == 'function'){
                value.then((val)=>{
                    processResultByKey(val,i)
                },reject)
            }else{
                processResultByKey(value,i)
            }
        }
    })
}


module.exports = Promise