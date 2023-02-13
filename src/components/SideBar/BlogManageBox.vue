<template>
    <div class="blogManageBox-fullPage">
        <div class="console-data-list">
            <ul>
                <li class="data-total-articalCount">
                    <p class="dataTitle">总文章量</p>
                    <p class="today-data">{{userData.totalBlogNumber}}</p>
                </li>

                <li class="data-updateDate-artical">
                    <p class="dataTitle">最近更新时间</p>
                    <p class="today-data">{{userData.updateTime}}</p>
                </li>
            </ul>
        </div>

        <div class="search-box">
            <input type="month" class="search-date search-input" :max="dateNow" min="2022-01" v-model="date_start"
                :placeholder="placeholder_timeStart" ref="input_timeStart" v-on:focus="timeStartFocus"
                v-on:blur="timeStartBlur" />
            <input type="month" class="search-date search-input" :max="dateNow" min="2022-01" v-model="date_end"
                :placeholder="placeholder_timeEnd" ref="input_timeEnd" v-on:focus="timeEndFocus"
                v-on:blur="timeEndBlur" />
            <span class="separator">|</span>
            <input type="text" class="search-text search-input" autocomplete="none" placeholder="请输入关键词"
                v-model="keyword" />
            <button class="search-btn" @click="searchBtnClicked">搜索</button>
            <button class="submitBlog-btn" @click="submitBlogClicked">上传博客</button>
        </div>

        <div class="blank_list">
            <div class="blank-noBlog" v-show="blank_noBlogShow">555没有博客</div>
            <BlogsNavigation v-if="blank_blogShow" :blogs="blogsData" @showPromptBox="showPromptBox"
                @showCheckBox="showCheckBox">
            </BlogsNavigation>
        </div>
    </div>
</template>

<style scoped>
.blogManageBox-fullPage {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.console-data-list {
    background-color: #E4EFF0;
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #3D5A80;
}

.console-data-list ul {
    list-style: none;
    display: flex;
    width: fit-content;
    margin: auto;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding-left: 0;
}

.console-data-list li {
    flex-grow: 1;
    text-align: center;
    height: 100%;
}

.console-data-list li:not(:last-child) {
    border-right: #3D5A80 1px solid;
}

.today-data {
    font-size: 24px;
    font-weight: 500;
    color: #222226;
}

.dataTitle {
    color: #555666;
}

.search-box {
    padding: 8px;
    padding-left: 0;
    font-size: 14px;
    margin-left: auto;
    padding: 16px;
    border-bottom: 1px dashed #3D5A80;
    display: flex;
    align-items: center;
    width: 100%;
}

.search-input {
    padding-left: 10px;
    width: 214px;
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
    outline: 2px solid #fc5531;
}

.search-box .search-date:nth-child(1) {
    margin-right: 9px;
}

/* .search-date::-webkit-datetime-edit-fields-wrapper{
    display: none;
} */
.search-date:before {
    content: attr(placeholder);
}

.separator {
    color: #767786;
    margin-left: 9px;
    font-size: 24px;
    height: 32px;
    vertical-align: middle;
}

.search-text {
    margin-left: 9px;
}

.search-btn {
    padding: 0 24px;
    border: 1px solid #fc5531;
    border-color: #fc5531;
    font-size: 14px;
    color: #fc5531;
    transition: background-color .3s ease-in, border-color .3s ease-in;
    line-height: 32px !important;
    height: 32px !important;
    border-radius: 8px;
    min-height: unset;
    background: #fff;
    font-weight: 500;
    margin-left: 32px;
    cursor: pointer;
}

.search-btn:hover {
    background-color: #fc5531;
    color: #fff;
}

.submitBlog-btn {
    padding: 0 24px;
    border: 1px solid #fc5531;
    font-size: 14px;
    color: #fff;
    transition: background-color .3s ease-in, border-color .3s ease-in;
    line-height: 32px !important;
    height: 32px !important;
    border-radius: 8px;
    min-height: unset;
    background: #fc5531;
    font-weight: 500;
    margin-left: 32px;
    cursor: pointer;
}

.submitBlog-btn:hover {
    background-color: #fff;
    color: #fc5531;
}

.blank_list {
    padding: 16px;
    position: relative;
    flex-grow: 1;
    overflow-y: scroll;
}

.blank_list::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

.blank_list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 .5px rgba(0, 0, 0, 0.2);
    background: rgb(238, 108, 77);
}

