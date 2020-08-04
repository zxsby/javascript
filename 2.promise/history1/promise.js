const ENUM = {
    PENDING:'PENDING', //等待
    FULFLLED:'FULFLLED',//成功
    REJECTED:'REJECTED'//失败
}

class Promise {
    constructor(executor){
        this.status = ENUM.PENDING
        this.value = undefined
        this.reason = undefined
        const resolve = (value) => {
            if(this.status === ENUM.PENDING){//如果是等待态可以修改状态
                this.status = ENUM.FULFLLED
                this.value = value
            }
        }
        const reject = (reason) => {
            if(this.status === ENUM.PENDING){//如果是等待态可以修改状态
                this.status = ENUM.REJECTED
                this.reason = reason
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
    }
}

module.exports = Promise