<template>
        <div class="common-layout">
                <el-container>
                        <LeftMenu/>
                        <el-container class="rightSide">
                                <Header/>
<!--                                <MenuTag/>-->
                                <el-main>
                                        <router-view/>
                                </el-main>
                        </el-container>
                </el-container>
        </div>
</template>

<script>
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import LeftMenu from "../components/LeftMenu.vue";
import MenuTag from "../components/MenuTag.vue";

export default defineComponent({
        name: "mainView",
        components: {
                Header,
                LeftMenu,
                MenuTag
        }
})
</script>

<style scoped>
.common-layout,.el-container{
        @apply h-full;
}
.rightSide{
        @apply flex flex-col;
}
.el-main::-webkit-scrollbar{
        width: 6px;
}
.el-main::-webkit-scrollbar-thumb{
        background: #787878;
        border-radius: 6px;
}
.el-main::-webkit-scrollbar-thumb:active{
        background: #979797;
}
</style>