<template>
    <div class="login-wrap">
        <div class="ms-title">
            <div class="logo"><img src="../../../static/img/logo2.png" height="46" width="46"/></div>
            <div>无锡市智慧刑侦情报研判平台</div>
        </div>
        <div class="img-police">
            <img src="../../../static/img/polic.png" height="272" width="191"/>
        </div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="valcode-box">
                    <el-form-item prop="code">
                        <el-input v-model="ruleForm.code" placeholder="验证码"></el-input>
                    </el-form-item>
                    <a @click="getNewCode"><img v-bind:src="codeImg"></a>
                </div>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import * as types from '../../store/types'
    export default {
        data: function(){
            return {
                codeImg: this.$config.request_prefix + this.$config.valcode_img,
                ruleForm: {
                    username: '',
                    password: '',
                    code: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
//            var dataTime = new Date();
//            console.log("==============");
//            jQuery.ajax({
//                type: "get",
//                url: this.$config.request_prefix + this.$config.valcode_img + '?valTime=' + dataTime.getTime(),
//                dataType: "json",
//                success: function(res){
//                    console.log(res);
//                }
//            });
        },
        methods: {
            getNewCode(){
                var dataTime = new Date();
                this.codeImg = this.$config.request_prefix + this.$config.valcode_img + '?valTime=' + dataTime.getTime();

            },
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {

                        var params = new URLSearchParams();
                        params.append('uname',self.ruleForm.username);
                        params.append('passwd', self.ruleForm.password);
                        params.append('kcode', self.ruleForm.code);
//                        self.$axios.post(self.$config.request_prefix + self.$config.login_submit, params).then((res) => {
//                            console.log(res.data);
//                            self.$router.push('/caselist');
//                        });

//                        self.$axios.post(self.$config.request_prefix + self.$config.login_submit,
//                            params,
//                            {
//                            withCredentials : true
//                        }).then(function(response) {
//                            // 这里是处理正确的回调
////                            let result = response.data.result;
////                            if (0 == result) {
////                                self.menulist = response.data.item.menulist;
////                            } else if (11 == result || 9 == result) {
////                                self.$router.push('/login');
////                            } else {
////                                console.log(response.data);
////                            }
//                            console.log(response);
//
//                        }).catch( function(response) {
//                            // 这里是处理错误的回调
//                            console.log(response)
//                        });

//                        console.log('=========' + self.$cookie.get("sessionId"));

                        jQuery.ajax({
                            type: "post",
                            url: self.$config.request_prefix + self.$config.login_submit,
                            data: {
                                'uname':self.ruleForm.username,
                                'passwd': self.ruleForm.password,
                                'kcode': self.ruleForm.code
                            },
                            xhrFields: {
                                withCredentials: true
                            },
                            dataType: "json",
                            success: function(res){
                                console.log(res);
                                if(res.success){
//                                    self.$router.push('/caselist');
                                    self.$store.commit(types.LOGIN, self.ruleForm.username);
                                    let redirect = decodeURIComponent(self.$route.query.redirect || '/');
                                    self.$router.push({
                                        path: redirect
                                    })
                                }else{
                                    self.$message({
                                        type: 'info',
                                        message: res.msg
                                    });
                                }
                            }
                        });

//                        self.$axios({
//                            method: 'post',
//                            url: 'http://myser.52jian.cn:8008/login_submit',
//                            data: params,
//                            headers: {
//                                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8"
//                            }
//                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url("../../../static/img/background.jpg");
        background-size: cover;
    }
    .ms-title{
        position: absolute;
        top:80px;
        width:100%;
        /*margin-top: -230px;*/
        text-align: center;
        font-size:40px;
        line-height: 40px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

    }
    .ms-title .logo{
        margin-right: 20px;
    }
    .img-police{
        position: absolute;
        top:50%;
        left: 50%;
        margin-top: -136px;
        margin-left: -300px;
    }
    .ms-login{
        background:rgba(36, 36, 36,0.5);
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:200px;
        margin:-150px 0 0 -90px;
        padding:40px;
        border-radius: 5px;
        /*background: #fff;*/
    }
    .valcode-box{
        display: flex;
        align-items: center;
    }
    .valcode-box a{
        display: block;
        margin-left: 20px;
        margin-bottom: 20px;
    }
    .valcode-box a img{
        height: 35px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
