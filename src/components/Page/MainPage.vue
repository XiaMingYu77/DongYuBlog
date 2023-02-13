<template>
    <div class="area">
        <div class="users">
            <UsersSideBar></UsersSideBar>
        </div>
        <!-- 这里的内容：主页（包括浏览其他人的博客）、博客显示页面、用户详情页 -->
        <div class="content">
            <RouterView :style="PageGraduallyStyle"></RouterView>
        </div>
    </div>
</template>
  
  
<script setup lang="ts">
import router from "@/router/router";
import { reactive } from "vue";
import UsersSideBar from "../SideBar/UsersSideBar.vue";

let PageGraduallyStyle = reactive({
    animation: "",
    opacity: '1'
});
router.afterEach((to, from) => {
    const name_to = to.name, name_from = from.name
    if (!(to.name === 'LogInPage' || to.name === 'PersonalCenter' ||
        (to.name === 'BlogsCenter' && from.name !== 'BlogPage' && from.name !== 'UserInfoCenter') ||
        (to.name === 'BlogPage' && from.name !== 'BlogsCenter' && from.name !== 'UserInfoCenter') ||
        (to.name === 'UserInfoCenter' && from.name !== 'BlogsCenter' && from.name !== 'BlogPage'))
    ) {
        PageGraduallyStyle.animation = 'PageGraduallyShow 1s ease';
        PageGraduallyStyle.opacity = '1'
    }
})

router.beforeEach(async (to, from) => {
    //在BlogPage和BlogsCenter相互切换时只需要
    const name_to = to.name, name_from = from.name
    if (!(from.name === 'LogInPage' || from.name === 'PersonalCenter' ||
        (from.name === 'BlogPage' && to.name !== 'BlogsCenter' && to.name !== 'UserInfoCenter') ||
        (from.name === 'BlogsCenter' && to.name !== 'BlogPage' && to.name !== 'UserInfoCenter') ||
        (from.name === 'UserInfoCenter' && to.name !== 'BlogPage' && to.name !== 'BlogsCenter'))
    ) {
        PageGraduallyStyle.animation = 'PageGraduallyClose 0.3s ease';
        PageGraduallyStyle.opacity = '0';
        let p = new Promise((resolve) => { setTimeout(resolve, 300) });
        await p;
    }
})
</script>
<style>
.navigation {
    grid-row: 1/2;
    grid-column: 1/-1;
    width: 100%;
    text-align: center;
}

.navigation RouterLink {
    display: inline-block;
    margin: 10em;
}

.navigation button {
    width: 50%;
}

.area {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 15% 1fr;
    max-height: 100vh;
}

.content {
    grid-row: 1/-1;
    grid-column: 2/-1;
    overflow: hidden;
}

.users {
    height: 100vh;
    grid-column: 1/2;
    grid-row: 1/-1;
    overflow: hidden;
}

</style>
  