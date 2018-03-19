<template>

  <imp-panel>


    <div  slot="header" style="width: 100%;">
    
    </div>
    <div slot="body">

 
    <el-row>
      <el-col :span=12><H3>支付帐号配置</H3></el-col>
      <el-col :span=12>
        
          <el-button style="float:right" type="" @click="onAddNewItem()">新加配置</el-button>
        
      </el-col>
    </el-row>
      <el-table
        :data="tableData.rows"
        border
        style="width: 100%; margin-top:20px;"
        v-loading="listLoading">
        
        <el-table-column
          prop="name"
          label="帐号配置">
        </el-table-column>
        
        <el-table-column
          prop="account"
          label="支付帐号">
        </el-table-column>
       
       
         <el-table-column label="操作" width="200">
          <template scope="scope">
            <el-button
              size="small"
              type="default"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)">修改
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="配置支付帐号" v-model="dialogVisible" size="tiny">
        <div class="select-tree">
          <el-scrollbar
            tag="div"
            class='is-empty'
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list">
            <el-form ref="setItem" :model="setItem" label-width="80px" style="margin-top:5px;margin-right:5px;">
              <el-form-item label="配置id">
                <el-input v-model="setItem.name"></el-input>
              </el-form-item>
              <el-form-item label="支付帐号">
                <el-input v-model="setItem.account"></el-input>
              </el-form-item>
            </el-form>
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
        },
        setItem:{},
      }
    },
    methods: {

      onAddNewItem(e) {
        this.$set(this.$data, "dialogVisible", true);
        this.$set(this.$data, "setItem", {});
      },
      configUserRoles(){
        console.log(this.setItem);
        if(this.setItem.id) {
            this.$http.put(api.SYS_PAY_CONFIG, this.setItem).then(res => {
          this.loadData();
          });
        }
        else {
        this.setItem.group=2;
          this.$http.post(api.SYS_PAY_CONFIG, this.setItem).then(res => {
          this.loadData();
          });
        }
        

        this.$message('修改成功');
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
        //this.$router.push({path: 'userAdd', query: {id: row.id}})
        this.$set(this.$data, "dialogVisible", true);
        
        this.$set(this.$data, "setItem", row);
      },
      handleDelete(index, row){
        this.$http.delete(api.SYS_PAY_CONFIG  + row.id + "/").then(res => {
          this.loadData();
        });
      },
      loadData(){

        //SYS_PAY_CONFIG
        this.$http.get(api.SYS_PAY_CONFIG)
          .then(res => {
          console.log(res);
            this.tableData.rows = res.data;
            //this.tableData.pagination.total = res.data.total;
          });
/*
        var d = {"offset":0,"limit":2147483647,"total":1,"size":10,"pages":1,"current":1,"searchCount":true,"optimizeCount":false,"orderByField":null,"records":[
            {"uid":1,"nick":"小天屎蜜柚","type":"普通用户","status":"正常","facestatus":"已绑定","isdirectpay":"已设置",
              "ordernum":"23","totalprice":"1234"},
              {"uid":23,"nick":"清新口臭","type":"补货员","status":"正常","facestatus":"已绑定","isdirectpay":"已设置",
              "ordernum":"0","totalprice":"0"}],"condition":{},"asc":true,"offsetCurrent":0};
        this.tableData.rows = d.records;
        */
//      this.tableData.pagination.total = d.total;
        //        this.$http.get(api.SYS_USER_PAGE + "?key=" + this.searchKey + "&pageSize=" + this.tableData.pagination.pageSize + "&pageNo=" + this.tableData.pagination.pageNo)
//          .then(res => {
//            this.tableData.rows = refs.data.records;
//            this.tableData.pagination.total = res.data.total;
//          });
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
