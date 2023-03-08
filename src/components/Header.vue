<template>
        <el-header class="headerBody">
                <div class="leftContent">
                        <el-button size="default" class="buttonStyle" @click="changeCollapse">
                                <el-icon size="medium">
                                        <Menu />
                                </el-icon>
                        </el-button>
                        <el-breadcrumb separator="/">
                                <!--Home为首页直接固定-->
<!--                                <el-breadcrumb-item :to="{ path: '/' }">
                                        <el-icon class="navIcon">
                                                <HomeFilled />
                                        </el-icon>
                                </el-breadcrumb-item>-->
                                <MenuTag/>
                                <!--根据左侧当前使用的选项进行显示-->
<!--                                <el-breadcrumb-item :to="currentNavOption.path" v-if="currentNavOption">
                                        <div class="navBlock">{{ currentNavOption.label }}</div>
                                </el-breadcrumb-item>-->
                        </el-breadcrumb>
                </div>
                <div class="rightContent">
                        <el-dropdown>
                                <span class="el-dropdown-link">
                                        <img :src="getImageSrc('avatar')" class="avatar"/>
                                </span>
                                <template #dropdown>
                                        <el-dropdown-menu>
                                                <el-dropdown-item>个人中心</el-dropdown-item>
                                                <el-dropdown-item @click="logout">退出</el-dropdown-item>
                                        </el-dropdown-menu>
                                </template>
                        </el-dropdown>
                </div>
        </el-header>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from "vue";
import {useRouter} from "vue-router";
import MenuTag from "./MenuTag.vue";

export default {
        name: "Header",
        components: {
                MenuTag
        },
        setup() {
                //改为常量解构接收方法
                const [store,router] = [useStore(),useRouter()]
                //切换状态
                let changeCollapse=()=>{
                        //调用vuex中的mutations(状态控制项),使用commit()调用目标方法
                        store.commit('changeCollapseState','abc')
                }
                //获取图片
                const getImageSrc=(name)=>{
                        /*new URL()所需两个参数
                        第一个为目标文件的相对路径
                        第二个为import.meta.url,该参数可暴露当前模块的URL
                        在js模块当中可通过相对路径得到一个被完整解析的静态资源URL*/
                        return new URL( `../assets/${name}.jpg`, import.meta.url ).href
                }
                //使用计算属性获取currentOptions的值用作显示
                const currentNavOption = computed(() => {
                        return store.state.currentOptions;
                })
                //登出callback
                const logout = () => {
                        //触发clearMenuItem
                        store.commit('clearMenuItem')
                        //路由跳转
                        router.push({
                                name: 'login'
                        })
                }
                return {
                        changeCollapse,
                        getImageSrc,
                        currentNavOption,
                        logout
                }
        }
}
</script>

<style scoped>
.leftContent{
        @apply flex items-center h-full;
}
.headerBody{
        @apply bg-yellow-300 flex justify-between items-center p-2;
}
.buttonStyle{
        @apply mx-2;
}
.avatar{
        @apply h-12 rounded-full;
}
.navIcon{
        @apply text-lg cursor-pointer;
}
.navBlock{
        @apply text-lg font-bold cursor-pointer;
}
.el-breadcrumb{
        @apply flex;
}
</style>