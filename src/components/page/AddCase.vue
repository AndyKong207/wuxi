<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/caselist'}"><i class="el-icon-date"></i> 反诈骗中心接警单</el-breadcrumb-item>
                <div v-if="isAdd">
                    <el-breadcrumb-item>新增警单</el-breadcrumb-item>
                </div>
                <div v-else>
                    <el-breadcrumb-item>编辑警单</el-breadcrumb-item>
                </div>

            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="ruleForm" :model="form" label-width="80px" :rules="rules">
                <div class="form-item-box">
                    <div class="form-box-horizon form-box-1">
                        <el-form-item label="止付金额" prop="zfje">
                            <el-input v-model.number="form.zfje"></el-input>
                        </el-form-item>
                        <el-form-item label="警单性质" prop="jdxz">
                            <el-select v-model="form.jdxz" placeholder="请选择">
                                <el-option
                                    v-for="item in lxList['100001']"
                                    :key="item.id"
                                    :label="item.lval"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="报警时间" prop="jjsj">
                            <el-date-picker type="datetime" placeholder="选择日期时间" v-model="form.jjsj"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <!--{{form.jjsj | formatDate}}-->
                        <!--{{form.jjsj + ','+ typeof(form.jjsj)}}-->
                        <!--{{formatDate + ',=>'+ typeof(formatDate)}}-->
                    </div>
                </div>
                <!--报案人信息-->
                <div class="form-item-box">
                    <div class="form-item-title">
                        <img src="../../../static/img/BAR.png" height="22" width="24"/>
                        <div class="title-text">报案人信息</div>
                        <a>
                            <img src="../../../static/img/BJ.png" height="22" width="21"/>
                        </a>
                    </div>
                    <div class="form-box-horizon form-box-2">
                        <el-form-item label="姓名" prop="barName">
                            <el-input v-model="form.barName" ></el-input>
                        </el-form-item>
                        <el-form-item label="身份证" prop="barSfz">
                            <el-input v-model="form.barSfz"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="barLxdh">
                            <el-input v-model="form.barLxdh"></el-input>
                        </el-form-item>
                        <el-form-item label="接警方式" prop="jjfs">
                            <el-select v-model="form.jjfs" placeholder="请选择">
                                <el-option
                                    v-for="item in lxList['100003']"
                                    :key="item.id"
                                    :label="item.lval"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="form-item-box">
                    <div class="form-item-title">
                        <img src="../../../static/img/AJ.png" height="22" width="24"/>
                        <div class="title-text">案件信息</div>
                        <a>
                            <img src="../../../static/img/BJ.png" height="22" width="21"/>
                        </a>
                    </div>
                    <div class="form-box-horizon form-box-1">
                        <el-form-item label="案件类型" prop="ajlx">
                            <el-select v-model="form.ajlx" placeholder="请选择">
                                <el-option
                                    v-for="item in lxList['100002']"
                                    :key="item.id"
                                    :label="item.lval"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="案件类别" prop="ajlx">
                            <el-select v-model="form.ajlb" placeholder="请选择" filterable>
                                <el-option
                                    v-for="item in lxList['100005']"
                                    :key="item.id"
                                    :label="item.lval"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="案发时间" prop="afsj">
                            <el-date-picker type="datetime" placeholder="选择日期" v-model="form.afsj"
                                            style="width: 100%;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="涉案金额" prop="saje">
                            <el-input v-model.number="form.saje"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="案发地点" prop="afdd">
                        <el-input v-model="form.afdd"></el-input>
                    </el-form-item>
                    <el-form-item label="案件简述" prop="jyaq">
                        <el-input type="textarea" v-model="form.jyaq"></el-input>
                    </el-form-item>
                    <div class="form-box-sub-title">受害人信息</div>
                    <div class="form-item-box">
                        <!--<victim-account v-on:remove-victim="removeVictim" :show-del="false"></victim-account>-->
                        <!--<div>-->
                            <!--<victim-account v-for="item in victimList" v-on:remove-victim="removeVictim"-->
                                            <!--:show-del="true" :key="item.id"></victim-account>-->
                        <!--</div>-->
                        <div v-for="(item, index) in form.victimList" class="dynamicBox">
                            <div class="form-box-horizon form-box-1">
                                <el-form-item label="银行卡">
                                    <el-input v-model="item.shrYhk"></el-input>
                                </el-form-item>
                                <el-form-item label="支付宝">
                                    <el-input v-model="item.shrZfb"></el-input>
                                </el-form-item>
                                <el-form-item label="微信">
                                    <el-input v-model="item.shrWx"></el-input>
                                </el-form-item>
                                <el-form-item label="QQ">
                                    <el-input v-model="item.shrQq"></el-input>
                                </el-form-item>

                            </div>
                            <div class="form-box-horizon">
                                <el-form-item label="资金流出">
                                    <el-select v-model="item.shrZjlcfs" placeholder="请选择">
                                        <el-option
                                        v-for="item in lxList['100004']"
                                        :key="item.id"
                                        :label="item.lval"
                                        :value="item.id">
                                        </el-option>
                                        <!--<el-option key="bbk" label="ATM现金汇款" value="bbk"></el-option>-->
                                        <!--<el-option key="xtc" label="网络汇款" value="xtc"></el-option>-->
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="danger" @click="removeVictim(item)" icon="minus" v-show="true"></el-button>
                                </el-form-item>
                            </div>
                        </div>

                        <div class="victim-add-btn-box">
                            <el-button type="default" @click="addVictim" icon="plus"></el-button>
                        </div>
                    </div>
                    <div class="form-box-sub-title">嫌疑人银行及账号</div>
                    <div class="form-item-box">
                        <!--<criminal-info></criminal-info>-->
                        <!--<div>-->
                            <!--<criminal-info v-for="item in criminalList" :key="item.id" :show-del="true" v-on:remove-criminal="removeCriminal"></criminal-info>-->
                        <!--</div>-->

                        <div v-for="(item, index) in form.criminalList" class="dynamicBox">
                            <div class="form-box-horizon">
                                <el-form-item label="银行卡">
                                    <el-input v-model="item.xyrYhk"></el-input>
                                </el-form-item>
                                <el-form-item label="支付宝">
                                    <el-input v-model="item.xyrZfb"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="danger" @click="removeCriminal(item)" icon="minus" v-show="true"></el-button>
                                </el-form-item>
                            </div>
                            <div class="form-box-horizon">
                                <el-form-item label="电话">
                                    <el-input v-model="item.xyrDh"></el-input>
                                </el-form-item>
                                <el-form-item label="微信">
                                    <el-input v-model="item.xyrWx"></el-input>
                                </el-form-item>
                                <el-form-item label="QQ">
                                    <el-input v-model="item.xyrQq"></el-input>
                                </el-form-item>

                            </div>
                        </div>
                        <div class="victim-add-btn-box">
                            <el-button type="default" @click="addCriminal" icon="plus"></el-button>
                        </div>
                    </div>
                    <el-form-item label="涉案网址" prop="sawz">
                        <el-input v-model="form.sawz"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.bz"></el-input>
                    </el-form-item>
                    <div class="form-submit-box">
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            <!--<el-button type="danger" @click="onSubmit">暂存</el-button>-->
                            <el-button @click="onCancel">取消</el-button>
                        </el-form-item>
                    </div>
                </div>

            </el-form>
        </div>

    </div>
