export function Proxy(vm,data,key) {
    Object.defineProperty(vm,key,{
        get(){
            return vm[data][key]
        },
        set(newValue){
            vm[data][key] = newValue
        }
    })
}

export function defineProperty(value,key,that){
    Object.defineProperty(value,key,{
        enumerable:false, // 不能被枚举 ，不能被循环
        configurable:false,
        value:that
    })
}