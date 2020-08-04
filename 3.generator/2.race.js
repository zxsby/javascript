// Promise.all 方法所有的都成功了 才算成功，如果有一个失败就走失败 

// Promise.race 采用最先成功 或者最先失败的作为结果


//多个请求 采用最快的，或者可以自己封装中断方法
// Promise.race().then(data => {
//     console.log(data)
// }).catch(err=>{
//     console.log(err)
// })

const promise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('成功')
    },10000)
})

Promise.race = function(promises){
    return new Promise((resolve,reject)=>{
        promises.map((item) =>{
            if(item && typeof item.then =='function'){
                item.then(resolve,reject)
            }else{
                resolve(item)
            }
        })
    })
}



//xhr.abort() ajax有自己的中断方法 axios基于ajax实现
// fetch和ajax 没关系 fetch基于promise，他的请求无法中断


function wrap(promise){
    //在这里包装一个promise，可以控制原来的promise是成功还是失败
    let abort;
    let newPromise = new Promise((resolve,reject) => {
        abort = reject
    })  

    let p = Promise.race([promise,newPromise]) // 任何一个先成功或者失败，就可以获取到结果
    p.abort = abort
    return p
}


let newPromise = wrap(promise)

setTimeout(()=>{
    newPromise.abort('超时了')
},3000)

newPromise.then(data=>{
    console.log('成功的结果'+data)
}).catch(e=>{
    console.log('失败的结果'+e)
})