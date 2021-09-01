import $http from '@/http/api'
export default {
    namespaced: true,
    state: {
        navTree: []
    },
    mutations: {
        setNavTree(state, data) {
            state.navTree = data
        }
    },
    actions: {
       async addMenuList({commit}) {
            const { errorCode, data } = await $http.menu.menuList();
            if (errorCode != "0000") {
                return;
            }
            commit('setNavTree',data)
            return data
        }
    }
}