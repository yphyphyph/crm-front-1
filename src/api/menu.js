import instance from "@/utils/request";

let menu = {
    searchPage(searchForm) {
        return instance.get(`menu`, {params: searchForm})
    },

    /**
     * 获得所有的菜单 tree
     */

    getAllMenuTree() {
        return instance.get(`menu/tree`)
    },

    /**
     * 添加
     */
    addEntity(entity) {
        return instance.post(`menu`, entity);
    },

    /**
     * 修改的功能
     */
    updateEntity(entity) {
        return instance.put(`menu`, entity);
    },
    findById(id){
        return instance.get(`menu/${id}`)
    },

    deleteById(id){
        return instance.delete(`menu/${id}`)
    },
}

export default menu;
