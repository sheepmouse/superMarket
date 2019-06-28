<template>
    <div class="RightHeader">

        <el-row>
            <!-- 左侧Logo图标 -->
        <el-col :span="21">
            <i class="el-icon-menu">华联超市管理系统</i>
        </el-col>
        <el-col :span="3">
            <el-col :span="10">
                <div class="headercoin">
                    <img src="@/assets/images/he.jpg" alt="">
                </div>
            </el-col>
            <el-col :span="14">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    欢迎您,胡先生<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <el-link href="#/home/Mycenter" :underline="false">个人中心</el-link>
                        </el-dropdown-item>
                    <el-dropdown-item>
                        <el-link href="#/" :underline="false" @click = "haha" >退出系统</el-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        </el-row>



    </div>

</template>
<script>
export default {
    methods:{
        haha(){
        alert('1');
        }
    }
}
</script>
<style lang="less">
    .RightHeader{

        .el-col{
            i{
                font-size: 20px;
                line-height: 55px;
            }
            .headercoin{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-top: 6px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%
                }   
            }
            
            
        }
    }
</style>
