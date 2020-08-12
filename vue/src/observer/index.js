import { arrayMethods } from "./array"

class Observer{
    constructor(value){
        //判断是否被观测过
        Object.defineProperty(value,'__ob__',{
            enumerable:false, // 不能被枚举 ，不能被循环
            configurable:false,
            value:this
        })
        // 使用defineProperty 重新定义属性
        if(Array.isArray(value)){
            //调用push shift unshift splice sort reverse pop 
            //函数劫持，切片编程
            value.__proto__ = arrayMethods
            this.observeArray(value)
        }else{
            this.walk(value)
        }
    }
    observeArray(value){ //观测数组
        value.forEach(item =>{
            observer(item)//观测数组中的对象
        })
    }
    walk(data){
        let keys = Object.keys(data)// 获取对象的key
        keys.forEach(key =>{
            defineReactive(data,key,data[key])
        })
    }
}

function defineReactive(data,key,value){
    observer(value)
    Object.defineProperty(data,key,{
        get(){
            return value
        },
        set(newValue){
            if(newValue == value) return;
            observer(newValue)
            value = newValue
        }
    })
}
export function observer(data){
    if(typeof data !== 'object' || data == null){
        return
    }
    if(data.__ob__){
        return
    }
    return new Observer(data)
}