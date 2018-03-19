<template>

  <imp-panel>
    <div  slot="header" style="width: 100%;">
      
    </div>
      
    <div slot="body">
    <el-row>
      <el-col :span=12>
      <el-row >
        <H3>基本信息</H3>
      </el-row>
      <div class="infoblock" >
          <el-row style="margin-top:10px;">
            <el-col :span="6">
              <div class="baseinfo" >货柜编号</div>  
            </el-col>
            <el-col :span="12">
              <div class="baseinfo">{{tableData.rows.id}}</div>
            </el-col>
            <el-col :span=6>
              <el-button style="float:right">生成二维码</el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="6">
              <div class="baseinfo" >货柜类型</div>  
            </el-col>
            <el-col :span="12">
              <div class="baseinfo">{{tableData.rows.cnt_type}}</div>
            </el-select>
            </el-col>
            
          </el-row>
        </div>

        <el-row style="width: 100%;">
          <el-col :span="12">
            <H3>货柜状态</H3>
          </el-col>
          <el-col :span="12">
            <el-button type="info" style="float:right">刷新</el-button> 
          </el-col>
        </el-row>
        <div class="infoblock" >
          <el-row style="margin-top:10px;">
            <el-col :span="6">
              <div class="baseinfo" >在线状态 ：</div>  
            </el-col>
            <el-col :span="3">
              <div class="baseinfo" >{{tableData.rows.online ? "在线":"不在线"}}</div>  
            </el-col>
            <el-col :span=4>
              <el-button style="float:right">停止服务</el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="4">
              <div class="baseinfo" >货柜位置</div>  
            </el-col>
            <el-col :span="6">
              <div class="baseinfo">{{tableData.rows.location}}</div>
            </el-col>
            <el-col :span=6>
              <el-button type="info" style="float:right">重新定位</el-button>
            </el-col>
            <el-col :span=8>
              <div class="baseinfo" >备注：银科大厦20F</div>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="4">
              <div class="baseinfo" >货柜温度</div>  
            </el-col>
            <el-col :span="6">
              <div class="baseinfo">{{tableData.rows.temperature}}</div>
            </el-col>
            <el-col :span="4">
              <div class="baseinfo" >货柜湿度</div>  
            </el-col>
            <el-col :span="6">
              <div class="baseinfo">{{tableData.rows.humidity}}</div>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="4">
              <div class="baseinfo" >货门状态</div>  
            </el-col>
            <el-col :span="6">
              <div class="baseinfo">{{tableData.rows.door_state}}</div>
            </el-col>
            <el-col :span="4">
              <el-button type="info" style="float:right">开/关门</el-button> 
            </el-col>
            
          </el-row>
        </div>
        </el-col>
        <el-col :span=12>
        <el-row >
        <H3>柜内商品</H3>
      </el-row>
          <div class="infoblock" >
            <el-table
        :data="tableData.goodRows"
        border
        style="width: 100%; margin-top:20px;"
        v-loading="listLoading">
        
        <el-table-column
          prop="goods_id"
          label="商品编号">
        </el-table-column>
        
        <el-table-column
          prop="goods_name"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="数量">
        </el-table-column>
        
      </el-table>
            
          </div>
        </el-col>
      </el-row>
    


    <H3>近期交易订单</H3>
      <el-table
        :data="tableData.orderRows"
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
          prop="cust_user"
          label="用户">
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
            
          </template>
        </el-table-column>
      </el-table>


      <el-row >
        <H3>货柜配置</H3>
      </el-row>
      <div class="infoblock" >
          
          <el-row style="margin-top:10px;">
            <el-col :span="4">
              <div class="baseinfo" >关联支付帐号</div>  
            </el-col>
            <el-col :span="8">
              <el-select v-model="value" placeholder="请选择" style="width: 240px; float: left;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-col>
            <el-col :span=4>
              <el-button type="info" style="float:right">保存</el-button>
            </el-col>
          </el-row>
        </div>

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
          orderRows: [],
          goodRows:[],
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
           this.$http.get(api.SYS_COUNTER_LIST + id + "/")
          .then(res => {
            this.tableData.rows = res.data;
            //this.tableData.pagination.total = res.data.total;
          });

          this.$http.get(api.SYS_COUNTER_ORDER +"?counter=" + id)
          .then(res => {
          console.log(res);
            this.tableData.orderRows = res.data;
            //this.tableData.pagination.total = res.data.total;
          });


          this.$http.get(api.SYS_COUNTER_LIST + id + "/goods_stats/")
          .then(res => {
          console.log(res);
            this.tableData.goodRows = res.data;
            //this.tableData.pagination.total = res.data.total;
          });
        }
        
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