</template>


<script>
    export default {
        data: function () {
            //验证金额
            var checkAmount = (rule, value, callback) => {
                var vdt = this.VDT.vdata(value, {'required': {msg: '请输入金额'}, 'number': {msg: '请输入数字'}, 'max': {param: '9999999999.99', msg: '金额输入过大'}});
                if(!vdt.result){
                    callback(new Error(vdt.msg));
                }else {
                    callback();
                }
            };
            //验证时间
            var checkDate = (rule, value, callback) => {
                var vdt = this.VDT.vdata(value, {'required': {msg: '请选择时间'}});
                if(!vdt.result){
                    callback(new Error(vdt.msg));
                }else {
                    callback();
                }
            };
            var checkPhoneNumber = (rule, value, callback) => {
                var vdt = this.VDT.vdata(value, {'required': {msg: '请输入电话号码'}, 'tmphone': {msg: '请输入正确的号码格式'}});
                if(!vdt.result){
                    callback(new Error(vdt.msg));
                }else {
                    callback();
                }
            };

            var checkIdNumber = (rule, value, callback) => {
                var vdt = this.VDT.vdata(value, {'required': {msg: '请输入电话号码'}, 'cnId': {msg: '请输入正确的身份证号码格式'}});
                if(!vdt.result){
                    callback(new Error(vdt.msg));
                }else {
                    callback();
                }
            };

            var checkBankCard = (rule, value, callback) => {
                var vdt = this.VDT.vdata(value, {'bankCard': {msg: '请输入正确的银行卡号'}});
                if(!vdt.result){
                    callback(new Error(vdt.msg));
                }else {
                    callback();
                }
            };
            return {
                caseId: '',
                form: {
                    id: '',
                    zfje: '',		//止付金额
                    jdxz: '',		//	警单性质
                    jjsj: '',			//	接警时间
                    barName: '',		//	报案人名称
                    barSfz: '',		//	报案人身份证
                    barLxdh: '',		//	报案人联系电话
                    jjfs: '',		//	接警方式
                    ajlx: '',		//	案件类型
                    ajlb: '',       //案件类别
                    afsj: '',			//	案发时间
                    saje: '',	//	涉案金额
                    afdd: '',		//	案发地点
                    jyaq: '',		//	简要案情
                    sawz: '',		//	涉案网址
                    bz: '',			//	备注
                    zt: '',			// 	状态
                    victimList: [{
                        shrYhk: '',		//	受害人银行卡
                        shrZfb: '',		//	受害人支付宝
                        shrWx: '',		//	受害人微信
                        shrQq: '',		//	受害人QQ
                        shrZjlcfs: '',		//	受害人资金流出方式
                    }],
                    criminalList: [{
                        xyrYhk: '',		//	嫌疑人银行卡
                        xyrZfb: '',		//	嫌疑人支付宝
                        xyrWx: '',		//	嫌疑人微信
                        xyrQq: '',		//	嫌疑人QQ
                        xyrDh: '',		// 	嫌疑人电话
                    }],
                },
                lxList: [],
                isAdd: true,
                rules:{
                    zfje: [{required: true, validator: checkAmount, trigger: 'change'}],//止付金额
                    saje: [{required: true, validator: checkAmount, trigger: 'change'}],	//	涉案金额
                    jjsj: [{required: true, validator: checkDate, trigger: 'change'}],//	接警时间
                    afsj: [{required: true, validator: checkDate, trigger: 'change'}],			//	案发时间
                    jdxz: [{required: true, message: '请选择警单性质', trigger: 'change', type: 'number'}],		//	警单性质
                    barName: [{required: true, message: '请输入报案人名称', trigger: 'blur'}],		//	报案人名称
                    barSfz: [{required: true, validator: checkIdNumber, trigger: 'change'}],		//	报案人身份证
                    barLxdh: [{required: true, validator: checkPhoneNumber, trigger: 'change'}],		//	报案人联系电话
                    jjfs: [{required: true, message: '请选择接警方式', trigger: 'change', type: 'number'}],		//	接警方式
                    ajlx: [{required: true, message: '请选择案件类型', trigger: 'change', type: 'number'}],		//	案件类型
                    afdd: [{required: true, message: '请输入案发地点', trigger: 'blur'}],		//	案发地点
                    jyaq: [{required: true, message: '请输入简要案情', trigger: 'blur'}],		//	简要案情
                    shrYhk: [{validator: checkBankCard, trigger: 'change'}]     //银行卡账号
//                    sawz: [{required: true, message: '请输入涉案网址', trigger: 'blur'}]		//	涉案网址
//                    shrYhk: [{required: true, message: '请输入受害人银行卡', trigger: 'blur'}],		//	受害人银行卡
//                    shrZfb: [{required: true, message: '请输入受害人支付宝', trigger: 'blur'}],		//	受害人支付宝
//                    shrWx: [{required: true, message: '请输入受害人微信', trigger: 'blur'}],		//	受害人微信
//                    shrQq: [{required: true, message: '请输入受害人QQ', trigger: 'blur'}],		//	受害人QQ
//                    shrZjlcfs: [{required: true, message: '请选择受害人资金流出方式', trigger: 'change'}],		//	受害人资金流出方式
//                    xyrYhk: [{required: true, message: '请输入嫌疑人银行卡', trigger: 'blur'}],		//	嫌疑人银行卡
//                    xyrZfb: [{required: true, message: '请输入嫌疑人支付宝', trigger: 'blur'}],		//	嫌疑人支付宝
//                    xyrWx: [{required: true, message: '请输入嫌疑人微信', trigger: 'blur'}],		//	嫌疑人微信
//                    xyrQq: [{required: true, message: '请输入嫌疑人QQ', trigger: 'blur'}],		//	嫌疑人QQ
//                    xyrDh: [{required: true, message: '请输入嫌疑人电话', trigger: 'blur'}],		// 	嫌疑人电话
                }
            }
        },
//        computed: {
//            formatDate: function () {
//                return  new Date(this.form.jjsj);
//            }
//        },
        created() {
            this.getData();
        },
        methods: {
            submitForm(formName) {
                let self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.onSubmit();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            onSubmit() {
                let self = this;

                console.log(typeof(self.form.jjsj));

                var params = new URLSearchParams();
                params.append('id', self.form.id);
                params.append('zfje', self.form.zfje);
                params.append('jdxz', self.form.jdxz);
                if(typeof(self.form.jjsj) === 'number'){
                    console.log(new Date(self.form.jjsj).toLocaleString());
                    params.append('jjsj', this.formatDate(new Date(self.form.jjsj), 'yyyy-MM-dd hh:mm:ss'));
                }else{
                    params.append('jjsj', this.formatDate(self.form.jjsj, 'yyyy-MM-dd hh:mm:ss'));
                }
                params.append('barName', self.form.barName);
                params.append('barSfz', self.form.barSfz);
                params.append('barLxdh', self.form.barLxdh);
                params.append('jjfs', self.form.jjfs);
                params.append('ajlx', self.form.ajlx);
                params.append('ajlb', self.form.ajlb);
                if(typeof(self.form.afsj) === 'number'){
                    console.log(new Date(self.form.afsj).toLocaleString());
                    params.append('afsj', this.formatDate(new Date(self.form.afsj), 'yyyy-MM-dd hh:mm:ss'));
                }else{
                    params.append('afsj', this.formatDate(self.form.afsj, 'yyyy-MM-dd hh:mm:ss'));
                }
                params.append('saje', self.form.saje);
                params.append('afdd', self.form.afdd);
                params.append('jyaq', self.form.jyaq);
//                params.append('shrYhk', self.form.shrYhk);
//                params.append('shrZfb', self.form.shrZfb);
//                params.append('shrWx', self.form.shrWx);
//                params.append('shrQq', self.form.shrQq);
//                params.append('shrZjlcfs', self.form.shrZjlcfs);
//                params.append('xyrYhk', self.form.xyrYhk);
//                params.append('xyrZfb', self.form.xyrZfb);
//                params.append('xyrWx', self.form.xyrWx);
//                params.append('xyrQq', self.form.xyrQq);
//                params.append('xyrDh', self.form.xyrDh);
                params.append('sawz', self.form.sawz);
                params.append('bz', self.form.bz);
                params.append('zt', self.form.zt);
                params.append('victimList', JSON.stringify(self.form.victimList));
                params.append('criminalList', JSON.stringify(self.form.criminalList));

                for(let p of params){
                    console.log(p);
                }

                this.$axios.post(self.$config.request_prefix + self.$config.edit, params).then((res) => {
                    console.log(res.data);
                    this.$message.success('提交成功！');
                    this.$router.push('/caselist');
                });
            },
            onCancel() {
                this.$router.push('/caselist');
            },
            getData() {
                let self = this;

                if (typeof(self.$route.params.id) != "undefined") {
                    self.isAdd = false;
                    self.caseId = self.$route.params.id;
                    self.form.id = self.caseId;

                    jQuery.ajax({
                        type: "GET",
                        url: self.$config.request_prefix + self.$config.fetch_list_byid + self.caseId,
                        dataType: "json",
                        success: function (res) {
//                            console.log(res);
                            self.form = res.data.fzzxJjd;
                        }
                    });
                }

                jQuery.ajax({
                    type: "GET",
                    url: self.$config.request_prefix + self.$config.fetch_menu,
                    dataType: "json",
                    success: function (res) {
//                        console.log(res);
                        self.lxList = res.data.lxList;
                    }
                });
            },
            addVictim() { //新增受害者
                this.form.victimList.push({
                    shrYhk: '',		//	受害人银行卡
                    shrZfb: '',		//	受害人支付宝
                    shrWx: '',		//	受害人微信
                    shrQq: '',		//	受害人QQ
                    shrZjlcfs: '',		//	受害人资金流出方式
                });
            },
            addCriminal(){ //新增嫌疑人
                this.form.criminalList.push({
                    xyrYhk: '',		//	嫌疑人银行卡
                    xyrZfb: '',		//	嫌疑人支付宝
                    xyrWx: '',		//	嫌疑人微信
                    xyrQq: '',		//	嫌疑人QQ
                    xyrDh: '',		// 	嫌疑人电话
                    }
                );
            },
            removeVictim(item) { //删除受害者
                var i = this.form.victimList.indexOf(item);
                this.form.victimList.splice(i, 1)
            },
            removeCriminal(item){ //删除嫌疑人
                var i = this.form.criminalList.indexOf(item);
                this.form.criminalList.splice(i, 1)
            }
        }
    }
</script>
<style>
    .form-box-horizon {
        display: flex;
        align-items: center;
    }

    .form-box-horizon .el-form-item {
        width: 250px;
    }

    .form-box-horizon .el-select {
        width: 100%;
    }

    .form-box-1 .el-form-item {
        width: 100%;
    }

    .form-box-2 .el-form-item {
        width: 25%;
    }

    .recorder-box {
        display: flex;
    }

    .recorder-box .el-form-item {
        /*width: 250px;*/
        margin-left: auto;
    }

    .form-submit-box {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }

    .form-submit-box .el-button {
        margin-right: 20px;
    }

    .form-item-box-grey {
        /*background-color: #8c939d;*/
    }

    .form-item-box {
        border: 1px solid #c8c7cc;
        padding: 10px;
        margin-bottom: 20px;
    }

    .form-item-title {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
    }

    .form-item-title .title-text {
        margin-left: 20px;
    }

    .form-item-title a {
        margin-left: auto;
    }

    .form-box-sub-title {
        margin-bottom: 10px;
    }

    .long-label .el-form-item {
        width: 400px;
    }

    .long-label .el-form-item label {
        width: 150px !important;
    }

    .long-label .el-form-item .el-form-item__content {
        margin-left: 150px !important;
    }

    .victim-add-btn-box {
        width: 100%;
        text-align: right;
    }

    .victim-add-btn-box .el-button {

    }

    .dynamicBox{
        border-bottom: dashed 1px #c8c7cc;
        padding-top: 10px;
        margin-bottom: 10px;
    }
</style>
