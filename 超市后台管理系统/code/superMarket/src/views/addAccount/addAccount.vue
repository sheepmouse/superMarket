<template>
  <div class="addAccount">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>账号添加</h1>
      </div>

      <!-- 添加账号表单 -->
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
          <el-form-item label="用户名" prop="user">
            <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="用户组" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择用户组类型">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通用户" value="普通用户"></el-option>
                </el-select>
        </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
//引入密码验证函数
import{ passwordReg } from '@/utils/passwordReg'

export default {
  data() {
        //密码验证
        const checkPassword = (rule,value,callback) => {
            if( value === ''){
                callback(new Error('密码不能为空'))
            
            }else if(!passwordReg(value)){
                callback(new Error('只能输入6-20个字母、数字、下划线 '))
            }else{
                if(this.ruleForm.checkPass !== ''){
                    this.$refs.ruleForm.validateField('checkPass')
                } 
                 callback();
            }           
        }

        //确认密码
        const confirmPassword = (rule,value,callback) => {
            //非空验证
            if( value === ''){
                callback(new Error('确认密码不能为空'))
            }
            //rule验证规则对象 value 用户输入数据  
            if( value != this.ruleForm.password){
                callback(new Error('两次密码不一致'))
            }else{
                callback();
            }

        }
    return {
      ruleForm: {
        user: "",
        password: "",
        checkPass: "",
        region:''
      },
      //验证规则

      rules: {
          user:[
            {required:true,message:'请输入用户名',trigger:'blur'},
            {min:2,max:6,message:'用户名长度为2~6位之间',trigger:'blur'} 
          ],
          password:[
            {required:true,validator:checkPassword,trigger:'blur'},
          ],
          checkPass:[
            {required:true,validator:confirmPassword,trigger:'blur'},
          ],
          region:[
            {required:true,message:'请选择用户组',trigger:'change'},
          ],
      }
    }
  },
  methods:{
    submitForm(){
        this.$refs.ruleForm.validate(valid =>{
            if( valid ){
                let params = {
                    account:this.ruleForm.user,
                    password:this.ruleForm.password,
                    region:this.ruleForm.region,
                }
								// 发送axios请求
								this.axios.post('http://127.0.0.1:666/account/addaccount', this.qs.stringify(params))
								.then(response=>{
									if(response.data.code===0){
										 this.$message({
										message: response.data.reason,
										type: 'success',
										
									});
									this.$router.push('/home/accountManage')
									
									}else if(response.data.code===1){
										this.$message.error(reason)
									};
														
								})
								.catch(err=>{
										console.log(err)
								})
								
	
                
            }else{
                console.log('验证不成功');
                
            }
        })
      }
  }
  
};
</script>
 <style lang="less">
</style>
 