import {useEffect,useRef} from 'react';
// 有些场景我们不想在首次渲染时就执行 effect。比如搜索时，只在 keyword 变化时才调用 search 方法
// 实现方法：useUpdateEffect，它会忽略 useEffect 首次执行，只在依赖更新时执行。


// 用于记录当前渲染是否是首次渲染
function useFirstMountState(){
    const isFirst=useRef(true);//不会因为重复 render 重复申明， 类似于类组件的 this.xxx
    if(isFirst.current){//如果是首次，就改变状态并返回true
        isFirst.current=false;
        return true;//调用该函数得到true，表示为首次渲染
    }
    return isFirst.current;
}
function useUpdateEffect(effect,deps){
    const isFirstMount=useFirstMountState();//是否是首次渲染
    useEffect(()=>{
        if(!isFirstMount){//如果不是首次渲染，就执行effect函数
            return effect();
        }
    },deps);
}


