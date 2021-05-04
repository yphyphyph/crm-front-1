import instance from "@/utils/request";


export function getCaptche(uuid) {
    return instance.get(`common/getCaptcha/${uuid}`)
}

export function doLogin(form) {
    return instance.post(`common/doLogin`, form);
}


export function getAdminInfo() {
    return instance.get(`common/getAdminInfo`)
}
