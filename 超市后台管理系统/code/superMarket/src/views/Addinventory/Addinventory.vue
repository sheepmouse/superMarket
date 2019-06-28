<template>
  <div class="Addinventory">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>添加库存</h1>
      </div>
      <!-- 内容 -->
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          style="width:300px"
        >
          <el-form-item label="商品条形码" prop="codenum">
            <el-input type="text" v-model.number="ruleForm.codenum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数量" prop="num">
            <el-input type="text" v-model.number="ruleForm.num" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item type="number" label="进价" prop="price">
            <el-input v-model.number="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        codenum: "",
        num: "",
        price: ""
      },
      rules: {
        codenum: [
          { required: true, message: "条形码不能为空" },
          { type: "number", message: "条形码必须为数字值" }
        ],
        num: [
          { required: true, message: "数量不能为空" },
          { type: "number", message: "价格必须为数字值" }
        ],
        price: [
          { required: true, message: "价格不能为空" },
          { type: "number", message: "价格必须为数字值" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let parmas = {
            codenum: this.ruleForm.codenum,
            price: this.ruleForm.price,
            num: this.ruleForm.num
          };

          this.axios.post("http://127.0.0.1:666/addinventory",this.qs.stringify(parmas))
          .then(response=>{
           let {code,reason} = response.data
            	if(response.data.code===1){
										 this.$message({
										message: response.data.reason,
										type: 'success',
										
									});
									this.$router.push('/home/inventoryControl')
									
									}else if(response.data.code===1){
										this.$message.error(reason)
									};
          })
          .catch(err=>{
            console.log(err);
            
          })
        } else {
          alert("添加失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>