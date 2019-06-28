<template>
  <div class="addProdct">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>商品添加</h1>
      </div>
      <!-- 内容 -->
      <div>
        <el-form
          :label-position="labelposition"
          label-width="100px"
          :model="goodsData"
          :rules="rules"
          ref="goodsData"
          size="mini"
          style="width:400px;"
        >
          <!-- 所属分类 -->
          <el-form-item label="所属分类:" prop="classify">
            <el-select v-model="goodsData.classify" placeholder="请选择所属分类">
              <el-option label="零食" value="零食"></el-option>
              <el-option label="日用品" value="日用品"></el-option>
              <el-option label="家居用品" value="家居用品"></el-option>
              <el-option label="饮料" value="饮料"></el-option>
              <el-option label="水果" value="水果"></el-option>
              <el-option label="蔬菜" value="蔬菜"></el-option>
            </el-select>
          </el-form-item>
          <!-- 条形码 -->
          <el-form-item label="条形码:" prop="num">
            <el-input style="width:200px;" v-model="goodsData.num"></el-input>
            <el-button type="primary" size="mini" style="margin-left:10px;">生成条形码</el-button>
          </el-form-item>
          <!-- 商品名称 -->
          <el-form-item label="商品名称:" prop="name">
            <el-input v-model="goodsData.name"></el-input>
          </el-form-item>
          <!-- 商品售价 -->
          <el-form-item label="商品售价:" prop="price">
            <el-input inline v-model="goodsData.price"></el-input>
          </el-form-item>
          <!-- 市场价 -->
          <el-form-item label="市场价:">
            <el-input inline v-model="goodsData.marketPrice"></el-input>默认为市场售价的两倍
          </el-form-item>
          <!-- 商品进价 -->
          <el-form-item label="商品进价:">
            <el-input inline v-model="goodsData.enterprice"></el-input>
          </el-form-item>
          <!-- 入库数量 -->
          <el-form-item label="入库数量:">
            <el-input inline v-model="goodsData.enterNum"></el-input>商品单位为千克
          </el-form-item>
          <!-- 商品重量 -->
          <el-form-item label="商品重量:">
            <el-input inline v-model="goodsData.weight"></el-input>商品单位为千克
          </el-form-item>
          <!-- 商品单位 -->
          <el-form-item label="商品单位:">
            <el-input inline v-model="goodsData.unit"></el-input>商品单位为千克
          </el-form-item>
          <!-- 会员优惠 -->
          <el-form-item label="会员优惠:">
            <el-radio v-model="goodsData.radio" label="享受">享受</el-radio>
            <el-radio v-model="goodsData.radio" label="不享受">不享受</el-radio>
          </el-form-item>
          <!-- 是否促销 -->
          <el-form-item label="是否促销:">
            <el-radio v-model="goodsData.radio1" label="促销">启用</el-radio>
            <el-radio v-model="goodsData.radio1" label="不促销">禁用</el-radio>
          </el-form-item>
          <!-- 商品简介 -->
          <el-form-item label="商品简介:">
            <el-input style="width:400px;" type="textarea" v-model="goodsData.desc"></el-input>不超过两百个汉字
          </el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import Pricereg from "@/utils/passwordReg";
import { log } from "util";
import { goodsAdd } from "@/api/goods";
export default {
  data() {
    return {
      goodsData: {
        //分类
        classify: "",
        num: "",
        name: "",
        price: "",
        marketPrice: "",
        enterprice: "",
        enterNum: "",
        weight: "",
        unit: "",
        radio: "",
        radio1: ""
      },
      //规则
      rules: {
        classify: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        name: [{ required: true, message: "请选择商品名称", trigger: "blur" }],
        price: [
          { required: true, message: "商品价格不能为空", trigger: "blur" }
        ],
        num: [{ required: true, message: "条形码不能为空", trigger: "blur" }]
      },

      // lable显示位置
      labelposition: "top",
    
    };
  },

  methods: {
    onSubmit() {
      this.$refs.goodsData.validate(valid => {
        if (valid) {
          let params = {
            classify: this.goodsData.classify,
            num: this.goodsData.num,
            name: this.goodsData.name,
            price: this.goodsData.price,
            marketPrice: this.goodsData.marketPrice,
            enterpric: this.goodsData.enterprice,
            enterNum: this.goodsData.enterNum,
            weight: this.goodsData.weight,
            unit: this.goodsData.unit,
            radio: this.goodsData.radio,
            radio1: this.goodsData.radio1
          };
          goodsAdd(params)
            .then(response => {
              let { code, reason } = response;
              if (code === 1) {
                this.$message({
                  message: reason,
                  type: "success"
                });
                setTimeout(() => {
                  this.$router.push("/home/productManage");
                }, 2000);
              } else if (code === 0) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("请仔细填写商品信息");
        }
      });
    }
  }
};
</script>
 <style lang="less">
</style>
 