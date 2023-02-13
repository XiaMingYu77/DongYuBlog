<template>
    <div class="ownerSide-page">
        <div class="author-showPlace" @click.stop="ButtonShake(toUserInfoCenter)">
            <img class="authorHeadImg" src="../../assets/headBeforeSet.svg">
            <div class="author-name">作者：屿洺</div>
        </div>
        <div class="author-blogs blogs-show">
            <h2 class="title">作者博客推荐</h2>
            <div class="blogs-list" @click.stop>
                <BlogsNavigation_show :blogs="authorBlogs" v-if="hasAuthorBlogs"></BlogsNavigation_show>
            </div>
        </div>
        <div class="history-blogs blogs-show">
            <h2 class="title">历史记录</h2>
            <div class="blogs-list" @click.stop>
                <BlogsNavigation_show :blogs="historyBlogs" v-if="hasHistoryBlogs"></BlogsNavigation_show>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ownerSide-page {
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    height: auto;
    z-index: 10;
    padding: 16px;

    display: flex;
    flex-direction: column;
}

.author-showPlace {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: .2em .1em .1em rgba(214, 184, 190, 0.8);
    transition: box-shadow .1s ease-out, transform .1s ease-out;
}
.author-showPlace:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
.author-showPlace:active {
    box-shadow: 0 0 .1em rgba(214, 184, 190, 0.8);
    transform: translate(.2em, .1em);
}

.authorHeadImg {
    object-fit: cover;
    object-position: 50% 50%;
    height: 60px;
    width: 60px;
}

.author-name {
    margin-left: 16px;
    font-size: 20px;
    color: #fff;
    font-weight: 700;
}

.blogs-show{
    margin-top: 16px;
    flex-grow: 1;
    border-radius: 10px;
    box-shadow: .2em .1em .1em rgba(214, 184, 190, 0.8);
    overflow: hidden;
    background-color: rgba(214, 184, 190, 0.15);

    display: flex;
    flex-direction: column;
}

.title{
    margin: 0;
    margin-right: 2px;
    border-radius: 10px;
    padding: 16px;
    color: #fff;
    font-size: 20px;
    box-shadow: .2em .1em .1em rgba(214, 184, 190, 0.8);
}

.blogs-list{
    flex-grow: 1;
    overflow-y: scroll;
}
.blogs-list::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

.blogs-list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 .5px rgba(0, 0, 0, 0.2);
    background: rgb(238, 108, 77);
}

.blogs-list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}

.history-blogs{
    margin-top: 50px;
}

:deep(.ownerSide-page .blogs-show .blogs-list .blog-skipBar){
    border-bottom: 3px solid rgba(105, 122, 161, 0.7);
}
:deep(.ownerSide-page .blogs-show .blogs-list .blog-skipBar:hover){
    background-color: rgba(255, 255, 255, 0.2);
}

</style>

<script lang="ts" setup>
import router from '@/router/router';
import { onMounted, ref } from 'vue';
import BlogsNavigation_show from './BlogsNavigation_show.vue';
import ButtonShake from '../Tools/ButtonShake';

let autorHeadImgSrc = ref('../../assets/headBeforeSer.svg');
let authorBlogs = ref();
let historyBlogs = ref();

let hasAuthorBlogs = ref(false);  //当获取到资源后将其设置为true渲染列表
let hasHistoryBlogs = ref(false);

onMounted(() => {
    getAutorData();
    getAuthorBlogs();
    getHistoryBlogs();
});
//获取作者头像和作者昵称
//这个页面的内容获取方式暂时不知，等待api完善
async function getAutorData() {

}
async function getAuthorBlogs(){

}
async function getHistoryBlogs(){

}
 
function toUserInfoCenter(){
    router.push('/Home/UserInfoCenter')
}
</script>