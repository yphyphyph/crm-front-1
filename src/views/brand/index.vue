<template>
  <div class="brand-wrapper">

    <!--固定区域-->
    <div class="fixed-wrapper">
      <!--      查询表单 -->
      <div class="search-form">
        <el-form :inline="true" class="demo-form-inline" size="mini">
          <el-form-item label="品牌名称">
            <el-input placeholder="请输入品牌名称" v-model="searchParams.brandName"></el-input>
          </el-form-item>

          <el-form-item label="开始时间">
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
                align="left">
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
        <el-button type="primary"  v-has-perm="['brand:add']" size="mini" icon="el-icon-edit" @click="dialogVisible=true,formData={},imageUrl=''">
           新建
        </el-button>
        <el-button type="success" size="mini" icon="el-icon-edit" :disabled="batchIds.length!=1"
                   v-has-perm="['brand:edit']"  @click="dialogVisible=true,findById()">修改
        </el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" :disabled="batchIds.length<=0"
                   v-has-perm="['brand:batch']"  @click="showBatchDeleteDialog">删除
        </el-button>
      </div>
    </div>
    <!--可滚动区域-->
    <el-scrollbar>
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
              prop="brandName"
              label="品牌名称"
              width="180">
          </el-table-column>
          <el-table-column
              align="center"
              prop="brandDesc"
              label="品牌描述"
              width="180">
          </el-table-column>
          <el-table-column
              align="center"
              prop="brandSite"
              label="品牌站点">
            <template v-slot="huige">
              <a :href="huige.row.brandSite">{{ huige.row.brandSite }}</a>
            </template>

          </el-table-column>
          <el-table-column
              align="center"
              prop="brandLogo"
              label="品牌图标">
            <template v-slot="obj">
              <img :src="obj.row.brandLogo" alt="" height="30px">
            </template>
          </el-table-column>

          <el-table-column
              align="center"
              label="操作">
            <template v-slot="obj">
              <el-button type="primary" size="mini" icon="el-icon-edit"
                         v-has-perm="['brand:edit']"
                         @click="dialogVisible=true,formData.id=obj.row.id,findById()"
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
                           v-has-perm="['brand:delete']"    icon="el-icon-delete"></el-button>
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
    </el-scrollbar>
    <!--    弹框-->
    <el-dialog
        title="实体操作"
        :visible.sync="dialogVisible"
        width="33%"
    >
      <el-form ref="form" label-width="80px" size="small">
        <el-form-item label="品牌名称">
          <el-input v-model="formData.brandName"></el-input>
        </el-form-item>
        <el-form-item label="品牌站点">
          <el-input v-model="formData.brandSite"></el-input>
        </el-form-item>
        <el-form-item label="品牌图片">
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :http-request="getImgStr">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
        <el-form-item label="品牌描述">
          <el-input v-model="formData.brandDesc"></el-input>
        </el-form-item>

      </el-form>


      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible = false,addOrEdit()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import brand from './index.js'

export default brand;
</script>

<style src="./index.scss" lang="scss"></style>
