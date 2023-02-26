<template>
    <div class="fullPage">
        <div class="show-card">
            <div class="head card">
                <div class="user-profile-head-info">
                    <div class="headImg-out">
                        <img class="headImg" src="/userHeader.png">
                    </div>
                    <div class="text-info">
                        <p class="userNickName">墨屿洺</p>
                        <ul class="userArtical-info">
                            <span class="separator">|</span>
                            <li class="artical-counter">作品数量：5</li>
                            <span class="separator">|</span>
                            <li class="artical-updateTime">最近更新时间：2022/10/30</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="sideBar card">
                <ul @click="changeContentPage">
                    <li name="UserArticalDisplay">文章</li>
                </ul>
            </div>
            <div class="right card">
                <div class="searchBox">
                    <img class="searchImg" src="../../assets/search.svg">
                    <input class="search-input" placeholder="搜Ta的内容" v-model="searchKeyWord" />
                    <button class="search-btn" @click="searchBtnClicked">搜索</button>
                </div>
                <div class="content">
                    <component :is="currentTab" v-if="contentShowState" :blogs="blogs"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.show-card {
    width: 1100px;
    height: 700px;

    position: fixed;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    margin: auto;

    display: grid;
    grid-template-columns: 20% 1fr;
    grid-template-rows: 20% 1fr;
}

.card {
    background-color: #F0F4F6;
    border-bottom: 2px #3D5A80 solid;
    border-right: 2px #3D5A80 solid;
    box-shadow: .1em .2em .1em rgba(61, 90, 128, 0.5);
}

.head {
    grid-column: 1/-1;
    grid-row: 1/2;
    border-radius: 10px;
    padding: 0 16px 0 16px;
}

.user-profile-head-info {
    height: 50%;
    width: 100%;
    position: relative;
    display: flex;
}

.headImg-out {
    width: 90px;
    height: 100%;
}

.headImg {
    border-radius: 50%;
    height: 90px;
    width: 90px;

    position: absolute;
    top: -15px;
}

.text-info {
    height: 100%;
    padding-left: 16px;
    display: flex;
    flex-direction: column;
}

.userNickName {
    margin: 0;
    margin-top: 10px;
    font-size: 22px;
    color: #222226;
    font-weight: 500;
}

.userArtical-info {
    margin: 0;
    padding: 0;

    margin-top: 10px;
    list-style: none;
    display: flex;
    align-items: center;

    color: #555666;
    font-size: 14px;
}

.separator {
    margin: 0 15px 0 15px;
    color: #afb1c0;
}

