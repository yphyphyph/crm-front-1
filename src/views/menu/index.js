import menu from "@/api/menu";
import dateOptions from "@/utils/date";
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


let brand = {
    name: "index",
    components: {Treeselect},
    data() {
        return {
            dateOptions,
            tableData: [],
            total: 0,
            searchParams: {
                currentPage: 1,
                pageSize: 5
            },
            dialogVisible: false,
            formData: {},
            normalizer(node) {
                return {
                    id: node.id,
                    label: node.menuTitle,
                    children: node.children,
                }
            },
            menuList: [{
                id: 0,
                menuTitle: "主目录"
            }],
            options: {
                FontAwesome: true,
                ElementUI: true,
                eIcon: true,//自带的图标，来自阿里妈妈
                eIconSymbol: true,//是否开启彩色图标
                addIconList: [],
                removeIconList: []
            }


        }
    },
    created() {
        this.searchPage();
        this.getAllTreeMenu();
    },
    methods: {
        /*
        * 查询所有
        */
        async searchPage() {
            let response = await menu.searchPage(this.searchParams);
            this.total = response.total;
            this.tableData = response.data;
        },


        /**
         * 获取所有的菜单 Tree
         */
        async getAllTreeMenu() {
            this.menuList = await menu.getAllMenuTree();
        },

        /**
         * 通过id删除
         */
        async deleteById() {
            await menu.deleteById(this.formData.id);
            this.searchPage();
        },


        /**
         * 添加数据
         * @param val
         */
        async addOrEdit() {
            if (this.formData.id) {
                //修改
                await menu.updateEntity(this.formData);
            } else {
                await menu.addEntity(this.formData);
            }
            this.searchPage();
            this.getAllTreeMenu();
        },

        /**
         * 通过id查询
         * @param val
         */
        async findById() {
            this.formData = await menu.findById(this.formData.id)
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

        resetFromData() {
            this.formData = {
                menuType: 0,
                isHidden: false
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

    }

}

export default brand;
