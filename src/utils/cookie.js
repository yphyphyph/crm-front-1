import cookie from 'vue-cookies'

let cookieUtil = {
    setCookie(key, value) {
        cookie.set(key, value);
    },
    getCookie(key) {
        return cookie.get(key)
    },
    deleteCookie(key) {
        cookie.remove(key);
    }
}

export default cookieUtil;
