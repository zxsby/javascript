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