<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 智慧刑侦</el-breadcrumb-item>
                <el-breadcrumb-item>反诈中心接警单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
            <el-form ref="form" :inline="true" :model="formInline">
                <el-form-item label="案件类型">
                    <el-select v-model="select_ajlx" placeholder="请选择" class="handle-select">
                        <el-option
                            v-for="item in lxList['100002']"
                            :key="item.id"
                            :label="item.lval"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="接警方式">
                    <el-select v-model="select_jjfs" placeholder="请选择" class="handle-select">
                        <el-option
                            v-for="item in lxList['100003']"
                            :key="item.id"
                            :label="item.lval"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="案发时间">
                    <el-date-picker
                        v-model="afsj_date_range"
                        type="datetimerange"
                        :picker-options="datePickerOptions"
                        placeholder="选择时间范围"
                        format="yyyy-MM-dd HH:mm:ss"
                        align="right">
                    </el-date-picker>
                </el-form-item>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="success" icon="plus" @click="addNewCase">新增</el-button>
            </el-form>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable"
                  @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="55" prop="id"></el-table-column>-->
            <el-table-column prop="id" label="编号" width="90" sortable>
            </el-table-column>
            <el-table-column prop="afsj" label="案发时间" sortable  :formatter="formatterTime">
            </el-table-column>
            <el-table-column prop="barName" label="报案人姓名">
            </el-table-column>
            <el-table-column prop="afdd" label="案发地点">
            </el-table-column>
            <el-table-column prop="barLxdh" label="联系电话">
            </el-table-column>
            <!--<el-table-column prop="ajlx" label="案件类型">-->
            <!--</el-table-column>-->
            <el-table-column prop="saje" label="涉案金额">
            </el-table-column>
            <!--<el-table-column prop="jdxz" label="警单性质">-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="140">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalSize">
            </el-pagination>
        </div>
        {{afsj_date_range}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formInline: {},
                url: '',
                tableData: [],
                lxList: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                totalSize: 0,
                pageSize: 10,
                select_ajlx: '',
                select_jjfs: '',
                afsj_date_range: '',
                datePickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            }
        },
        filters: {},
        created() {
            this.getData();
        },
        mounted() {

        },
        computed: {
            data() {

            }
        },
        methods: {
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getData();
            },
            getData() {
                let self = this;
                //请求列表数据
                jQuery.ajax({
                    type: "GET",
                    url: self.$config.request_prefix + self.$config.fetch_list + "?pageSize=" + self.pageSize + "&pageIndex=" + self.cur_page,
                    dataType: "json",
                    success: function (res) {
                        console.log(res);
                        self.tableData = res.data.list;
                        self.totalSize = res.data.totalRows;
                    }
                });

                //请求初始化菜单
                jQuery.ajax({
                    type: "GET",
                    url: self.$config.request_prefix + self.$config.fetch_menu,
                    dataType: "json",
                    success: function (res) {
                        console.log(res);
                        self.lxList = res.data.lxList;
                    }
                });
            },
            openDelMsgBox(id) {
                let self = this;
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    jQuery.ajax({
                        type: "GET",
                        url: self.$config.request_prefix + self.$config.del_case_byid + id,
                        dataType: "json",
                        success: function (res) {
                            console.log(res);
                            self.getData();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            search() {
                let self = this;
//                console.log("&afsjFrom=" + self.formatDate(self.afsj_date_range[0])
//                    + "&afsjTo=" +  self.formatDate(self.afsj_date_range[0]));
                console.log(self.afsj_date_range);
                console.log(self.afsj_date_range[0].toLocaleString());
                let fromDate = this.formatDate(self.afsj_date_range[0], 'yyyy-MM-dd hh:mm:ss');
                let toDate = this.formatDate(self.afsj_date_range[1], 'yyyy-MM-dd hh:mm:ss');
                jQuery.ajax({
                    type: "GET",
                    url: self.$config.request_prefix + self.$config.fetch_list + "?pageSize=" + self.pageSize + "&pageIndex=" +
                    self.cur_page+ "&ajlx=" + self.select_ajlx + "&jjfs=" + self.select_jjfs + "&afsjFrom=" + fromDate
                    + "&afsjTo=" + toDate,
                    dataType: "json",
                    success: function (res) {
                        console.log(res);
                        self.tableData = res.data.list;
                        self.totalSize = res.data.totalRows;
                    }
                });
            },
            addNewCase() { //跳转到添加页面
                this.$router.push('/addcase');
            },
            formatter(row, column) {
                return row.address;
            },
            formatterTime(row, column) { //格式化时间
                var date = new Date(row.afsj);
                return this.formatDate(date, 'yyyy-MM-dd hh:mm');
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
//                this.$message('编辑第' + (row.id) + '行');
                this.$router.push('/editcase/' + row.id);
            },
            handleDelete(index, row) {
//                this.$message.error('删除第' + (index + 1) + '行');
                this.openDelMsgBox(row.id);
            },

            delAll() {
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了' + str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    /*.handle-input {*/
        /*width: 200px;*/
        /*display: inline-block;*/
    /*}*/

    .input-location {
        /*width: 100%;*/
    }
</style>
