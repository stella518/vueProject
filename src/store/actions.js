import * as types from './mutation-type'

const actions = {

    appendMenu({ commit }, menuItem) {
        if (menuItem.length > 0) {
            commit(types.APPEND_MENU, menuItem)
        }
    },
    loadRoutes({ commit }) {
        commit(types.LOAD_ROUTES)
    }
}
export default actions;