<template>
    <div>
        <div class="BrowsingHistory-head">历史记录</div>
        <div class="BrowsingHistory-content">
            <div class="blogs">
                <div class="time-line"></div>
                <BlogsNavigation class="blogs-show" v-if="blank_blogShow" :blogs="blogsData"></BlogsNavigation>
            </div>
        </div>
    </div>
</template>

<style scoped>
.BrowsingHistory-head {
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    font-weight: 600;
    color: #2e2e2e;
    padding-left: 16px;
    border-bottom: 1px solid #3D5A80;
}

.BrowsingHistory-content {
    padding: 16px;
    height: 55vh;
    /* display: flex; */
    overflow-y: auto;
}

.BrowsingHistory-content::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

.BrowsingHistory-content::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(238, 108, 77, 0.5);
}

.BrowsingHistory-content::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}

.blogs {
    position: relative;
    width: 100%;
}

.time-line {
    position: absolute;
    left: 0;
    top: 30px;
    bottom: 50px;
    width: 3px;
    border-radius: 6px;
    background: #b7b7ba;
    margin-right: 10px;
    margin-right: 10px;
}

.blogs-show{
    margin-left: 20px;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
import BlogsNavigation from '../SideBar/BlogsNavigation_show.vue';

let blank_noBlogShow = ref(false);
let blank_blogShow = ref(true);
let blogsData = ref();//用来给博客表传递props
</script>