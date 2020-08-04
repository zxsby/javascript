// all race finally

// promisify  把一个node中的api转换成promise的写法

const promisify = (fn)=>{
    return (...args) => {
        return new Promise((resolve,reject) => {
            fn(...args,function(err,data){
                if(err){
                    reject(err)
                }
                resolve(data)
            })
        })
    }
}