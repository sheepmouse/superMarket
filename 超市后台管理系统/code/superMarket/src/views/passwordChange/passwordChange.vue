<template>
  <div class="passwordChange">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>密码修改</h1>
      </div>

      <!-- 密码修改表单 -->
      <div>
        <el-form
          style="width:318px"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldPassword">
            <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="新密码" prop="newpassword">
            <el-input type="password" v-model="ruleForm.newpassword" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认新密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { passwordReg } from "@/utils/passwordReg";
export default {
  data() {
    //旧密码
    const oldPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("旧密码不能为空"));
      } else if (!passwordReg(value)) {
        callback(new Error("只能输入6-20个字母、数字、下划线 "));
      } else {
        callback();
      }
    };

    //新密码
    const newPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("新密码不能为空"));
      } else if (!passwordReg(value)) {
        callback(new Error("只能输入6-20个字母、数字、下划线 "));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    //验证密码
    const checkPass = (rule, value, callback) => {
      //非空验证
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      }
      //rule验证规则对象 value 用户输入数据
      if (value != this.ruleForm.newpassword) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      //数据
      ruleForm: {
        oldPassword: "",
        newpassword: "",
        checkPass: ""
      },
      rules: {
        oldPassword: [
          { required: true, validator: oldPassword, trigger: "blur" }
        ],
        newpassword: [
          { required: true, validator: newPassword, trigger: "blur" }
        ],
        checkPass: [{ required: true, validator: checkPass, trigger: "blur" }]
      }
    };
  },
  methods: {
      //修改密码
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            newPassword: this.ruleForm.newpassword
          };
          console.log(params);
          alert("修改成功");
        } else {
          console.log("修改失败");
        }
      });
    }
  }
};
</script>
 <style lang="less">
</style>
 