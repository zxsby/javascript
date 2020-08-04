
let fs = require('fs')

let obj ={}
//发布和订阅之间没有任何的联系
let event = {
    _arr:[],
    on(fn){ //订阅事件
      this._arr.push(fn)
    },
    emit(){ //发布事件
        this._arr.forEach(fn=>fn())
    }
}

event.on(function() {

})
event.on(function() {
    if(Object.keys(obj.length) === 2){

    }
})

fs.readFile('./name.txt','utf8',(err,data) => {
    obj.name = data
    event.emit()
})
fs.readFile('./age.txt','utf8',(err,data) => {
    obj.age = data
    event.emit()
})

