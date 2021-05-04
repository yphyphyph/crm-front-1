import {getCaptche, doLogin, getAdminInfo} from "@/api/login";
import auth from "@/utils/auth";

let login = {

    created() {
        this.getCaptcha();
    },
    data() {
        return {
            base64Str: '',
            loginForm: {
                uuid: '',
                username: '',
                password: '',
                captcha: ''
            }
        }
    },
    methods: {
        async getCaptcha() {
            this.loginForm.uuid = this.guid();
            this.base64Str = await getCaptche(this.loginForm.uuid)
        },

        async doLogin() {
            let token = await doLogin(this.loginForm);
            auth.setToken(token);
            this.getAdminInfo();
            // this.$router.push("/")
        },

        async getAdminInfo() {
            let response = await getAdminInfo();
            console.log(response);
            localStorage.setItem("userInfo", JSON.stringify(response.admin))
            localStorage.setItem("menuList", JSON.stringify(response.huige))
            localStorage.setItem("btnPerm", JSON.stringify(response.huigeBtn))
            this.$router.push("/");
        },

        //获得UUID的
        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
    }

}

export default login
