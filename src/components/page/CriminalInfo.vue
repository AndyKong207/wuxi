<template>
    <div>
        <div class="form-box-horizon">
            <el-form-item label="银行卡">
                <el-input v-model="form.xyrYhk"></el-input>
            </el-form-item>
            <el-form-item label="支付宝">
                <el-input v-model="form.xyrZfb"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="remove" icon="minus" v-show="showDel"></el-button>
            </el-form-item>
        </div>
        <div class="form-box-horizon">
            <el-form-item label="电话">
                <el-input v-model="form.xyrDh"></el-input>
            </el-form-item>
            <el-form-item label="微信">
                <el-input v-model="form.xyrWx"></el-input>
            </el-form-item>
            <el-form-item label="QQ">
                <el-input v-model="form.xyrQq"></el-input>
            </el-form-item>

        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                form: {
                    xyrYhk: '',		//	受害人银行卡
                    xyrZfb: '',		//	受害人支付宝
                    xyrDh: '',		//	受害人微信
                    xyrWx: '',		//	受害人QQ
                    xyrQq: ''
                }
            }
        },
        props: ['showDel'],
        methods: {
            remove(){
                this.$emit('remove-criminal', this);
            }
        }

    }
</script>
