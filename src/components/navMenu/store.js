import $http from '@/http/api'
export default {
    namespaced: true,
    state: {
        navTree: '',
        collapse:false
    },
    mutations: {
        setNavTree(state, data) {
            
            state.navTree = data
        },
        setCollapse(state,data){
            state.collapse = data
        }
    },
    actions: {
       async addMenuList({commit}) {
            const { errorCode, data } = await $http.menuList();
            if (errorCode != "0000") {
                return false;
            }  
            commit('setNavTree',data)
            return data
        }
    }
}