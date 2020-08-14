let id = 0
class Dep{
    constructor(){
        this.subs=[]
        this.id = id++
    }
    depend(){
        // 我们希望 watcher 可以存放dep
        Dep.target.addDep(this)
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    notify(){
        this.subs.forEach(watcher=>watcher.update())
    }
}
Dep.target = null
export function pushTarget(watcher){
    Dep.target = watcher //保留watcher
}
export function popTarget(){
    Dep.target = null //删除watcher
}

export default Dep

//多对多的关系  一个属性有一个dep 是用来收集watcher的
//dep可以存多个watcher 
// 一个watcher可以对应多个dep