.sideBar {
    grid-column: 1/2;
    grid-row: 2/3;
    margin-top: 20px;
    border-radius: 10px;
    background-image: linear-gradient(240deg, #F0F4F6 70%, #E7B6C1 180%);
}

.right {
    grid-column: 2/3;
    grid-row: 2/3;
    margin: 20px 0 0 20px;
    border-radius: 10px;
    background-image: linear-gradient(160deg, #F0F4F6 60%, #E7B6C1 130%);
    overflow: hidden;

    display: flex;
    flex-direction: column;
}

.sideBar ul {
    margin: 0;
    padding: 0;
    list-style: none;
    padding: 8px 0 8px 0;
}

.sideBar ul li {
    display: block;
    text-align: center;
    height: 48px;
    line-height: 48px;

    color: black;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    border-radius: 5px;
}

.sideBar ul li:hover {
    background-color: rgba(101, 197, 214, 0.1);
}

.searchBox {
    padding: 16px;
    height: 64px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    border-bottom: 2px solid #E7B6C1;
    border-right: 2px solid #E7B6C1;
    box-shadow: .1em .2em .1em rgba(215, 170, 179, 0.5);
}

.searchImg {
    height: 16px;
    margin: 0 24px 0 16px;
}

.search-input {
    width: 600px;
    height: 32px;
    outline: none;
    border: 2px solid transparent;
    background-color: transparent;
    border-radius: 8px;
    padding-left: 10px;

    font-size: 14px;
}

.search-input:hover {
    border: 2px solid #E7B6C1;
}

.search-input:focus {
    border: 2px solid #E7B6C1;
}

.search-btn {
    margin-left: 30px;
    height: 32px;
    padding: 0 20px 0 20px;
    border-radius: 10px;
    border: 2px solid #EE6C4D;
    color: #EE6C4D;
    cursor: pointer;
    box-shadow: .1em .2em .1em rgba(92, 42, 29, 0.2);
    transition: background-color .3s, color .3s, box-shadow .1s, transform .1s;
}

.search-btn:hover {
    background-color: #EE6C4D;
    color: #fff;
}

.search-btn:active {
    box-shadow: 0 0 .1em rgba(92, 42, 29, 0.2);
    transform: translate(.1em, .2em);
}

.content {
    width: 100%;
    flex-grow: 1;
    margin-top: 10px;
    border-radius: 10px 0 10px 10px;
}
</style>

<script lang="ts" setup>
import { markRaw, onMounted, ref, watch } from 'vue';
import UserArticalDisplay from '../UserInfoCenter_content/UserArticalDisplay.vue'

let Tabs = [markRaw(UserArticalDisplay)];
let currentTab = ref(Tabs[0]);
let currentTabIndex = 0; //记录现在显示的内容

//切换内容页面
function changeContentPage(event: Event) {
    const el: any = event.target;
    let name = el.getAttribute('name');
    switch (name) {
        case 'UserArticalDisplay':
            currentTab.value = Tabs[0];
            currentTabIndex = 0;
            break;
    }
}
watch(currentTab, () => { //如果这个改变表示切换了页面，我们需要对其进行数据的自动加载
    getUserContent(searchKeyWord.value);
})

type BlogsResponseData = {
    code: Number;
    blogs: any[];
    msg: string;
}

let contentShowState = ref(false);
let blogs = ref();

let searchKeyWord = ref('');

onMounted(() => { //进入页面默认显示用户所有作品
    getUserContent('');
});

function getUserContent(searchKeyWord: string) {
    switch (currentTabIndex) {
        case 0: //显示用户的博客列表
            getUserBlogs(searchKeyWord);
            break;
    }
}

async function getUserBlogs(searchKeyWord: string) {
    //暂时不清楚搜索方式，后面再写
    //keyWord为空时显示所有相关内容
    let data: BlogsResponseData = {
        code: 200,
        blogs: [{
            blogID: 'Git 版本控制的使用.md',
            blogTitle: 'Git 版本控制的使用',
            blogBrief: '详细简述git相关操作，以及工作中可能需要处理的分支问题',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Vue.js.md',
            blogTitle: 'Vue.js',
            blogBrief: 'Vue3的使用',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: '算法.md',
            blogTitle: '算法',
            blogBrief: '一些基础算法',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Typora-PicGo-GitHub实现图片自动上传的方法.md',
            blogTitle: 'Typora-PicGo-GitHub实现图片自动上传的方法',
            blogBrief: '利用github搭建图床，picgo脚本上传',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Node.js —— 用Js来搭建后端.md',
            blogTitle: 'Node.js —— 用Js来搭建后端',
            blogBrief: 'nodejs的基础使用',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: '屿家笔记库—SQL语法.md',
            blogTitle: '屿家笔记库—SQL语法',
            blogBrief: '基础数据库操作语法',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        ], //测试数据
        msg:''
    }
    checkBlogsResponseData(data);
}

function checkBlogsResponseData(data: BlogsResponseData) {
    contentShowState.value = false;//让其在获取到内容时能够刷新
    if (data.code === 200) {
        blogs.value = data.blogs;
        contentShowState.value = true;
    } else {
        contentShowState.value = false;
        console.error(data.msg);
    }
}

//搜索
function searchBtnClicked() {
    getUserContent(searchKeyWord.value);
    console.log('后端搜索功能尚未实现');
}
</script>