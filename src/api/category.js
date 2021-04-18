import instance from "@/utils/request";


/**
 * 分页条件查询
 */
export function findPage(searchParams) {
    return instance.get(`category`, {params: searchParams})
}

/**
 * 找孩子
 */
export function getChildren(id) {
    return instance.get(`category/${id}/children`)
}

/**
 * 根据选择添加等级查询数据
 */
export function getCategoryByChooseLevel(level) {
    return instance.get(`category/choose/${level}`)
}

/**
 * 添加功能
 */
export function addEntity(entity) {
    return instance.post(`category`, entity)
}

/**
 * 修改功能
 */
export function updateEntity(entity) {
    return instance.put(`category`, entity)
}

/**
 * 删除分类（级联操作）
 */

export function deleteCategory(id, level) {
    return instance.delete(`category/cascade/${id}/${level}`)
}

/**
 * 通过id查询
 */
export function findById(id) {
    return instance.get(`category/${id}`);
}

