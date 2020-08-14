import { arrayMethods } from "./array"
import { defineProperty } from "../util.js"
import Dep from "./dep"

class Observer{
    constructor(value){
        //判断是否被观测过
        defineProperty(value,'__ob__',this)
        // 使用defineProperty 重新定义属性
        if(Array.isArray(value)){
            //调用push shift unshift splice sort reverse pop 
            //函数劫持，切片编程
            value.__proto__ = arrayMethods
            this.observeArray(value)//数组中普通类型是不做观测的
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
    let dep = new Dep()  //每个属性都有一个dep
    // 当页面取值时 说明这个值用来渲染了，将这个watcher和这个属性对应起来
    Object.defineProperty(data,key,{
        get(){
            if(Dep.target){ //让这个属性记住这个watcher
                dep.depend()
            }
            return value
        },
        set(newValue){
            if(newValue == value) return;
            observer(newValue)
            value = newValue
            dep.notify()
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

    //之观测存在的属性
    //数组中更改索引和长度 无法被监控
}