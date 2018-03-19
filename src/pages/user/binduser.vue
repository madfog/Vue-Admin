<template>
  <imp-panel title="绑定用户">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="名称">
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>
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
        }
      }
    },
    created(){
      this.loadData();
    },
    methods: {
      onSubmit(){
        this.$http.post(api.SYS_BIND_USER, this.form)
          .then(res => {
            this.form = res.data;
            this.$confirm('添加成功, 是否返回列表?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              //alert("添加成功");
            })
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
