<template>
  <div class="login">
    <div class="login-warper">
      <div class="title">
        <span class="el-icon-s-custom"></span>
        华联超市管理系统
      </div>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="info" @click="submitForm()">登录</el-button>
          <el-button type="info" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//引入验证密码函数
import { passwordReg } from "@/utils/passwordReg";

export default {
  data() {
    //密码验证
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (!passwordReg(value)) {
        callback(new Error("只能输入6-20个字母、数字、下划线 "));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };

    //确认密码
    const confirmPassword = (rule, value, callback) => {
      //非空验证
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      }
      //rule验证规则对象 value 用户输入数据
      if (value != this.loginForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      //表单数据
      loginForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      //验证规则
      rules: {
        account: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 6,
            message: "用户名长度为2~6位之间",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: checkPassword,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            validator: confirmPassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //登录函数
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let params = {
            account: this.loginForm.account,
            password: this.loginForm.password
          };
          this.axios
            .post(
              "http://127.0.0.1:666/account/checklogin",
              this.qs.stringify(params)
            )
            .then(response => {
              let data = response.data;
              let { code, reason, token } = data;
              if (code === 0) {
                window.localStorage.setItem("keynum", token);
                // 弹出登录成功
                this.$message({
                  message: data.reason,
                  type: "success"
                });

                this.$router.push("/home/SystemMassage");
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
          // alert('登录成功');
          // this.$router.push("/home")
          //
        } else {
          console.log("验证不成功");
        }
      });
    },
    //重置
    resetForm() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>
<style lang="less">
@import "./login.less";
</style>
