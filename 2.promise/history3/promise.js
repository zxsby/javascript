const ENUM = {
    PENDING:'PENDING', //等待
    FULFLLED:'FULFLLED',//成功
    REJECTED:'REJECTED'//失败
}

//根据x的值来解析promise2是成功resolve还是失败reject
//需要兼容其他人的promise
const resolvePromise = (x,proimse2,resolve,reject)=>{
     
}
class Promise {
    constructor(executor){
        this.status = ENUM.PENDING
        this.value = undefined //成功值
        this.reason = undefined // 失败值
        this.onResolvedCallbacks = [] //成功回调数组
        this.onRejectedCallbacks = [] //失败回调数组
        const resolve = (value) => {
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
}

module.exports = Promise