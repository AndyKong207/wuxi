<template>
    <div>
        <div class="form-box-horizon form-box-1">
            <el-form-item label="银行卡">
                <el-input v-model="form.shrYhk"></el-input>
            </el-form-item>
            <el-form-item label="支付宝">
                <el-input v-model="form.shrZfb"></el-input>
            </el-form-item>
            <el-form-item label="微信">
                <el-input v-model="form.shrWx"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
                <el-input v-model="form.shrQq"></el-input>
            </el-form-item>

        </div>
        <div class="form-box-horizon">
            <el-form-item label="资金流出">
                <el-select v-model="form.shrZjlcfs" placeholder="请选择">
                    <!--<el-option-->
                    <!--v-for="item in lxList['100004']"-->
                    <!--:key="item.id"-->
                    <!--:label="item.lval"-->
                    <!--:value="item.id">-->
                    <!--</el-option>-->
                    <el-option key="bbk" label="ATM现金汇款" value="bbk"></el-option>
                    <el-option key="xtc" label="网络汇款" value="xtc"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="remove" icon="minus" v-show="showDel"></el-button>
            </el-form-item>
        </div>
    </div>

</template>
<script>
    export default {
        data(){
            return {
                form: {
                    shrYhk: '',
                    shrZfb: '',
                    shrWx: '',
                    shrQq: '',
                    shrZjlcfs: ''
                }
            }
        },
        props: ['showDel', 'victimForm'],
        methods: {
            remove(){
                this.$emit('remove-victim', this);
            }
        }

    }
</script>
