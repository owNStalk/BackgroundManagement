<template>
        <div class="tagContainer">
                <!--首页Tag-->
                <el-tag v-for="(tag,index) in tagGroup"
                        :key="tag.name"
                        :closable="tag.name !== 'home'"
                        :disable-transitions="false"
                        :effect="$route.name === tag.name ? 'dark' : 'light'"
                        @click="tagChange(tag)"
                        @close="removeTag(tag,index)"
                >{{ tag.label }}</el-tag>
        </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
        name: "MenuTag",
        setup() {
                const [ router, store, route ] = [ useRouter(), useStore(), useRoute() ];
                //接收到vuex配置文件中的标签组数据
                const tagGroup = store.state.tagGroup;
                //该方法用于标签控制组件切换
                const tagChange = (item) => {
                        //然后将接收到的路由对象推送到tagGroup
                        router.push({
                                name: item.name,
                        })
                }
                //触发该方法以关闭Tag
                const removeTag = (tag,index) => {
                        //由于首页Tag固定,因此仅移除后续生成的Tag.所以需要-1处理
                        let tagLength = tagGroup.length - 1;
                        //将参数传递给closeTag以进行关闭Tag
                        store.commit( 'closeTag', tag );
                        //如果当前显示的组件内容与所关闭的Tag不一致
                        if ( tag.name !== route.name ) {
                                //不做任何处理
                                return;
                        }
                        //如果打开的是最后一个Tag所对应的组件
                        if ( index === tagLength ){
                                //则跳转到前面一个Tag对应的组件
                                router.push({
                                        name: tagGroup[ index - 1 ].name,
                                })
                        } else {
                                //关闭的不是最后一个路由则跳转到后面Tag的组件
                                router.push({
                                        name: tagGroup[ index ].name,
                                })
                        }
                }
                return {
                        tagGroup,
                        tagChange,
                        removeTag
                }
        }
}
</script>

<style scoped>
.el-tag{
        @apply m-2 cursor-pointer;
}
</style>