<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      <el-row style="width: 100%;">
        <el-col :span="12">
            <el-button type="primary" icon="plus" @click="addDevice">新增</el-button>
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
          label="编号">
        </el-table-column>
        
        <el-table-column
          prop="sid"
          label="货柜编码">
        </el-table-column>
        
        <el-table-column
          prop="cnt_type"
          label="货柜型号">
        </el-table-column>
        <!--el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="goodnum"
          label="商品数">
        </el-table-column-->
        <el-table-column
          prop="producer"
          label="商家">
        </el-table-column>
        <el-table-column
          prop="uptime_now"
          label="运行时间">
        </el-table-column>
        <el-table-column
          prop="location"
          label="位置">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template scope="scope">
          
            <el-button
              size="small"
              type="default"
              icon="view"
              @click="handleEdit(scope.$index, scope.row)"
              >详情

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

      <el-dialog title="添加货柜" v-model="dialogVisible" size="tiny">
        <div class="">
          <el-form ref="addForm" :model="addForm" label-width="60px">
		      <el-form-item label="货柜id">
		        <el-input v-model="addForm.sid"></el-input>
		      </el-form-item>
          <el-form-item label="型号">
            <el-input v-model="addForm.cnt_type"></el-input>
          </el-form-item>
		  </el-form>
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
        },
        addForm:{}
      }
    },
    methods: {
      addDevice() {
      	console.log(11);
      	this.dialogVisible= true;
      	this.addForm={};
      },
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

          this.$http.post(api.SYS_COUNTER_LIST, this.addForm)
          .then(res => {
            //this.form = res.data;
            
              this.$message('添加成功');
              this.loadData();
          
          })
      		console.log(this.addForm);
       	    
            this.dialogVisible = false;
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
        console.log(row.id)
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
            {"id":1,"type":"T","status":"空闲","goodnum":29,"totalgnum":50,"ordernum":100,"time":"20天",
              "position":"银科20层"},
            {"id":2,"type":"H","status":"购物中","goodnum":46,"totalgnum":100,"ordernum":100,"time":"20天",
              "position":"银科17层"}],"condition":{},"asc":true,"offsetCurrent":0};
        this.tableData.rows = d.records;
        */
//      this.tableData.pagination.total = d.total;
        this.$http.get(api.SYS_COUNTER_LIST + "?key=" + this.searchKey + "&pageSize=" + this.tableData.pagination.pageSize + "&pageNo=" + this.tableData.pagination.pageNo)
          .then(res => {
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
