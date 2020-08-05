// 宏任务 和 微任务

// vue2 中如何实现异步跟新的 多次修改数据但是页面只跟新一次

//异步的方法 无论是 微任务还是宏任务 都是要等待同步代码执行完毕
     
// vue2源码

// 数据更新完毕我们希望尽可能提前更新页面 先采用微任务 
//有些时候 微任务不执行 那我们可以在自己添加一个宏任务 （宏任务执行前 必须清空微任务）
//microtasks  微任务             macrotasks 宏任务 

//then  MutationObserver         setImmediate(ie兼容)  chrome某个版本支持  setTimeout
//                           click ajax script ui ... requestFrameAnimation
//                           messageChannel  i/o 

// 页面加载完毕后需要加载首屏数据  MutationObserver