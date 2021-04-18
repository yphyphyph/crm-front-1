import instance from "@/utils/request";

let good = {
    searchPage(parems) {
        return instance.get(`good`, {params: parems})
    },

    /**
     * 查询所有品牌
     * @returns {Promise<AxiosResponse<any>>}
     */

    getAllBrand() {
        return instance.get(`brand/findAll`);
    },
    /**
     * 添加商品
     * @param entity
     * @returns {Promise<AxiosResponse<any>>}
     */
    addEntity(entity) {
        return instance.post(`good`, entity);
    },

    /**
     * 修改商品
     * @param entity
     * @returns {Promise<AxiosResponse<any>>}
     */
    updateEntity(entity) {
        return instance.put(`good`, entity)
    },

    /**
     * 通过id查询
     * @param id
     * @returns {AxiosPromise}
     */
    findById(id) {
        return instance(`good/${id}`)
    },

    /**
     * 通过id删除
     */
    deleteById(id) {
        return instance.delete(`good/${id}`);
    },

    /**
     * 通过ids批量删除
     */

    batchDeleteByIds(ids) {
        return instance.delete(`good/batch/${ids}`)
    }


}

export default good;
