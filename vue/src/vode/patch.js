import { Proxy } from "../util"

export function patch(oldVnode,vnode){
    //将虚拟节点转换成真实节点
    let el = createElm(vnode) //产生真实的dom
    let parentElm = oldVnode.parentNode // 获取老的app的父亲
    parentElm.insertBefore(el,oldVnode.nextSibling) //当前的真实元素插入到app的后面
    parentElm.removeChild(oldVnode)
    return el
}


function createElm(vnode){
    let {tag,children,key,data,text} = vnode
    if(typeof tag == 'string'){ 
        vnode.el = document.createElement(tag) // 创建元素放到vnode.el上

        //只有元素才有属性
        updateProperties(vnode)
        children.forEach(child => { // 遍历儿子 将儿子渲染后的结果扔到父亲中
            vnode.el.appendChild(createElm(child))
        })
    }else{//创建文件 放到vnode.el上
        vnode.el = document.createTextNode(text)
    }
    return vnode.el
}


function updateProperties(vnode){
    let el = vnode.el
    let newProps = vnode.data || {}
    for(let key in newProps){
        if(key=='style'){
            for(let styleName in newProps.style){
                el.style[styleName] = newProps.style[styleName]
            }
        }else if(key == 'class'){
            el.className = el.class
        }else{
            el.setAttribute(key,newProps[key])
        }
    }
}