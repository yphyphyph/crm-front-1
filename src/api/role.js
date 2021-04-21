import instance from "@/utils/request";

/**
 * 分页条件查询
 */
export function findPage(searchParams) {

    /*  qs {name:"辉哥",age:18} => name=辉哥&age=18  stringtify
    *
    *  axios本身的写法
    *
    * */
    return instance.get(`role`, {params: searchParams})
}

/**
 * 通过id删除
 */

export function deleteById(id) {
    return instance.delete(`role/${id}`)
}

/**
 * 批量删除
 */

export function batchDelete(ids) {
    return instance.delete(`role/batch/${ids}`)
}

/**
 * 添加功能
 */
export function addEntity(entity) {
    return instance.post(`role`, entity);
}

/**
 * 通过id查询
 */

export function findById(id) {
    return instance.get(`role/${id}`);
}

/**
 * 修改实体
 */
export function updateEntity(entity) {
    return instance.put(`role`, entity);
}

/**
 * 查询所有的角色
 * @returns {Promise<AxiosResponse<any>>}
 */
export function  findAll(){
    return instance.get(`role/findAll`);
}
