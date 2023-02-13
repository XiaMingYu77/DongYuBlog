<template>
    <div class="blogsCenter-page">
        <div class="showCard">
            <div class="head">
                <h2 class="title">DongYuBlog</h2>
                <div class="search-box">
                    <input class="search-input" autocomplete="none" placeholder="请输入关键词" v-model="searchKeyWorld" />
                    <button class="search-btn" @click="getBlogs">搜索</button>
                </div>
            </div>
            <div class="left">
                <div class="blogs-show" v-if="blogsReady">
                    <BlogsNavigation_show :blogs="blogs"></BlogsNavigation_show>
                </div>
                <div class="noBlog-show" v-if="!blogsReady">555没有符合条件的博客</div>
            </div>
            <div class="sideBar">
                <h3 class="title-authors">推荐作者</h3>
                <div class="authors-show">
                    <AuthorsNavigation_show :authors="authors" v-if="authorReady"></AuthorsNavigation_show>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.blogsCenter-page {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 17.5%;
}

.showCard {
    grid-column: 1/2;
    grid-row: 1/-1;
    display: grid;
    grid-template-columns: 1fr 25%;
    grid-template-rows: 80px 1fr;
    background-color: rgba(240, 244, 246, 0.95);
    overflow: auto
}

.head {
    grid-row: 1/2;
    grid-column: 1/-1;
    border-radius: 10px;
    border-bottom: 2px solid #3D5A80;
    border-right: 2px solid #3D5A80;
    box-shadow: .1em .2em .15em rgba(0, 0, 0, 0.3);
    background-image: linear-gradient(to bottom right, rgba(105, 122, 161, 0.8) 40%, rgba(231, 182, 193, 0.8) 100%);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    margin-right: 3px;
}

.head .title {
    padding-left: 16px;
    height: 100%;
    margin: 0;
    vertical-align: middle;
    display: flex;
    align-items: center;
}

.search-box {
    margin: auto 16px auto auto;
}

.search-btn {
    margin-left: 40px;
    border: 1px solid #fc5531;
    background-color: #fc5531;
    color: #fff;
    font-weight: 500;
    font-size: 20px;
    height: 32px;
    width: 100px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: .1em .2em .15em rgba(0, 0, 0, 0.3);

    transition: background-color .3s, color .3s, box-shadow ease-out .1s, transform ease-out .1s;
}

.search-btn:hover {
    color: #fc5531;
    background-color: #fff;
}

.search-btn:active {
    box-shadow: 0 0 .15px rgba(0, 0, 0, 0.3);
    transform: translate(.1em, .2em);
}

.search-input {
    padding-left: 10px;
    width: 250px;
    height: 32px;
    background-color: #fff;
    border-radius: 4px;
    outline: 1px solid #dcdfe6;
    border: 0;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
}
.search-input:focus {
    outline: 2px solid #3D5A80;
}

.left {
    grid-column: 1/2;
    grid-row: 2/-1;
    border-top: 2px solid #3D5A80;
    border-right: 2px solid #3D5A80;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    box-shadow: .1em -.1em .15em rgba(0, 0, 0, 0.3);
}
.noBlog-show{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    padding: 20px 30px;
    border-radius: 10px;
    background-color: rgba(252, 85, 49, 0.3);

    color: #555666;
    font-size: 25px;
    font-weight: 600;
}
.blogs-show::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

.blogs-show::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 .5px rgba(0, 0, 0, 0.2);
    background: rgb(238, 108, 77);
}

.blogs-show::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}

.blogs-show {
    overflow: auto;
    height: 100%;
}

.sideBar {
    grid-row: 2/-1;
    grid-column: 2/3;
    margin-left: 16px;
    margin-right: 3px;

    height: 80vh;
    border-radius: 10px;
    overflow: hidden;
    background-image: linear-gradient(to bottom right, rgba(105, 122, 161, 0.1) 40%, rgba(231, 182, 193, 0.4) 100%);
    border-top: 2px solid #3D5A80;
    border-right: 2px solid #3D5A80;
    border-bottom: 2px solid #3D5A80;
    box-shadow: .1em -.1em .15em rgba(0, 0, 0, 0.3), 0 .1em .15em rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
}

.title-authors {
    color: #606266;
    margin: 0;
    height: 80px;
    padding-left: 16px;
    border-radius: 10px;
    margin-bottom: 5px;
    border-bottom: 2px solid #3D5A80;

    display: flex;
    align-items: center;

}

.authors-show {
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    flex-grow: 1;
}
</style>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import AuthorsNavigation_show from '../SideBar/AuthorsNavigation_show.vue';
import BlogsNavigation_show from '../SideBar/BlogsNavigation_show.vue';
import ButtonShake from '../Tools/ButtonShake';

const cns: any = getCurrentInstance();
const global = cns.appContext.config.globalProperties.$global;

type AuthorsResponseData = {
    code:Number;
    authors:[];
};
type BlogsResponseData = {
    code:Number;
    blogs:[];
}
let searchKeyWorld = ref();
let authors = ref();
let blogs = ref();

let authorReady = ref(true); //要等从服务器获取到资源之后再显示该内容
let blogsReady = ref(true);  //要等从服务器获取到资源之后再显示该内容

onMounted(()=>{
    // getRecommendedAuthors();
})
//获取推荐作者
async function getRecommendedAuthors() {
    let obj = {
        userID: global.userID
    }
    let jsonData = JSON.stringify(obj);
    let jsonHeaders = new Headers({
        'Content-Type': 'application/json'
    });
    let data = await fetch('', {       //路径尚未知道
        method: 'POST',
        body: jsonData,
        headers: jsonHeaders
    }).then((response: Response) => response.json());
    checkAuthors(data);
}
function checkAuthors(data:AuthorsResponseData) {
    if(data.code == 200) {
        authors.value = data.authors;
        authorReady.value = true;
    }
    else console.error('RecommendedAuthors Log Error');
}
//获取推荐博客
async function getRecommendedBlogs (){
    let obj = {
        userID: global.userID
    }
    let jsonData = JSON.stringify(obj);
    let jsonHeaders = new Headers({
        'Content-Type': 'application/json'
    });
    let data = await fetch('', {     //路径尚未知道
        method: 'POST',
        body: jsonData,
        headers: jsonHeaders
    }).then((response: Response) => response.json());
    checkBlogs(data);
}
function checkBlogs(data:BlogsResponseData){
    if(data.code == 200){
        blogs.value = data.blogs;
        blogsReady.value = true;
    }else{
        console.error('Blogs Log Error');
    }
}

//搜索时获取博客信息并显示
async function getBlogs(){
    let obj = {
        searchKeyWorld: searchKeyWorld.value
    }
    let jsonData = JSON.stringify(obj);
    let jsonHeaders = new Headers({
        'Content-Type': 'application/json'
    });
    let data = await fetch('', {       //路径尚未知道
        method: 'POST',
        body: jsonData,
        headers: jsonHeaders
    }).then((response: Response) => response.json());

    blogsReady.value = false //卸载掉相关页面使其刷新
    checkBlogs(data);
}
</script>