<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="12">
          <router-link :to="{ path: 'Add'}">
            <el-button type="primary" icon="plus">新增</el-button>
          </router-link>
        </el-col>
        <el-col :span="12">
          <div class="el-input" style="width: 200px; float: right;">
            <i class="el-input__icon el-icon-search"></i>
            <input type="text" placeholder="输入编号" v-model="searchKey" @keyup.enter="search($event)"
                   class="el-input__inner">
          </div>
        </el-col>
      </el-row>
    </h3>
    <div slot="body">
      <el-table
        :data="tableData.rows"
        border
        style="width: 100%"
        v-loading="listLoading"
        >
        
        <el-table-column
          prop="id"
          label="商品编号">
        </el-table-column>
        
        <el-table-column
          prop="name"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="rfid"
          label="RFID">
        </el-table-column>
        <el-table-column
          prop="isPiccsan"
          label="图像识别">

        </el-table-column>
        <el-table-column
          prop="pic_addr"
          label="图片">
          <template scope="scope">
            <img  :src="scope.row.pic_addr" alt="" style="width: 50px;height: 50px">
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
       
        <el-table-column label="操作" width="200">
          <template scope="scope">
            <el-button
              size="small"
              type="default"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableData.pagination.pageNo"
        :page-sizes="[5, 10, 20]"
        :page-size="tableData.pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.pagination.total">
      </el-pagination>

      <el-dialog title="配置用户角色" v-model="dialogVisible" size="tiny">
        <div class="select-tree">
          <el-scrollbar
            tag="div"
            class='is-empty'
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list">
            <el-tree
              ref="roleTree"
              :data="roleTree"
              show-checkbox
              check-strictly
              node-key="id" v-loading="dialogLoading"
              :props="defaultProps">
            </el-tree>
          </el-scrollbar>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="configUserRoles">确 定</el-button>
          </span>
      </el-dialog>
    </div>


  </imp-panel>
</template>

<script>
  import panel from "../../components/panel.vue"
  import * as api from "../../api"
  import testData from "../../../static/data/data.json"

  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {
        currentRow: {},
        dialogVisible: false,
        dialogLoading: false,
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        roleTree: [],
        listLoading: false,
        searchKey: '',
        tableData: {
          pagination: {
            total: 0,
            pageNo: 1,
            pageSize: 10,
            parentId: 0
          },
          rows: []
        }
      }
    },
    methods: {
      search(target){
        this.loadData();
      },
      handleSelectionChange(val){

      },
      handleRoleConfig(index, row){
        this.currentRow = row;
        this.dialogVisible = true;
        if (this.roleTree.length <= 0) {
          this.$http.get( api.TEST_DATA + "?selectChildren=true")
            .then(res => {
              this.roleTree = res.data.roleList
            })
        }
        this.$http.get(api.SYS_USER_ROLE + "?id=" + row.id)
          .then(res => {
            this.$refs.roleTree.setCheckedKeys(res.data);
          })
      },
      configUserRoles(){
        let checkedKeys = this.$refs.roleTree.getCheckedKeys();
          this.$http.get(api.SYS_SET_USER_ROLE + "?userId=" + this.currentRow.id + "&roleIds="+checkedKeys.join(','))
          .then(res => {
              this.$message('修改成功');
              this.dialogVisible = false;
          })
      },
      handleSizeChange(val) {
        this.tableData.pagination.pageSize = val;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.tableData.pagination.pageNo = val;
        this.loadData();
      },
      handleEdit(index, row){

        this.$router.push({path: 'Add', query: {id: row.id}})
      },
      handleDelete(index, row){
        this.$confirm('确定删除这一条记录？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.$http.delete(api.SYS_GOOD_LIST + row.id + "/").then(res => {
                  this.loadData();
                });
            })
        
      },
      loadData(){
      /*
        var d = {"offset":0,"limit":2147483647,"total":1,"size":10,"pages":1,"current":1,"searchCount":true,"optimizeCount":false,"orderByField":null,"records":[
            {"gid":1,"name":"王老吉","rfid":"xs3214","isPiccsan":"支持","image":"http://bobbytest-1251829167.cosbj.myqcloud.com/good%5C15167877901516342408348.jpg","price":"450"},
            {"gid":2,"name":"加多宝","rfid":"fs3d4","isPiccsan":"支持","image":"http://bobbytest-1251829167.cosbj.myqcloud.com/good%5C1516787673133.jpg","price":"450"},
            {"gid":3,"name":"大白兔（500克）","rfid":"gitd12","isPiccsan":"支持","image":"http://bobbytest-1251829167.cosbj.myqcloud.com/good%5C1516787869133.jpg","price":"980"},
          ],"condition":{},"asc":true,"offsetCurrent":0};
        this.tableData.rows = d.records;
        */
//      this.tableData.pagination.total = d.total;


        this.$http.get(api.SYS_GOOD_LIST + "?key=" + this.searchKey + "&pageSize=" + this.tableData.pagination.pageSize + "&pageNo=" + this.tableData.pagination.pageNo)
          .then(res => {
            console.log(res.data);
            this.tableData.rows = res.data;
           //this.tableData.pagination.total = res.data.total;
        });
      }
    },
    created(){
      this.loadData();
    }
  }
</script>
<style>
  .el-pagination {
    float: right;
    margin-top: 15px;
  }
</style>
