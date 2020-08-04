const ENUM = {
    PENDING:'PENDING', //等待
    FULFLLED:'FULFLLED',//成功
    REJECTED:'REJECTED'//失败
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
        if(this.status == ENUM.FULFLLED){
            onFulfilled(this.value)
        }
        if(this.status == ENUM.REJECTED){
            onRejected(this.reason)
        }
        if(this.status == ENUM.PENDING){ //用户还没有调用resolve或者reject
            this.onResolvedCallbacks.push(()=>{
                onFulfilled(this.value)
            })
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason)
            })
        }
    }
}

module.exports = Promise