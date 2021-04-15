import {findPage, deleteById, batchDelete, addEntity} from '@/api/brand'
import dateOptions from "@/utils/date";
import base64 from '@/utils/base64Utils'

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
            imageUrl: ''
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
            await addEntity(this.formData);
            this.searchPage();
        },


        //checkbox勾选改变
        selectChange(val) {
            this.batchIds = val.map(item => item.id);
        },

        //选择页数的时候 发生概念
        currentPageChange(page) {
            this.searchParams.currentPage = page;
            this.searchPage();
        },
        //时间框选择时间
        chooseTime() {
            this.searchParams.startTime = this.value2[0];
            this.searchParams.endTime = this.value2[1];
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
