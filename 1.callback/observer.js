// 观察者模式 （基于发布订阅的，而且观察者模式发布订阅之间是有联系的）

//观察者模式 观察者，被观察者 (被观察者需要收集所有的观察者)

class Subject{ //被观察者
    constructor(name){
        this.name = name
        this.observers = []
        this.state = '开心'
    }
    attach(o){
        this.observers.push(o)
    }
    setState(newState){
        this.state = newState
        this.observers.forEach(o=>o.updated(this))
    }
}

class Observer{ //观察者
    constructor(name){
        this.name = name
    }
    updated(baby){
        console.log(baby.state)
    }
}

//被观察者需要收集所有的观察者

let baby = new Subject('小宝宝')
let o1 = new Observer('爸爸')
let o2 = new Observer('妈妈')
baby.attach(o1)
baby.attach(o2)
baby.setState('不开心')