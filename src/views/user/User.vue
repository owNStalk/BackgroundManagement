<template>
        <!--新增&检索-->
        <div class="toolBar">
                <el-button type="primary" @click="add">新增</el-button>
                <el-form :inline="true">
                        <el-form-item>
                                <el-input placeholder="请输入用户名" v-model="searchData.keyword"/>
                        </el-form-item>
                        <el-form-item>
                                <el-button type="primary" @click="onSearch">检索</el-button>
                        </el-form-item>
                </el-form>
        </div>
        <!--表数据展示-->
        <div class="tableContainer">
                <el-table :data="userList">
                        <el-table-column
                                v-for="item in tableLabel"
                                :key="item.mark"
                                :label="item.label"
                                :prop="item.mark"
                                :width="item.width ? item.width : 135"
                        />
                        <el-table-column fixed="right" label="操作" min-width="140px">
                                <template #default="currentData">
                                        <el-button size="small" @click="edit(currentData.row)">编辑</el-button>
                                        <el-button type="danger" size="small" @click="onDelete(currentData.row)">删除</el-button>
                                </template>
                        </el-table-column>
                </el-table>
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="pagingSettings.total"
                        class="mt-4"
                        @current-change="changePage"
                />
        </div>
        <!--新增模态框-->
        <el-dialog v-model="dialogState" :title="dialogMode === 'add' ? '新增'  : '编辑'"
                   width="30%" :before-close="dialogCloseTip" >
                <el-form :inline="true" class="demo-form-inline" :model="getUserMsg" ref="userMsg">
                        <el-row>
                                <el-col :span="12">
                                        <el-form-item label="姓名" prop="name" :rules="nameCheck">
                                                <el-input v-model="getUserMsg.name" placeholder="请输入姓名" />
                                        </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                        <el-form-item label="年龄" prop="age" :rules="ageCheck">
                                                <el-input v-model.number="getUserMsg.age" placeholder="请输入年龄" />
                                        </el-form-item>
                                </el-col>
                        </el-row>
                        <el-row>
                                <el-col :span="12">
                                        <el-form-item label="性别" prop="sex" :rules="generalCheck">
                                                <el-select v-model="getUserMsg.sex" placeholder="请选择性别">
                                                        <el-option label="男" value="1"></el-option>
                                                        <el-option label="女" value="0"></el-option>
                                                </el-select>
                                        </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                        <el-form-item label="生日" prop="birth" :rules="generalCheck">
                                                <el-date-picker
                                                        v-model="getUserMsg.birth"
                                                        type="date"
                                                        placeholder="请选择日期"
                                                        style="width: 100%"
                                                />
                                        </el-form-item>
                                </el-col>
                        </el-row>
                        <el-row>
                                <el-col :span="12">
                                        <el-form-item label="地址" prop="address" :rules="generalCheck">
                                                <el-input v-model="getUserMsg.address" placeholder="请输入地址" />
                                        </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                        <el-form-item>
                                                <el-button @click="formInit">取消</el-button>
                                                <el-button type="primary" @click="onSubmit">提交</el-button>
                                        </el-form-item>
                                </el-col>
                        </el-row>
                </el-form>
        </el-dialog>
</template>

<script>
import {getCurrentInstance, onMounted, ref, reactive} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus"
import tableLabel from './module/tableLabel.js'
import pagingSettings from './module/pagingSettings.js'
import getUserMsg from './module/getUserMsg.js'
import dateFormat from './module/dateFormat.js'
import {generalCheck, nameCheck, ageCheck} from './module/fromItemCheck.js'

