//传入按钮要执行的操作
export default (()=>{
    let timmer:any = null;
    return function(func:Function){
        clearTimeout(timmer);
        timmer = setTimeout(()=>{
            func();
        },300);
    }
})();