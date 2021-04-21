import {findPage, deleteById, batchDelete, addEntity, findById, updateEntity} from '@/api/role'
import dateOptions from "@/utils/date";


let brand = {
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
            batchIds: [],
            dialogVisible: false,
            formData: {},

        }
    },
    created() {
        this.searchPage();
    },
    methods: {
        /*
        * 查询所有
        */
        async searchPage() {
            let response = await findPage(this.searchParams);
            this.total = response.total;
            this.tableData = response.data;
        },

        /**
         * 通过id删除
         */
        async deleteById() {
            await deleteById(this.formData.id);
            this.searchPage();
        },

        /**
         * 批量删除
         * @param val
         */
        async batchDeleteByIds() {
            await batchDelete(this.batchIds);
            this.searchPage();
        },

        /**
         * 添加数据
         * @param val
         */
        async addOrEdit() {
            if (this.formData.id) {
                //修改
                await this.editEntity();
            } else {
                await this.addEntity();
            }
            this.searchPage();
        },
        async addEntity() {
            await addEntity(this.formData);
        },
        async editEntity() {
            await updateEntity(this.formData);
        },
        /**
         * 通过id查询
         * @param val
         */
        async findById() {
            this.formData = await findById(this.formData.id)
            this.imageUrl = this.formData.brandLogo
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