export default {
        name: "User",
        setup() {
                const { proxy } = getCurrentInstance();
                const userList = ref([]);
                const getUserData = async (pagingSettings) => {
                        let res = await proxy.$api.getUserData(pagingSettings);
                        //当前页数取自返回数据中的count
                        pagingSettings.total = res.count;
                        //常量获取数据组
                        userList.value = res.list.map((item) => {
                                item.sexLabel = item.sex === 1 ? '男' : '女'
                                return item
                        })
                }
                //页面切换
                const changePage = (page) => {
                        pagingSettings.page = page;
                        getUserData(pagingSettings);
                }
                //获取输入框中输入的值,用于双向绑定
                const searchData = reactive({
                        keyword: ''
                })
                //检索callback
                const onSearch = () => {
                        pagingSettings.name = searchData.keyword;
                        getUserData(pagingSettings)
                }
                //模态框的显示/隐藏状态
                const dialogState = ref(false);
                //关闭模态框
                const dialogCloseTip = (done) => {
                        ElMessageBox.confirm('确认关闭?')
                                .then(() => {
                                        done()
                                        formInit()
                                })
                                .catch(() => {
                                        // catch error
                                })
                }
                //提交callback
                const onSubmit = () => {
                        //使用validate方法校验
                        proxy.$refs.userMsg.validate( async (formData) => {
                                //如果formData接收到所有表单项数据则执行提交
                                if (formData){
                                        if (dialogMode.value === 'add') {
                                                //提交时处理日期
                                                getUserMsg.birth = dateFormat(getUserMsg.birth);
                                                let res = await proxy.$api.createUser(getUserMsg);
                                                //如果当前表单字段已提交
                                                if (res){
                                                        //重置表单
                                                        proxy.$refs.userMsg.resetFields();
                                                        //提交后关闭模态框
                                                        dialogState.value = false
                                                        //重新获取数据
                                                        await getUserData(pagingSettings)
                                                }
                                        }else {
                                                //性别处理
                                                getUserMsg.sex === '男' ? (getUserMsg.sex = 1) : (getUserMsg.sex = 0);
                                                //调用更新(编辑)接口
                                                let res = await proxy.$api.updateUser(getUserMsg);
                                                if (res){
                                                        //重置表单
                                                        proxy.$refs.userMsg.resetFields();
                                                        //提交后关闭模态框
                                                        dialogState.value = false
                                                        //重新获取数据
                                                        await getUserData(pagingSettings)
                                                }
                                        }
                                }else {
                                        ElMessage({
                                                showClose: true,
                                                message: '请检查是否填写完整!',
                                                type: 'error'
                                        })
                                }
                        })
                }
                //表单初始化
                const formInit = () => {
                        //重置表单
                        proxy.$refs.userMsg.resetFields();
                        //提交后关闭模态框
                        dialogState.value = false
                }
                //用于触发不同模态框
                const dialogMode = ref('add');
                //编辑callback
                const edit = (rowData) => {
                        //打开模态框
                        dialogState.value = true;
                        //更改值显示不同的模态框
                        dialogMode.value = 'edit';
                        //处理性别数据
                        rowData.sex === 1 ? rowData.sex = '男' : rowData.sex = '女'
                        /*由于vue异步更新DOM会有时间差,当关闭/取消模态框触发重置时DOM不会即刻重新加载
                        因此需要$nextTick()在页面上所有DOM加载完后执行浅拷贝*/
                        proxy.$nextTick(() => {
                                //利用浅拷贝将拿到的数据赋值到到getUserMsg
                                Object.assign(getUserMsg, rowData)
                        })
                }
                //触发添加模态框
                const add = () => {
                        //打开模态框
                        dialogState.value = true;
                        //更改值显示不同的模态框
                        dialogMode.value = 'add';
                }
                //单数据删除callback
                const onDelete = (rowData) => {
                        ElMessageBox.confirm('确认删除?')
                                .then(async () => {
                                        await proxy.$api.deleteUser({
                                                id: rowData.id
                                        })
                                        ElMessage({
                                                showClose: true,
                                                message: '删除成功!',
                                                type: 'success'
                                        })
                                        await getUserData(pagingSettings)
                                })
                                .catch(() => {
                                        // catch error
                                })
                }
                onMounted(() => {
                        getUserData(pagingSettings);
                })
                return {
                        userList, tableLabel, pagingSettings, changePage, searchData,
                        onSearch, dialogState, dialogCloseTip, getUserMsg, onSubmit,
                        generalCheck, nameCheck, ageCheck, formInit, edit, dialogMode,
                        add,onDelete
                }
        }
}
</script>

<style scoped>
.tableContainer{
        height: 73vh;
        @apply flex justify-center items-center flex-col;
}
.toolBar{
        @apply flex justify-between
}
</style>