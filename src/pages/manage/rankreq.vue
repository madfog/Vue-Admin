<template>

  <imp-panel>
    <h3 class="box-title" slot="header" style="width: 100%;">
      经营分析/定级申请
    </h3>
    <el-row slot="body" style="margin-bottom: 20px;" :gutter="24">
      <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18" style="margin-bottom: 20px;">
          <div class="text item">
            <el-form :model="form" ref="form">
            <el-col :span="9">
              <el-form-item label="账号ID(UIN)" :label-width="formLabelWidth">
                <el-input v-model="form.uin" auto-complete="off" style="width:130px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="客户名称" :label-width="formLabelWidth">
                <el-input v-model="form.contact_uname" auto-complete="off" style="width:130px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="onSubmit" v-text="'查询'"></el-button>
                <el-button type="danger" @click="deleteSelected" icon="delete" v-show="form.id && form.id!=null">删除
                </el-button>
              </el-form-item>
            </el-col>
            </el-form>
          </div>
       
      </el-col>
      <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
        <el-card class="box-card">
          
          <h1>客户信息</h1>
          <div class="">
            <el-form :model="form" ref="form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="申请人" :label-width="formLabelWidth">
                  <el-input v-model="form.aplly_uid" auto-complete="off" style="width:130px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="UIN" :label-width="formLabelWidth">
                  <el-input v-model="form.uin" auto-complete="off" style="width:100px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户联系人" :label-width="formLabelWidth">
                  <el-input v-model="form.contact_uname" auto-complete="off" style="width:130px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人电话" :label-width="formLabelWidth">
                  <el-input v-model="form.contact_umobile" auto-complete="off" style="width:100px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="公司名称" :label-width="formLabelWidth">
                  <el-input v-model="form.corp_name" auto-complete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="公司地址" :label-width="formLabelWidth">
                  <el-input v-model="form.corp_addr" auto-complete="off" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row>
              <el-col :span="10">
                <el-form-item label="用户来源" :label-width="formLabelWidth">
                  <!--<el-input v-model="form.from" auto-complete="off"></el-input>-->
                  <el-select-tree v-model="form.parentId" :treeData="resourceTree" :propNames="defaultProps" clearable
                                  placeholder="请选择父级">
                  </el-select-tree>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="收入大类" :label-width="formLabelWidth">
                  <!--<el-input v-model="form.income_type" auto-complete="off"></el-input>-->
                  <el-select-tree v-model="form.parentId" :treeData="resourceTree" :propNames="defaultProps" clearable
                                  placeholder="请选择父级">
                  </el-select-tree>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="服务QQ群" :label-width="formLabelWidth">
                  <el-input v-model="form.qqgroupid" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="公司背景信息" :label-width="formLabelWidth">
                  <el-input v-model="form.corp_bg_info" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="公司组织结构(决策链路)" :label-width="formLabelWidth">
                  <el-input v-model="form.corp_struct" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>

            <el-row>
              <h1>用户项目需求介绍</h1>
            </el-row>
            <el-row>
              <el-form-item label="项目要求" :label-width="formLabelWidth">
                  <el-input v-model="form.project_demand" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="产品要求" :label-width="formLabelWidth">
                  <el-input v-model="form.product_demand" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>
             <el-row>
              <el-form-item label="项目阶段" :label-width="formLabelWidth">
                  <el-input v-model="form.project_phrase" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="项目关键竞争对手" :label-width="formLabelWidth">
                  <el-input v-model="form.project_rival" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="项目周期和关键时间点" :label-width="formLabelWidth">
                  <el-input v-model="form.project_time_info" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="是否已经沟通好初步商业条款" :label-width="formLabelWidth">
                  <el-input v-model="form.project_rule" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>


            <el-row>
              <h1>客户业务评估</h1>
            </el-row>
            <el-row>
              <el-form-item label="是否有业务痛点" :label-width="formLabelWidth">
                  <el-input v-model="form.business_key" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="是否有相关预算" :label-width="formLabelWidth">
                  <el-input v-model="form.business_budget" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="是否有意愿购买腾讯云服务" :label-width="formLabelWidth">
                  <el-input v-model="form.user_will" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>
            
            <el-row>
              <el-form-item label="与腾讯是否有业务竞争关系" :label-width="formLabelWidth">
                  <el-input v-model="form.product_samiliar" auto-complete="off" ></el-input>
                </el-form-item>
            </el-row>


            <el-row>
              <h1>客户IT基础设施评估（只用于前期评估，不影响后期实际使用产品数量）</h1>
              <!-- user_demand_info -->
            </el-row>
            <el-row>
              <h1>预估可以使用腾讯云的量（将加入客户数据分析，每月监控收入完成率）</h1>
              <!-- user_demand_info -->
            </el-row>



            <el-row>
              <el-form-item label="收入规模预估（万元/月）" :label-width="'230px'">
                  <el-input v-model="form.income" auto-complete="off" style="width:150px"></el-input>
                </el-form-item>
            </el-row>
              
              <el-form-item label="" :label-width="formLabelWidth">
                <el-button type="primary" @click="onSubmit" v-text="form.id?'修改':'提交申请'"></el-button>
                <el-button type="danger" @click="deleteSelected" icon="delete" v-show="form.id && form.id!=null">删除
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24" :sm="24" :md="18" :lg="18">
        <el-card class="box-card">
          <h1>客户运营架构分配</h1>
          <div class="">
            <el-form :model="form" ref="form">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="架构师" :label-width="formLabelWidth">
                    <el-input v-model="form.architect_uid" auto-complete="off" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="等级评定" :label-width="formLabelWidth">
                    <el-input v-model="form.level" auto-complete="off" ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="10">
                  <el-form-item label="商务经理" :label-width="formLabelWidth">
                    <el-input v-model="form.busi_user_uid" auto-complete="off" ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="行业规划" :label-width="formLabelWidth">
                    <el-input v-model="form.category" auto-complete="off" ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="10">
                  <el-form-item label="运营经理" :label-width="formLabelWidth">
                    <el-input v-model="form.op_user_uid" auto-complete="off" ></el-input>
                  </el-form-item>
                </el-col>
                
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </imp-panel>

