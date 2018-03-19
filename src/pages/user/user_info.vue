<template>

  <imp-panel>


    <div  slot="header" style="width: 100%;">
    
    </div>
    <div slot="body">

 <el-row style="width: 100%;">
      <H3>基本信息</H3>
    </el-row>
    <div class="infoblock">
   
      <el-row style="width: 100%;margin-top:10px;">
        <el-col :span="6">
          <div class="baseinfo">用户编号：{{tableData.rows.id}}</div>
        </el-col>
        <el-col :span="6">
          <div class="baseinfo">用户昵称：{{tableData.rows.name}}</div>  
        </el-col>
       <el-col :span="8">
        <span class="baseinfo" style="padding:">用户类型</span>
        <!--el-select v-model="value" placeholder="请选择 " style="width: 200px; float: right;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option-->
        </el-select-->
       </el-col>
      </el-row>
      <!--el-row style="width: 100%;">
        <div class="baseinfo" in-line=true>用户状态：正常  <el-button>拉黑</el-button></div-->
        
      </el-row>
      <el-row style="width: 100%;">
        <div class="baseinfo" in-line=true>人脸绑定：{{tableData.rows.face_enabled ? "已绑定":"未绑定"}}  </div> 
      </el-row>
      <el-row style="width: 100%;">
        <div class="baseinfo" in-line=true>免密支付：{{tableData.rows.passless_enabled ? "已设置":"未设置"}}  </div> 
      </el-row>
      </div>






    <!--H3>已交易货柜</H3>
      <el-table
        :data="tableData.countrows"
        border
        style="width: 100%; margin-top:20px;"
        v-loading="listLoading">
        
        <el-table-column
          prop="uid"
          label="货柜编号">
        </el-table-column>
        
        <el-table-column
          prop="nick"
          label="位置">
        </el-table-column>
        <el-table-column
          prop="type"
          label="交易次数">
        </el-table-column>
        <el-table-column
          prop="status"
          label="交易金额">
        </el-table-column>
        <el-table-column
          prop="facestatus"
          label="最后一次交易时间">
        </el-table-column>
        <el-table-column
          prop="isdirectpay"
          label="累计交易时间">
        </el-table-column>
      </el-table-->
    


    <H3>近期交易订单</H3>
      <el-table
        :data="tableData.orderrows"
        border
        style="width: 100%; margin-top:20px;"
        v-loading="listLoading">
        
        <el-table-column
          prop="create_time"
          label="交易时间">
        </el-table-column>
        
        <el-table-column
          prop="id"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="counter"
          label="货柜号">
        </el-table-column>
        <el-table-column
          prop="total_price"
          label="订单金额">
        </el-table-column>
       
         <el-table-column label="操作" width="200">
          <template scope="scope">
            <el-button
              size="small"
              type="default"
              icon="view"
              @click="handleEdit(scope.$index, scope.row)">详情
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

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
          rows: [],
          orderrows:[],
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
        this.$router.push({path: 'userAdd', query: {id: row.id}})
      },
      handleDelete(index, row){
        this.$http.get(api.SYS_USER_DELETE + "?userIds=" + row.id).then(res => {
          this.loadData();
        });
      },
      loadData(){
        if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
          let id = this.$route.query.id;
           this.$http.get(api.SYS_USER_LIST + id + "/")
          .then(res => {
            this.tableData.rows = res.data;
            //this.tableData.pagination.total = res.data.total;
          });

          // 获取近期订单
        this.$http.get(api.SYS_COUNTER_ORDER +"?cust_user=" + id)
          .then(res => {
          console.log(res);
            this.tableData.orderrows = res.data;
            //this.tableData.pagination.total = res.data.total;
          });


          
        }

        
        }
        //?cust_user=2&counter=1
      
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
  .infoblock {
    border-color:#0000FF;
    border: 1px solid ;
    padding-bottom:20px;
    padding-left:10px;
    margin-left:10px;
    padding-right:10px;
    margin-top:5px;
    margin-bottom:10px;
  }
  .baseinfo {
    margin:8px;
  }
</style>
