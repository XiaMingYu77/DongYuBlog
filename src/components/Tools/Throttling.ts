//节流
export default (()=>{
    let ticking = false;
    return function(func:Function){
        if(!ticking){
            ticking = true;
            window.requestAnimationFrame(()=>{
                func();
                ticking = false;
            })
        }
    }
})();