<template>
<div class="body">
        <div class="contentBox">
                <div class="left">
                        <div class="textContent">
                                <p class="topText">Welcome to ——</p>
                                <p class="bottomText">通用后台管理系统</p>
                        </div>
                </div>
                <div class="right">
                        <div class="slot">
                                <input type="text" id="username" placeholder=" " v-model="getLoginData.username">
                                <label for="username">用户名</label>
                        </div>
                        <div class="slot">
                                <input :type="stateGroup.type" id="password" placeholder=" " v-model="getLoginData.password">
                                <label for="password">密码</label>
                                <el-icon class="eyeIcon">
                                        <component :is="stateGroup.icon" @click="changeState"></component>
                                </el-icon>
                        </div>
                        <div class="slot">
                                <button class="loginButton" @click="onLogin">Login!</button>
                        </div>
                </div>
        </div>
</div>
</template>

<script>
import {stateGroup,changeState} from './module/controlView.js';
import {getCurrentInstance, reactive} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
        name: "Login",
        setup() {
                //拿到当前实例
                const { proxy } = getCurrentInstance();
                //获取登录数据
                const getLoginData = reactive({
                        username: '',
                        password: ''
                })
                //整合常量接收方法
                const [store,router] = [useStore(),useRouter()];
                //登录callback
                const onLogin = async () => {
                        //将获取到的登录数据提交到getMenu拿到返回的菜单数据
                        const res = await proxy.$api.getMenu(getLoginData);
                        //将数据中的菜单项数据提交到menuGeneration
                        store.commit('getMenuItem',res.menuItem);
                        //将路由传递到keepMenuLife,使获取到的数据生成的菜单项都能够进行路由操作
                        store.commit('liveMenu',router);
                        //将token传递到setToken
                        store.commit('setToken',res.token);
                        //登录成功后进行路由跳转
                        await router.push({
                                name: 'home'
                        })
                }
                return {
                        changeState,
                        stateGroup,
                        getLoginData,
                        onLogin
                }
        }
}
</script>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Pacifico);

@font-face {
        font-family: '猫啃网糖圆体';
        src: url('../public/猫啃网糖圆体(测试版)0.12.ttf');
}
/*主体*/
.body{
        @apply flex h-screen justify-center items-center bg-gray-100;
}
/*内容容器*/
.contentBox{
        @apply w-3/4 h-3/4 rounded-2xl shadow-2xl flex overflow-hidden
        bg-gray-50;
}
/*左侧容器*/
.left{
        @apply h-full w-3/5 flex justify-center items-center;
}
/*左侧上方文本*/
.topText{
        font-family: 'Pacifico',serif;
        @apply text-gray-900 text-6xl my-3;
}
/*左侧下方文本*/
.bottomText{
        font-family: "猫啃网糖圆体",serif;
        @apply text-gray-900 text-right text-3xl my-3 font-bold;
}
/*右侧容器*/
.right{
        @apply h-full w-2/5 flex justify-center items-center flex-col;
}
/*输入框容器*/
.slot{
        @apply relative;
}
/*输入框*/
input{
        font-family: "猫啃网糖圆体",serif;
        @apply w-72 h-11 my-3 rounded-xl px-3 bg-blue-50
        focus:outline-none focus:ring focus:border-blue-300;
}
/*标签*/
label{
        font-family: "猫啃网糖圆体",serif;
        @apply absolute left-3 bottom-5 text-gray-400;
}
/*输入框聚焦&标签联动*/
input:focus + label{
        transform: translateX(calc(-100% - 1.5rem));
        color: #0f0f1f;
}
input:not(:focus):not(:placeholder-shown)+label{
        color: transparent;
}
/*按钮*/
button{
        font-family: 'Pacifico',serif;
        @apply w-72 h-11 my-3 rounded-xl px-3 bg-blue-500
        p-0 outline-none text-gray-50;
}
/*输入框&标签&按钮过渡&字体大小*/
input,label,button{
        @apply transition duration-300 text-xl;
}
button:active{
        transform: scale(.8);
}
/*眼睛图标样式*/
.eyeIcon{
        @apply absolute right-3 text-xl bottom-6 text-gray-400;
}
</style>