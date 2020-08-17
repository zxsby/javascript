import createRouterMap from "./create-router-map"

export default function createMatcher(routes){

    let {pathMap} = createRouterMap(routes)  // 扁平化配置
    function match(){

    }
    function addRoutes(routes){
        createRouterMap(routes,pathMap)
    }
    return {
        addRoutes, // 添加路由
        match //用于匹配路径
    }
}