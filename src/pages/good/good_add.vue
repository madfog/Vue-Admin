<template>
  <imp-panel :title="form.id ? '编辑':'新增商品'">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
  class="avatar-uploader"
  action="http://upload.cloudarch.info/upload_pic.php"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="form.pic_addr" :src="form.pic_addr" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload> 
      </el-form-item>
      <el-form-item label="RFID">
        <el-input v-model="form.rfid"></el-input>
      </el-form-item>
      <el-form-item label="图像识别">
        <el-input v-model="form.isPiccsan"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>


      
      <el-form-item>
        <el-button type="info" @click="onEditSubmit" v-if="form.id">保存</el-button>
        <el-button type="primary" @click="onSubmit" v-else>立即创建</el-button>
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
          pic_addr:"",
        }
      }
    },
    created(){
      this.loadData();
    },
    methods: {
      onSubmit(){
      this.form.group = 2;
        this.$http.post(api.SYS_GOOD_LIST , this.form)
          .then(res => {
            this.form = res.data;
            this.$confirm('添加成功, 是否返回列表?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.$router.push({path: 'list'})
            })
          })
      },
      onEditSubmit(){
        this.$http.put(api.SYS_GOOD_LIST + this.form.id + "/", this.form)
          .then(res => {
            this.form = res.data;
            this.$confirm('修改成功, 是否返回列表?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.$router.push({path: 'list'})
            })
          })
      },
      loadData(){
        if (this.$route.query && this.$route.query != null && this.$route.query.id && this.$route.query.id != null) {
          this.form.id = this.$route.query.id;
          this.$http.get(api.SYS_GOOD_LIST  + this.form.id + "/")
            .then(res => {
              this.form = res.data;
            })
        }
      },
      handleAvatarSuccess(data,file) {
        console.log(data);
        let aa = this.form;
        aa.pic_addr = data.url
        this.$set(this.$data,"form",aa);
        console.log(this.form);
      },
      beforeAvatarUpload(file) {
      }
    }
  }
</script>
