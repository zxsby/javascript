//发布订阅  观察者模式

//实现异步并发 获取最终结果

let fs = require('fs')

let obj={}

const after = (times,callback) => ()=>{
    --times == 0 && callback()
}

let out = after(2,()=>{
    console.log(obj)
})

fs.readFile('./name.txt','utf8',(err,data) => {
    obj.name = data
    out()

})
fs.readFile('./age.txt','utf8',(err,data) => {
    obj.age = data
    out()
})