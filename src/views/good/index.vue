<template xmlns:el="http://www.w3.org/1999/html">
  <div class="brand-wrapper">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input size="mini" placeholder="请输入分类名称"><i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-scrollbar>
          <el-tree
              style="color:#909399;"
              :data="categoryList"
              :props="treeProps"
              :expand-on-click-node="false"
              :load="loadCategory"
              @node-click="treeNodeClick"
              lazy
          />
        </el-scrollbar>
      </el-col>
      <el-col :span="20">
        <!--固定区域-->
        <div class="fixed-wrapper">
          <!--      查询表单 -->
          <div class="search-form">
            <el-form :inline="true" class="demo-form-inline" size="mini">
              <el-form-item label="">
                <el-input placeholder="请输入商品名称" v-model="searchParams.goodName"></el-input>
              </el-form-item>

              <el-form-item label="">
                <el-input placeholder="请输入商品描述" v-model="searchParams.goodDesc"></el-input>
              </el-form-item>
              <el-form-item label="">
                <el-select v-model="searchParams.brandId" placeholder="请选择">
                  <el-option v-for="item in brandList" :key="item.id" :label="item.brandName"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-date-picker
                    style="width: 240px"
                    type="datetimerange"
                    :picker-options="dateOptions.pickerOptions"
                    v-model="dateOptions.startDate"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="-"
                    @change="chooseTime"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                </el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="searchPage">查询</el-button>
                <el-button type="warning" @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--    操作功能 -->
          <div class="crud-box">
            <el-button type="primary" size="mini" icon="el-icon-edit"
                       v-has-perm="['good:add']"      @click="dialogVisible=true,formData={},imgUrl=''">新建
            </el-button>
            <el-button type="success" size="mini" icon="el-icon-edit" :disabled="batchIds.length!=1"
                       v-has-perm="['good:edit']"      @click="dialogVisible=true,findById()">修改
            </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" :disabled="!batchIds.length>0"
                       v-has-perm="['good:batch']"     @click="showBatchDeleteDialog"
            >删除
            </el-button>
          </div>
        </div>
        <!--    表格数据-->
        <div class="data-box">
          <el-table
              :data="tableData"
              style="width: 100%"
              @selection-change="selectChange">
            <el-table-column
                align="center"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                align="center"
                prop="goodName"
                label="商品名称"
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                prop="goodPrice"
                label="商品价格"
                width="180">
            </el-table-column>
            <el-table-column
                align="center"
                prop="goodDesc"
                label="商品描述">
            </el-table-column>
            <el-table-column
                align="center"
                prop="brandName"
                label="所属品牌">
            </el-table-column>
            <el-table-column
                align="center"
                prop="goodImg"
                label="商品图片">
              <template v-slot="obj">
                <img :src="obj.row.goodImg" width="35px" height="35px" alt="">
              </template>

            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
              <template v-slot="obj">
                <el-button type="primary" size="mini" icon="el-icon-edit"
                           v-has-perm="['good:edit']"   @click="dialogVisible=true,formData.id=obj.row.id,findById()"
                           style="margin-right: 5px"></el-button>
                <el-popconfirm
                    confirm-button-text='确定'
                    cancel-button-text='取消'
                    icon="el-icon-info"
                    icon-color="red"
                    @confirm="deleteById"
                    placement="top"
                    title="是否要删除本条记录？"
                >
                  <el-button slot="reference" type="danger" size="mini" @click="formData.id=obj.row.id"
                             v-has-perm="['good:delete']"    icon="el-icon-delete"></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

        </div>
        <!--    分页-->
        <div class="page-box">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="searchParams.pageSize"
              :current-page="searchParams.currentPage"
              @current-change="currentPageChange"
          >
          </el-pagination>

        </div>

      </el-col>
    </el-row>
    <!--    弹框-->
    <el-dialog
        title="实体操作"
        :visible.sync="dialogVisible"
        width="40%"
    >
      <el-form ref="form" label-width="80px" size="small">
        <el-tabs>
          <el-tab-pane label="基本信息">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="商品名称">
                  <el-input v-model="formData.goodName"></el-input>
                </el-form-item>
                <el-form-item label="所属品牌">
                  <el-select v-model="formData.brandId" placeholder="请选择品牌" style="width: 100%">
                    <el-option v-for="item in brandList" :key="item.id" :label="item.brandName"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属分类">
                  <el-cascader
                      style="width: 100%"
                      :props="cascadeProps"
                      v-model="selectIds"
                      clearable
                      ref="cascader"
                      placeholder="请选择父级分类"
                      :options="categoryList"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品价格">
                  <el-input v-model="formData.goodPrice"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                  <el-input v-model="formData.goodDesc"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="商品图片">
                <el-upload
                    style="float: left;"
                    class="upload-demo"
                    :http-request="imgChange"
                    :show-file-list="false"
                    accept="image/*"
                    action="https://jsonplaceholder.typicode.com/posts/"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <img :src="imgUrl" v-if="imgUrl" style="float: left;margin-left: 20px" width="100px"
                     height="100px" alt="">
              </el-form-item>
            </el-row>


          </el-tab-pane>
          <!--          <el-tab-pane label="品牌分类">-->
          <!--           -->


          <!--          </el-tab-pane>-->
          <el-tab-pane label="商品详情">

            <quill-editor
                v-model="formData.goodContent"
                ref="myQuillEditor"
                :options="editorOptions"
            >
            </quill-editor>

            <div class="foot-wrapper" style="margin-top: 20px;text-align: right">
              <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" size="mini" @click="dialogVisible = false,addOrEdit()">确 定</el-button>
            </div>

          </el-tab-pane>
        </el-tabs>

        <el-form/>


      </el-form>


    </el-dialog>
  </div>
</template>

<script>
import brand from './index.js'

export default brand;
</script>

<style src="./index.scss" lang="scss"></style>
