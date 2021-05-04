import cookieUtil from "@/utils/cookie";

let tokenkey = "adminToken"
let adminKey = "adminInfo"
let menuList = "routerList";
let btnPerms = "btnPerms";

let auth = {
    setToken(token) {
        cookieUtil.setCookie(tokenkey, token);
    },
    getToken() {
        return cookieUtil.getCookie(tokenkey);
    },
    removeToken() {
        cookieUtil.deleteCookie(tokenkey);
    },


    setUserInfo(admin) {
        cookieUtil.setCookie(adminKey, JSON.stringify(admin));
    },
    getUserInfo() {
        return cookieUtil.getCookie(adminKey);
    },
    removeUserInfo() {
        cookieUtil.deleteCookie(adminKey);
    },


    setMenuList(routeList) {
        cookieUtil.setCookie(menuList, JSON.stringify(routeList));
    },
    getMenuList() {
        return cookieUtil.getCookie(menuList);
    },
    removeMenuList() {
        cookieUtil.deleteCookie(menuList);
    },


    setBtnPerms(perm) {
        cookieUtil.setCookie(btnPerms, JSON.stringify(perm));
    },
    getBtnPerms() {
        return cookieUtil.getCookie(btnPerms);
    },
    removeBtnPerms() {
        cookieUtil.deleteCookie(btnPerms);
    },


    clearAllCookie() {
        this.removeToken();
        this.removeUserInfo();
        this.removeMenuList();
        this.removeBtnPerms();
    }

}
export default auth;
