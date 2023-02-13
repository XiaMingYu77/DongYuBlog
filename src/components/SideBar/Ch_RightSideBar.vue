<template>
    <div @click="ButtonShake(clicked)" class="right-side-bar" :style="sideBarStyle" @transitionend.self="showContent">
        <!-- <component :is="currentPage" class="sidePageContent" :style="contentStyle" @saveBlogEdit="saveBlogEdit">
        </component> -->
        <div class="sidePageContent" :style="contentStyle">
            <BlogEditor @saveBlogEdit="saveBlogEdit" v-if="isMyBlog.bol"></BlogEditor>
            <OwnerSidePage v-if="!isMyBlog.bol"></OwnerSidePage>
        </div>
    </div>
</template>

<style scoped>
.right-side-bar:before {
    box-sizing: border-box;
    position: absolute;
    content: " ";
    display: block;
    width: 1.7em;
    height: 7em;
    background-color: #697AA1;
    border: .5em solid #9B91AD;
    border-right-color: transparent;
    left: -1.7em;
    top: 3vh;
    border-radius: 0.5em 0 0 0.5em;
}

.right-side-bar {
    position: fixed;
    height: auto;
    bottom: 0;
    top: 0;
    /* background-color: #3D5A80; */
    background-image: linear-gradient(150deg, #697AA1 20%, #E7B6C1 100%);
    z-index: 10;
    border-radius: 0.75em 0 0 0.75em;
    transition: all ease-in-out;
}

.sidePageContent {
    transition: all 0.5s ease-in-out;
}
</style>

<script setup lang="ts">
import { defineAsyncComponent, markRaw, onMounted, onUpdated, reactive, ref } from 'vue';
import NullPage from '../Background/NullPage.vue';
import BlogEditor from './BlogEditor.vue'
import OwnerSidePage from './OwnerSidePage.vue';
import ButtonShake from '../Tools/ButtonShake';

let props = defineProps(['outStyle', 'isMyBlog']);
const emit = defineEmits(['saveBlogEdit'])

let sideBarStyle = props.outStyle;
let isMyBlog = props.isMyBlog;

let contentStyle = ref('opacity: 0')

let falg_out = false; //拉出为ture

// let BlogEditor = defineAsyncComponent(() => {
//     return import('./BlogEditor.vue')
// })
// let OwnerPage = defineAsyncComponent(() => {
//     return import('./OwnerSidePage.vue')
// })
// let Pages = [markRaw(NullPage), markRaw(BlogEditor), markRaw(OwnerPage)];
// let currentPage = ref(Pages[0]);

function clicked() {
    let rightText_in = '';
    if (isMyBlog.bol) {
        rightText_in = "-148vh";
        sideBarStyle['transition-duration'] = "2s";
    }
    else {
        rightText_in = "-68vh";
        sideBarStyle['transition-duration'] = "1.3s";
    }

    if (falg_out) {  //收起来
        hideContent();
        setTimeout(() => {
            sideBarStyle.right = rightText_in;
            falg_out = false;
            // currentPage.value = Pages[0];
        }, 600);
    } else {  //拉出来
        sideBarStyle.right = '0';
        falg_out = true;
    }
}

function showContent() {
    if (falg_out) { //只有打开状态需要加载内容
        setTimeout(() => {
            // console.log('hhh');
            contentStyle.value = 'opacity:1'; //逐渐显示内容
        }, 150)
    }
}
function hideContent() {
    contentStyle.value = 'opacity:0';
}

function saveBlogEdit(text: string) {
    emit('saveBlogEdit', text);
}
</script>