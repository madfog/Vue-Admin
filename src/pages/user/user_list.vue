<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        
        <el-col :span="24">
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
          label="用户编号">
        </el-table-column>
        
        <el-table-column
          prop="name"
          label="用户昵称">
        </el-table-column>
        <el-table-column
          prop="person_type"
          label="用户类型">
        </el-table-column>
        <el-table-column
          prop="face_enabled"
          label="人脸绑定">
          <template scope="scope">
            {{scope.row.face_enabled?'绑定' :"未绑定"}}
          </template>
        </el-table-column>
        <el-table-column
          prop="passless_enabled"
          label="免密支付">
          <template scope="scope">
            {{scope.row.passless_enabled?'开通' :"未开通"}}
          </template>
        </el-table-column>
        <!--el-table-column
          prop="ordernum"
          label="交易次数">
        </el-table-column>
        <el-table-column
          prop="totalprice"
          label="交易金额">
        </el-table-column-->
        <el-table-column label="操作" width="100">
          <template scope="scope">
          
            <el-button
              size="small"
              type="default"
              icon="view"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑
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
        this.$router.push({path: 'info', query: {id: row.id}})
      },
      handleDelete(index, row){
        this.$http.get(api.SYS_USER_DELETE + "?userIds=" + row.id).then(res => {
          this.loadData();
        });
      },
      loadData(){

      /*
        var d = {"offset":0,"limit":2147483647,"total":1,"size":10,"pages":1,"current":1,"searchCount":true,"optimizeCount":false,"orderByField":null,"records":[
            {"uid":1,"nick":"小天屎蜜柚","type":"普通用户","status":"正常","facestatus":"已绑定","isdirectpay":"已设置",
              "ordernum":"23","totalprice":"1234"},
              {"uid":23,"nick":"清新口臭","type":"补货员","status":"正常","facestatus":"已绑定","isdirectpay":"已设置",
              "ordernum":"0","totalprice":"0"}],"condition":{},"asc":true,"offsetCurrent":0};
        this.tableData.rows = d.records;
        */
//      this.tableData.pagination.total = d.total;
        this.$http.get(api.SYS_USER_LIST + "?key=" + this.searchKey + "&pageSize=" + this.tableData.pagination.pageSize + "&pageNo=" + this.tableData.pagination.pageNo)
          .then(res => {
            this.tableData.rows = res.data;
           // this.tableData.pagination.total = res.data.total;
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
