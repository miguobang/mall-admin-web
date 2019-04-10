<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="user"
             :rules="rules"
             ref="userFrom"
             label-width="150px"
             size="small">

      <el-form-item label="用户名：" prop="username">
        <el-input v-model="user.username" class="input-width"></el-input>
      </el-form-item>

      <el-form-item label="头像：">
        <single-upload v-model="user.icon"></single-upload>
      </el-form-item>

      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="user.email" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickName">
        <el-input v-model="user.nickName" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="禁用/启用：">
        <el-radio-group v-model="user.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="user.note">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('userFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('userFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import SingleUpload from '@/components/Upload/singleUpload'
  import {createUser, getUser, updateUser} from '@/api/user'

  export default {
    name: 'UserDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      var validateEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空!!'))
        }
        setTimeout(() => {
          if (!emailReg.test(value)) {
            callback(new Error('邮箱格式有误'))
          } else {
            callback()
          }
        }, 1000)
      };
      var validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('确认密码不能为空!!'))
        }
        setTimeout(() => {
          if (value!==this.user.password) {
            callback(new Error('两次密码不一致!!'))
          } else {
            callback()
          }
        }, 1000)
      };
      return {
        user:null,
        rules: {
          email:[{required:true,validator:validateEmail,trigger:'blur'}],
          userame:[{required:true,message:"用户名不能为空!",trigger:"blur"}],
          password:[{required:true,message:"密码不能为空!",trigger:"blur"}],
          repassword:[{required:true,validator:validatePass, trigger:"blur"}],
          nickName:[{required:true,message:"昵称不能为空!",trigger:"blur"}]
        }
      }
    },
    created(){
        getUser(this.$route.query.id).then(response => {
          this.user = response.data;
        });
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                updateUser(this.$route.query.id, this.user).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


