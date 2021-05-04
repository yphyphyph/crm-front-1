import instance from "@/utils/request";

let admin = {
    // //拿到所有部门 tree的形式
    // getAllDeptTree() {
    //     return instance.get(`dept/tree`)
    // },
    //
    // /**
    //  * 获取部门的一级数据
    //  */
    //
    // getRootDeptList() {
    //     return instance(`dept/root`);
    // }

    /**
     * 分页条件查询
     * @param id
     * @returns {AxiosPromise}
     */
    searchPage(param) {
        return instance('admin', {params: param})
    },
    getChildrenById(id) {
        return instance(`dept/${id}/children`);
    },

    getAreaChildrenById(id) {
        return instance(`area/${id}/children`);
    },


    addEntity(entity) {
        return instance.post(`admin`, entity);
    },

    updateEntity(entity) {
        return instance.put(`admin`, entity);
    },

    findById(id) {
        return instance.get(`admin/${id}`)
    },

    getDeptTree(id) {
        return instance.get(`dept/findParentByDeptId/${id}`)
    },

    deleteById(id) {
        return instance.delete(`admin/${id}`)
    },
    batchDelete(ids) {
        return instance.delete(`admin/batch/${ids}`)
    },
    exportExcel() {
        return instance(`admin/export`)
    }
}

export default admin;
