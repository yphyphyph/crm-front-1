import {
    findPage,
    getChildren,
    getCategoryByChooseLevel,
    findById,
    deleteCategory,
    addEntity,
    updateEntity
} from '@/api/category'
import dateOptions from "@/utils/date";


let brand = {
    name: "index",
    data() {
        return {
            dateOptions,
            tableData: [],
            searchParams: {
                currentPage: 1,
                pageSize: 5,
            },
            dialogVisible: false,
            formData: {
                categoryLevel: 1
            },
            options: [],
            selectIds: [],
            disable: false,
            prop: {
                label: 'catetoryName',
                value: 'id',
            },

            expandId: 0,
            total: 0,
            map: new Map()

        }

    },
    created() {
        this.searchPage();
    },

    methods: {
        /*
        * 查询列表
        */
        async searchPage() {
            let response = await findPage(this.searchParams);
            this.tableData = response.data;
            this.total = response.total;
        },

        /**
         * 加载更多数据
         */
        async loadData(tree, treeNode, resolve) {
            console.log(tree);
            this.expandId = tree.id;
            this.map.set(tree.id, {tree, treeNode, resolve})
            let response = await getChildren(tree.id)
            setTimeout(() => resolve(response), 222)
        },

        /**
         * 添加修改时 选择等级时回调
         */
        async categoryLevelChange(level) {
            if (level == 1) {
                this.options = [];
            } else {
                this.options = await getCategoryByChooseLevel(level)
            }
        },

        //添加或者修改
        async addOrEdit() {
            //给formData填充parentId值
            this.formData.parentId = this.formData.categoryLevel == 1 ? 0 : this.selectIds[this.selectIds.length - 1];
            if (this.formData.id) {
                //修改
                await updateEntity(this.formData);
            } else {
                //添加
                await addEntity(this.formData);
            }
            this.refreshPage(this.formData.parentId);
        },

        //删除操作
        async deleteCategory() {
            await deleteCategory(this.formData.id, this.formData.level);
            this.refreshPage();

        },

        async findById() {
            this.formData = await findById(this.formData.id);
            await this.categoryLevelChange(this.formData.categoryLevel);
            this.selectIds = this.formData.parentId;
        },
        /**
         * 分页发生改变时
         */
        currentPageChange(page) {
            this.searchParams.currentPage = page;
            this.refreshPage();

        }
        ,
        //时间框选择时间
        chooseTime() {
            this.searchParams.startTime = this.dateOptions.startDate[0];
            this.searchParams.endTime = this.dateOptions.startDate[1];
        }
        ,
        resetForm() {
            this.searchParams = {currentPage: 1, pageSize: 5}
            this.dateOptions.startDate = '';
        },
        //每一行的点击效果
        rowClick(row) {
            this.formData.id = row.id;
            this.formData.level = row.categoryLevel
            this.disable = true;
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
                this.deleteCategory();
            })
        },

        refreshPage() {
            this.searchPage();
            if (this.expandId) {
                const {tree, treeNode, resolve} = this.map.get(this.expandId)
                this.$set(this.$refs.huige.store.states.lazyTreeNodeMap, this.expandId, [])
                this.loadData(tree, treeNode, resolve);
            }
        },
    }
}

export default brand;
