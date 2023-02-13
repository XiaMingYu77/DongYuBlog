<template>
  <div class="blog-page">
    <div class="blog-show">
      <md-editor v-model="state.text" :code-theme="state.theme" :preview-only="state.previewOnly"
        :pageFullScreen="state.pageFullScreen" :style="BlogShowBarStyle" @animationend="wordAnimationEnd" />
    </div>
    <div class="blog-sideBar">
      <!-- 如果是本人的就显示编辑区，如果是别人的就显示别人的相关信息 -->
      <ch_-right-side-bar :outStyle="rightBarStyle" :isMyBlog="isMyBlog" @saveBlogEdit="saveBlogEdit">
      </ch_-right-side-bar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, provide, watch, getCurrentInstance } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import Ch_RightSideBar from '../SideBar/Ch_RightSideBar.vue';
import { useRoute } from 'vue-router';

const cns: any = getCurrentInstance();
const global = cns.appContext.config.globalProperties.$global;

let state = reactive({
  text: '',
  theme: 'dark',
  language: 'my-lang',
  previewOnly: false,
  pageFullScreen: true
});


let route = useRoute();
let blogID = ref(route.params.blogID);
let gettedText = ref(false);
let isMyBlog = reactive({
  bol: false,
});

//通过路由传入的blogID来获取博客资源
type BlogResponseData = {
  code: Number;
  isMyBlog: boolean;
  text: string;
  msg: string;
}
async function getText() {
  let text = '';
  await fetch("/Git 版本控制的使用.md")
    .then((response) => response.text())
    .then((data) => text = data);
  let obj = {
    userID: global.userID,
    blogID: blogID.value,
  }
  let jsonData = JSON.stringify(obj);
  let jsonHeaders = new Headers({
    'Content-Type': 'application/json'
  });

  //测试阶段，只要是登陆状态就是自己的博客
  let data: BlogResponseData = {
    code: 200,
    isMyBlog: global.logState.value,
    text: text,
    msg: '',
  }
  // let data = await fetch('', {       //路径尚未知道
  //   method: 'POST',
  //   body: jsonData,
  //   headers: jsonHeaders
  // }).then((response: Response) => response.json());

  checkBlogData(data);
  gettedText.value = true;
}

function checkBlogData(data: BlogResponseData) {
  if (data.code === 200) {
    state.text = data.text;
    gettedText.value = true;
    isMyBlog.bol = data.isMyBlog;
    blogGraduallyShow();
  } else {
    console.error(data.msg);
  }
}

onMounted(async () => {
  await getText();  //在这个里面对博客所有进行了检测
  if (isMyBlog.bol) {
    rightBarStyle.width = '150vh';
    rightBarStyle.right = '-148vh';
  } else {
    rightBarStyle.width = '70vh';
    rightBarStyle.right = '-68vh';
  }
})


// 让加载好的文字缓慢出现
const BlogShowBarStyle = reactive({
  opacity: '0',
  animation: ''
})
function blogGraduallyShow() {
  BlogShowBarStyle.animation = 'showWords 1.5s ease-in-out';
}
//动画结束后要进一步设置
function wordAnimationEnd() {
  BlogShowBarStyle.opacity = '1';
  BlogShowBarStyle.animation = '';
}

let rightBarStyle = reactive({
  width: '',
  right: ''
})

function saveBlogEdit(text: string) { //当编辑页进行保存时的附属操作
  state.text = text;
}

//将相关内容传递到子组件中
provide('markDownState', ()=>state);
</script>

<style>
.blog-show .md-input-wrapper {
  display: none;
}

.blog-show .md-toolbar-wrapper {
  display: none;
}

.blog-show .md-footer {
  display: none;
}

.blog-show {
  opacity: 0.95;
  background-color: #F0F4F6;
}

.blog-page {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 17.5%;
}

.blog-show .md-fullscreen {
  position: static;
  border: 0;
  grid-column: 1/2;
  grid-row: 1/-1;

  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 20%;
}

.blog-show .md-catalog-editor {
  box-sizing: border-box;
  display: block !important;
  grid-row: 1/-1;
  grid-column: 2/3;
  position: static;
  height: 100vh;
  width: auto;
  z-index: 4;
  background-color: #dfe3e6;
}

.blog-show .md-content {
  box-sizing: border-box;
  grid-row: 1/-1;
  grid-column: 1/2;
  position: static;
  height: 100vh;
  background-color: #F0F4F6;
}

.blog-sideBar {
  grid-row: 2/3;
}

/* 让md解析出的内容离旁边再远点 */
.blog-show .default-theme {
  padding-left: 4em;
}

/* 加载好文字后缓慢出现动画 */
@keyframes showWords {
  40% {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>