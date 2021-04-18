import good from '@/api/good'
import dateOptions from "@/utils/date";
import {getChildren} from "@/api/category"
import base64 from '@/utils/base64Utils'
import editorOptions from "@/utils/edit";


let brand = {
    name: "index",
    data() {
        return {
            dateOptions,
            editorOptions,
            tableData: [],
            searchParams: {
                currentPage: 1,
                pageSize: 5,
            },
            total: 0,
            dialogVisible: false,
            formData: {},
            batchIds: [],
            brandList: [],
            treeProps: {
                label: 'catetoryName',
                children: 'children',
                isLeaf: 'isLeaf'
            },
            cascadeProps: {
                value: "id",
                lazy: true,
                lazyLoad: (node, resolve) => this.loadCategory(node, resolve),
                label: 'catetoryName',
                children: 'children',
                leaf: 'isLeaf'
            },
            selectIds: [],
            categoryList: [],
            imgUrl: '',
            map: new Map(),


        }
    },
    created() {
        this.searchPage();
        this.findAllBrand();
    },
    methods: {
        /**
         * 分页条件查询
         * @returns {Promise<void>}
         */
        async searchPage() {
            let response = await good.searchPage(this.searchParams)
            console.log(response);
            this.total = response.total;
            this.tableData = response.data;
        },
        /**
         * 查询所有品牌
         */
        async findAllBrand() {
            this.brandList = await good.getAllBrand();
        },

        /**
         * 加载分类数据
         */
        async loadCategory(row, resolve) {
            if (!row.data.id) {//默认一级分类 进入页面;
                this.categoryList = await getChildren(0);
            } else {
                let response = await getChildren(row.data.id);
                resolve(response);
            }
        },

        /**
         * 点击左边分类 执行搜索操作
         * @param node
         */
        treeNodeClick(node) {
            this.searchParams.categoryId = node.id;
            this.searchParams.categoryLevel = node.categoryLevel;
            this.searchPage();
        },
        /**
         * 添加或者修改
         * @returns {Promise<void>}
         */
        async addOrEdit() {
            this.formData.firstCategoryId = this.selectIds[0];
            this.formData.secondCategoryId = this.selectIds[1];
            this.formData.threeCategoryId = this.selectIds[2];
            if (this.formData.id) {
                await good.updateEntity(this.formData)
            } else {
                await good.addEntity(this.formData);
            }
            this.searchPage();
        },


        /**
         * 通过id删除
         */
        async deleteById() {
            await good.deleteById(this.formData.id);
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
        //checkbox勾选改变
        selectChange(val) {
            if (val.length == 1) {
                this.formData.id = val[0].id;
            } else {
                this.formData.id = 0;
            }
            this.batchIds = val.map(item => item.id);
        },
        /**
         * 批量删除
         * @param val
         */
        async batchDeleteByIds() {
            await good.batchDeleteByIds(this.batchIds)
            this.searchPage();
        },

        async imgChange(e) {
            this.formData.goodImg = await base64.getBase64Str(e.file)
            this.imgUrl = this.formData.goodImg;
        },

        async findById() {
            this.formData = await good.findById(this.formData.id)
            this.imgUrl = this.formData.goodImg;
            //todo: 级联因为是异步操作  回显数据 比较复杂
            // var firstCategory = this.categoryList.find(item => item.id == this.formData.firstCategoryId);
            // console.log(firstCategory);
            // var firstChildren = await getChildren(firstCategory.id);
            // console.log(firstChildren);
            // firstCategory.children = firstChildren;
            // var secondCategory = firstChildren.find(item => item.id == this.formData.secondCategoryId);
            // var secondChildren = await getChildren(secondCategory.id);
            // secondCategory.children = secondChildren;
            // console.log(secondCategory);
            // let obj = {data: {id: firstCategory.id}}
            // let obj1 = {data: {id: secondCategory.id}}
            // this.$refs.cascader.$children[1].lazyLoad(obj)
            // this.$refs.cascader.$children[1].lazyLoad(obj1)
            // console.log(this.$refs.cascader);

            this.$nextTick(() => this.selectIds = [this.formData.firstCategoryId, this.formData.secondCategoryId, this.formData.threeCategoryId]);


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


        //选择页数的时候 发生概念
        currentPageChange(page) {
            this.searchParams.currentPage = page;
            this.searchPage();
        },


    }
}

export default brand;
