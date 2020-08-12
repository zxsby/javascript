// 拿到数组原型上的方法 （原有方法）
let oldArrayProtoMethds = Array.prototype

//继承一下

export let arrayMethods = Object.create(oldArrayProtoMethds)

let methods =[
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
]
methods.forEach(method=>{
    arrayMethods[method] = function(...args){
        const result = oldArrayProtoMethds[method].apply(this,args) // this就是Observer里的value
        let inserted;
        switch (method) {
            case 'push': // arr.push({a:1},{b:2})
            case 'unshift': //这两个方法都是追加 追加的内容可能是对象类型，应该被再次进行劫持
                inserted = args;
                break;
            case 'splice': // vue.$set原理
                inserted = args.slice(2); // arr.splice(0,1,{a:1},{a:1},{a:1})
            default:
                break;
        }
        if(inserted) this.__ob__.observeArray(inserted)    //给数组新增值也添加观测
        return result
    }
})