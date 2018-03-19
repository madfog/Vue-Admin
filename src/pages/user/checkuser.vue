<template>
  <imp-panel title="绑定用户">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="人脸">
        <el-upload
          class="avatar-uploader"
          action="http://upload.cloudarch.info/upload_pic.php"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.avatar" :src="form.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> 

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" >立即绑定</el-button>
      </el-form-item>
    </el-form>


    <div>
      <H3>检测结果</H3>
   
      <div class="infoblock" style="verify?'block':'none'">
   
        <el-row style="width: 100%;margin-top:10px;">
          <el-col :span="6">
            <div class="baseinfo">用户编号：{{result.user_id}}</div>
          </el-col>
          <el-col :span="6">
            <div class="baseinfo">用户昵称：{{result.nickname}}</div>  
          </el-col>
         <el-col :span="8">
            <div class="baseinfo">对比相似度：{{result.convidence}}</div> 
         </el-col>
        </el-row>
        <el-row style="width: 100%;">
          <el-col :span="6">
            <h3>用户头像</h3>
            <div class="avatar-uploader" >
                <img :src="result.avatar" class="avatar">
            </div>
          </el-col>

          <el-col :span="6">
            <h3>检测图片</h3>
            <div class="avatar-uploader" >
                <img :src="result.image" class="avatar">
            </div>
          </el-col>
        
        </el-row>
      
      </div>
      <div class="infoblock" style="verify?'none':'block'"> </div>
    </div>



  </imp-panel>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 6!important;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
  import panel from "../../components/panel.vue"
  import * as api from "../../api"
  import qs from "qs"

  export default {
    components: {
      'imp-panel': panel
    },
    data(){
      return {
        form: {
          id: null,
          no: '',
          name: '',
          loginName: '',
          phone: '',
          email: '',
          mobile: '',
          status: 1,
          userType: '1',
          remarks: '',
          avatar:"",
        },
        verify: 0,
        result:{
          user_id:1101,
          nickname:"boby",
          convidence:90,
          image:"https://bobbytest-1251829167.cos.ap-beijing.myqcloud.com/good/15168080941516342408348.jpg",
          avatar:"https://bobbytest-1251829167.cos.ap-beijing.myqcloud.com/good/15168080941516342408348.jpg"
        }
      }
    },
    created(){
      this.loadData();
    },
    methods: {
      onSubmit(){
        this.$http.post(api.SYS_CHECK_USER, qs.stringify(this.form))
          .then(res => {
            let aa = res.data.data;

            console.log(aa);

            this.$set(this.$data,"result",aa);
            
          })
      },
      onEditSubmit(){
        this.$http.post(api.SYS_USER_UPDATE, this.form)
          .then(res => {
            this.form = res.data;
            this.$confirm('修改成功, 是否返回列表?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.$router.push({path: 'userList'})
            })
          })
      },
      loadData(){
        if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
          this.form.id = this.$route.query.id;
          this.$http.get(api.SYS_USER_GET + "?id=" + this.form.id)
            .then(res => {
              this.form = res.data;
            })
        }
      },
      handleAvatarSuccess(data,file) {
        console.log(data);
        let aa = this.form;
        aa.avatar = data.url
        this.$set(this.$data,"form",aa);
        console.log(this.form);
      },
      beforeAvatarUpload(file) {
      }
    }
  }
</script>