.blank_list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}


.blank-noBlog {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;

    color: #555666;
    font-size: 25px;
    font-weight: 600;
}
</style>

<script setup lang="ts">
import { getCurrentInstance, inject, onMounted, reactive, ref } from 'vue';
import BlogsNavigation from '../SideBar/BlogsNavigation_manage.vue';
import BlogSubmitBox from '../SideBar/BlogSubmitBox.vue';

const cns: any = getCurrentInstance();
const global = cns.appContext.config.globalProperties.$global;

const emit = defineEmits(['showPromptBox', 'showCheckBox', 'showSubmitBox_change']);

type BlogObject = {  //服务器端返回博客对象数组的对象字段
    blogID: string,
    blogTitle: string,
    blogBrief: string
};

let dateNow = ref('');
function getDateNow() {
    let d = new Date();
    dateNow.value = d.toLocaleDateString().replace(/\//g, '-');
}
getDateNow();

type UserData = {
    userName: string,
    nikeName: string,
    birthday: string,
    sex: string,
    totalBlogNumber: number,
    updateTime:string
}

let userData = reactive({
    totalBlogNumber: 0,
    updateTime: ''
});
onMounted(()=>{
    let data:any = inject('userData');
    userData.totalBlogNumber = data.totalBlogNumber;
    userData.updateTime = data.updateTime;

})

let date_start = ref('');
let date_end = ref('');
let keyword = ref('');
let placeholder_timeStart = ref('请输入开始时间');
let placeholder_timeEnd = ref('请输入结束时间');

let blogsData = ref();//用来给博客表传递props

function timeStartFocus() {
    placeholder_timeStart.value = '';
}
function timeEndFocus() {
    placeholder_timeEnd.value = '';
}
function timeStartBlur() {
    if (date_start.value === '') {
        placeholder_timeStart.value = '请输入开始时间';
    }
}
function timeEndBlur() {
    if (date_end.value === '') {
        placeholder_timeEnd.value = '请输入开始时间';
    }
}

let blank_noBlogShow = ref(false);
let blank_blogShow = ref(true);

//1.用起始时间和终止时间发出请求，拿到这段时间所有的内容
//2.对标题进行匹配生成最终数组
async function searchBtnClicked() {
    let startMonth = date_start.value;
    let endMonth = date_end.value;
    let keyword_sub = keyword.value;
    let blogs: BlogObject[] = await getBlogs(startMonth, endMonth, keyword_sub);

    blank_blogShow.value = false; //这是为了保证再次搜索的时候能够让其重新加载
    if (blogs.length === 0) {
        blank_noBlogShow.value = true;
        blank_blogShow.value = false;
    } else {//有博客就开始动态创建模板
        blank_blogShow.value = true;
        blank_noBlogShow.value = false;
        blogsData.value = blogs;
    }
}

async function getBlogs(startMonth: string, endMonth: string, keyword: string) {
    let obj = {
        userID: global.userID,
        startMonth: startMonth,
        endMonth: endMonth,
        keyword: keyword
    }
    let jsonObj = JSON.stringify(obj);
    let jsonHeaders = new Headers({
        'Content-Type': 'application/json'
    });
    let data: any = await fetch('', {  //路径还没给出来
        method: 'POST',
        body: jsonObj,
        headers: jsonHeaders
    }).then((resonse: Response) => resonse.json, () => console.log('ERROR!'));

    return data.blogs;
}

function submitBlogClicked() {
    emit('showSubmitBox_change', true);
}

function showPromptBox(state: boolean, msg: string) {
    emit('showPromptBox', state, msg);
}
function showCheckBox(ID: string) {
    emit('showCheckBox', ID);
}
</script>