async function async1(){ // node 11 结果不太一样
    console.log('async1 start');
    // node的其他版本可能会把await 解析出两个then 来
    await async2(); // Promise.resolve(async2()).then(()=>{console.log('ok')})
}
async function async2(){
    console.log('async2');
}
console.log('script start');
setTimeout(() => {
    console.log('setTimeout')
}, 0);
async1();
new Promise(function(resolve){
    console.log('promise1');
    resolve()
}).then(function(){
    console.log('script end')
})
// 宏任务 [setTimeout] 
// 微任务 []
// script start   async1 start    async2     promise1      script end         setTimeout       