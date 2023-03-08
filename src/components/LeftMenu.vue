<template>
        <el-aside :width="$store.state.collapseState ? '200px' : '64px'">
                <el-menu class="el-menu-vertical-demo menuBody"
                         background-color="orange"
                         active-text-color="#fff"
                         text-color="#4B5563"
                         :collapse="!$store.state.collapseState"
                         :collapse-transition="false"
                >
                        <h3 v-show="$store.state.collapseState">后台管理</h3>
                        <h3 v-show="!$store.state.collapseState">后台</h3>
                        <!--非下拉部分-->
                        <!--数据遍历生成-->
                        <el-menu-item
                                :index="item.path"
                                v-for="item in noDropDown()"
                                :key="item.path"
                                class="menuText"
                                @click="clickMenu(item)"
                        >
                                <!--将之前图标使用部分替换掉,使用组件标签动态显示-->
                                <el-icon>
                                        <component class="icon" :is="item.icon"/>
                                </el-icon>
                                <span>{{ item.label }}</span>
                        </el-menu-item>
                        <!--下拉部分-->
                        <el-sub-menu :index="item.path" v-for="item in dropDown()" :key="item.path">
                                <template #title>
                                        <el-icon>
                                                <component class="icon" :is="item.icon"/>
                                        </el-icon>
                                        <span class="menuText">{{ item.label }}</span>
                                </template>
                                <el-menu-item-group>
                                        <el-menu-item
                                                :index="childItem.path"
                                                v-for="( childItem, childIndex ) in item.children"
                                                :key="childIndex"
                                                class="menuText"
                                                @click="clickMenu(childItem)"
                                        >
                                                {{childItem.label}}
                                        </el-menu-item>
                                </el-menu-item-group>
                        </el-sub-menu>
                </el-menu>
</el-aside>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from "vuex";

export default {
        name: "LeftMenu",
        setup() {
                //创建常量接收方法
                const [router,store]=[useRouter(),useStore()];
                //菜单数据
                const dataList = [
                        {
                                path: '/home',
                                name: 'home',
                                label: '首页',
                                icon: 'HomeFilled',
                                url: 'Home/Home'
                        },
                        {
                                path: '/user',
                                name: 'user',
                                label: '用户管理',
                                icon: 'UserFilled',
                                url: 'UserManagement/UserManagement'
                        },
                        {
                                path: '/item',
                                name: 'item',
                                label: '物品管理',
                                icon: 'shop',
                                url: 'Item/Item'
                        },
                        {
                                path: '/other',
                                label: '其他',
                                icon: 'LocationFilled',
                                children: [
                                        {
                                                path: '/page1',
                                                name: 'page1',
                                                label: '页面1',
                                                icon: 'setting',
                                                url: 'other/pageOne.vue'
                                        },
                                        {
                                                path: '/page2',
                                                name: 'page2',
                                                label: '页面2',
                                                icon: 'setting',
                                                url: 'other/pageTwo.vue'
                                        }
                                ],
                        },
                ];
                //使用常量接收登录后返回的菜单项
                const getMenuItem = store.state.menuItem;
                //判断菜单项是否不能下拉
                const noDropDown = ()=>{
                        // return dataList.filter((item)=> !item.children)
                        return getMenuItem.filter((item)=> !item.children)
                }
                //判断菜单项是否能下拉
                const dropDown = ()=>{
                        // return dataList.filter((item)=> item.children)
                        return getMenuItem.filter((item)=> item.children)
                }
                //该方法触发时会根据传入的值切换到对应的组件
                const clickMenu=(item)=>{
                        router.push({
                                name: item.name,
                        });
                        //当点击菜单上任意项时将接收到的item传递到menuSelect
                        store.commit('menuSelect',item);
                }
                return {
                        noDropDown,
                        dropDown,
                        clickMenu
                }
        }
}
</script>

<style scoped>
.icon{
        @apply text-lg;
}
.menuText{
        @apply text-lg font-medium;
}
.menuBody{
        @apply border-none h-full;
}
h3{
        @apply py-4 text-center text-xl font-bold text-gray-600;
}
</style>