</template>
<script>

  import panel from "../../components/panel.vue"
  import selectTree from "../../components/selectTree.vue"
  import treeter from "../../components/treeter"
  import merge from 'element-ui/src/utils/merge';

  import * as api from "../../api"
  import qs from 'qs'

  export default {
    mixins: [treeter],
    components: {
      'imp-panel': panel,
      'el-select-tree': selectTree
    },
    data(){
      return {
        formLabelWidth: '150px',
        defaultProps: {
          children: 'children',
          label: 'name',
          id: "id",
        },
        resourceTree: [],
        maxId:700000,
        form: {
          id: null,
          parentId: null,
          name: '',
          code: '',
          type: 1,
          sort: 0,
          usable: '1',
          remarks: ''
        }
      }
    },
    methods: {
      newAdd(){
        this.form = {
          id: null,
          parentId: null,
          name: '',
          code: '',
          type: 1,
          sort: 0,
          usable: '1',
          remarks: ''
        };
      },
      renderContent(h, {node, data, store}) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
          </span>);
      },
      deleteSelected(){
        this.$http.get(api.SYS_RESOURCE_DELETE + "?resourceIds=" + this.form.id)
          .then(res => {
            this.$message('操作成功');
            this.deleteFromTree(this.resourceTree, this.form.id);
            this.newAdd();
          }).catch(e =>{
          this.$message('操作成功');
          this.deleteFromTree(this.resourceTree, this.form.id);
          this.newAdd();
        })
      },
      batchDelete(){
        var checkKeys = this.$refs.resourceTree.getCheckedKeys();
        if (checkKeys == null || checkKeys.length <= 0) {
          this.$message.warning('请选择要删除的资源');
          return;
        }
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(api.SYS_RESOURCE_DELETE + "?resourceIds=" + checkKeys.join(','))
            .then(res => {
              this.$message('操作成功');
              this.load();
            }).catch(e => {
            this.$message('操作成功');
            console.log(checkKeys);
            this.batchDeleteFromTree(this.resourceTree, checkKeys);
          })
        });

      },
      handleNodeClick(data){
        this.form = merge({}, data);
      },
      onSubmit(){
      
        if (this.form.id == null) {
          this.$http.post(api.SYS_APPLY_CREATE, qs.stringify(this.form))
            .then(res => {
              this.$message('操作成功');
              this.form.id = res.data.content.id;
              this.appendTreeNode(this.resourceTree, res.data);
            }).catch(e => {
            this.maxId += 1;
            this.$message('操作成功');
            this.form.id = this.maxId;
            var  ddd = {
              id: this.form.id,
              name: this.form.name,
              sort: this.form.sort,
              type:this.form.type,
              code:this.form.code,
              remarks: this.form.remarks,
              parentId: this.form.parentId,
              usable: this.form.usable,
              children:[],
            }
            this.appendTreeNode(this.resourceTree, ddd);
            this.resourceTree.push({});
            this.resourceTree.pop();
          })
        } else {
          this.$http.post(api.SYS_RESOURCE_UPDATE, this.form)
            .then(res => {
              this.$message('操作成功');
              this.updateTreeNode(this.resourceTree, res.data);
            }).catch(e=>{
            this.$message('操作成功');
            this.updateTreeNode(this.resourceTree, merge({},this.form));
          })
        }
      },
      load(){
        this.$http.post(api.SYS_APPLY_INFO, qs.stringify({id:17}))
          .then(res=>{
            res.data = res.data.content;
            this.form = res.data;
          }).catch((error) => {
            console.log(error)
        })
      }
    },
    created(){
      this.load();
    }
  }
</script>

<style>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
