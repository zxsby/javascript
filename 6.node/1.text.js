Promise.resolve().then(()=>{ // then1
    console.log(1);
    Promise.resolve().then(()=>{ // then11
        console.log(11);
    }).then(()=>{
        console.log(22); // then22
    }).then(()=>{
        console.log(33); // then33
    })
}).then(()=>{ // then2
    console.log(2);
}).then(()=>{ // then3
    console.log(3);
})
// 1 11 2 22 3 33
// [,then3,then33]

//  微任务的执行顺序 由先入队列先执行 
// promise成功之后 才会放入then

// 1 11 2 22 3 33  
