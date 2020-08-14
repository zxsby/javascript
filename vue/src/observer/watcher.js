import { pushTarget, popTarget } from "./dep"

let id = 0
class Watcher{
    //vm 实例
    //extrOrFn vm._updatae(vm._render)
    constructor(vm,estrOrFn,cb,options){
        this.vm = vm
        this.estrOrFn = estrOrFn
        this.cb = cb
        this.options = options
        this.id = id++ //watcher的唯一标识
        this.deps = [] //watcher 记录有多少dep来依赖他
        this.depsId = new Set()
        if( typeof estrOrFn == 'function'){
            this.getter = estrOrFn
        }
        this.get() //默认会调用get方法
    }
    addDep(dep){
        let id = dep.id
        if(!this.depsId.has(id)){
            this.deps.push(dep)
            this.depsId.add(id)
            dep.addSub(this)
        }
        
    }
    get(){
        pushTarget(this) //当前watcher实例
        this.getter() // 调用estrOrFn 这里是渲染页面 render方法
        popTarget()
    }
    update(){
        this.get()
    }
    
}

export default Watcher