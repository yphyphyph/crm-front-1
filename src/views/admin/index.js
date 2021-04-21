import admin from "@/api/admin";
import {findAll} from "@/api/role"
import dateOptions from "@/utils/date";
import base64 from '@/utils/base64Utils'
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


let brand = {
    components: {Treeselect},
    name: "index",
    data() {
        return {
            dateOptions,
            tableData: [],
            total: 0,
            searchParams: {
                currentPage: 1,
                pageSize: 5
            },
            normalizer(node) {
                return {
                    id: node.id,
                    label: node.deptName,
                    children: node.children,
                }
            },
            batchIds: [],
            dialogVisible: false,
            formData: {},
            deptList: [],
            province: '',
            city: '',
            area: '',
            provinceList: [],
            cityList: [],
            areaList: [],
            roleList: [],
        }
    },
    created() {
        this.searchPage();
        this.getRootDeptList();
        this.getAllProvince();
        this.getAllRole();
    },
    methods: {
        /**
         * 查询所有的一级部门
         */
        async getRootDeptList() {
            this.deptList = await admin.getChildrenById(0);
        },

        /**
         * 加载treeselect数据的
         */
        async loadTreeSelectData({action, parentNode, callback}) {
            let response = await admin.getChildrenById(parentNode.id);
            parentNode.children = response;

        },
        /*
        * 查询所有
        */
        async searchPage() {
            let response = await admin.searchPage(this.searchParams);
            this.total = response.total;
            this.tableData = response.data;
        },

        /**
         * 获得所有的省
         */
        async getAllProvince() {
            this.provinceList = await admin.getAreaChildrenById(0);
        },

        /**
         * 获得所有的市
         */
        async getAllCity(name) {
            let index = this.provinceList.findIndex(item => item.name == name);
            let item = this.provinceList[index];
            this.cityList = await admin.getAreaChildrenById(item.id)
        },

        /**
         * 获得所有的区
         */
        async getAllArea(name) {
            let index = this.cityList.findIndex(item => item.name == name);
            let item = this.cityList[index];
            this.areaList = await admin.getAreaChildrenById(item.id)
        },


        /**
         * 加载所有的角色
         * @param response
         */
        async getAllRole() {
            this.roleList = await findAll()
        },


        uploadSuccess(response) {
            this.formData.adminAvatar = response.data;
        },
        /**
         * 通过id删除
         */
        async deleteById() {
            await admin.deleteById(this.formData.id);
            this.searchPage();
        },

        /**
         * 批量删除
         * @param val
         */
        async batchDeleteByIds() {
            await admin.batchDelete(this.batchIds);
            this.searchPage();
        },

        /**
         * 添加数据
         * @param val
         */
        async addOrEdit() {
            this.formData.adminAddress = this.province + " " + this.city + " " + this.area + " " + this.formData.adminAddress;
            if (this.formData.id) {
                //修改
                await admin.updateEntity(this.formData);
            } else {
                await admin.addEntity(this.formData);
            }
            this.searchPage();
        },

        /**
         * 通过id查询
         * @param val
         */
        async findById() {
            this.formData = await admin.findById(this.formData.id)
            this.deptList = await admin.getDeptTree(this.formData.deptId);
            let array = this.formData.adminAddress.split(" ")
            this.province = array[0];
            //拿到省的id 获取市区
            await this.getAllCity(this.province);
            this.city = array[1];
            await this.getAllArea(this.city);
            this.area = array[2];
            let address = ''
            for (let i = 3; i < array.length; i++) {
                address += array[i] + " "
            }
            this.formData.adminAddress = address;


        },
        //checkbox勾选改变
        selectChange(val) {
            if (val.length == 1) {
                this.formData.id = val[0].id;
            } else {
                this.formData.id = 0;
            }
            this.batchIds = val.map(item => item.id);
        },
        //选择页数的时候 发生概念
        currentPageChange(page) {
            this.searchParams.currentPage = page;
            this.searchPage();
        },
        //时间框选择时间
        chooseTime() {
            this.searchParams.startTime = this.dateOptions.startDate[0];
            this.searchParams.endTime = this.dateOptions.startDate[1];
        },
        resetForm() {
            this.searchParams = {currentPage: 1, pageSize: 5}
            this.dateOptions.startDate = '';
        },
        resetFormData() {
            this.formData = {
                adminAvatar: '',
                gender: 0,
                isEnable: false,
                adminAddress: '',
                roleIds:[],
            }
        },
        /**
         * 展示批量删除的弹框
         */
        showBatchDeleteDialog() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.batchDeleteByIds();
            })
        },
        /**
         * 当图片选择时的钩子函数
         */
        async getImgStr(e) {
            this.imageUrl = await base64.getBase64Str(e.file)
            this.formData.brandLogo = this.imageUrl;
        }
    }

}

export default brand;
