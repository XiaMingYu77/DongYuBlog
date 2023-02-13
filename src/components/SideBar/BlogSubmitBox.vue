<template>
    <div class="blogSubmitBox-fullPage">
        <div class="select-area">
            <input type="file" style="display: none;" ref="input_file" @change="getFile" />
            <button class="file-btn selectFile-btn" @click="fileSelect" accept=".md">上传.md文件</button>
            <button class="file-btn clear-btn" @click="clear">清空</button>
            <button class="file-btn cancel-btn" @click="cancelClick">取消发布</button>
            <button class="file-btn publish-btn" @click="submitBlogClick">发布</button>
        </div>
        <div class="file-edit-area">
            <form>
                <input class="input-title" placeholder="请输入文章标题" autocomplete="none" v-model="blogTitle" />
                <textarea class="input-brief" placeholder="请输入文章简介" autocomplete="none" v-model="blogBrief"
                    @blur="briefBlur"></textarea>
            </form>
        </div>
        <div class="artical-edit-area">
            <MdEditor1 v-model="state.text" :code-theme="state.theme" :page-full-screen="state.pageFullScreen"
                @click.stop="" editorId='md-editor-v3-3' />
        </div>
    </div>
</template>


<style scoped>
.blogSubmitBox-fullPage {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.select-area {
    background-color: #E4EFF0;
    height: 50px;
    width: 100%;
    display: flex;
    justify-items: center;
    padding: 5px 16px 5px 16px;
}

.file-btn {
    box-sizing: content-box;
    width: 100px;
    border: 1px solid #fc5531;
    border-color: #fc5531;
    font-size: 14px;
    color: #fff;
    transition: background-color .3s ease-in, color .3s ease-in;
    line-height: 30px !important;
    height: 30px !important;
    border-radius: 20px;
    min-height: unset;
    background: #fc5531;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
}

.file-btn:hover {
    background-color: #fff;
    color: #fc5531;
}

.selectFile-btn {
    margin-right: 30px;
}

.publish-btn {
    width: 130px;
    font-size: 16px;
    font-weight: 600;
    margin-left: 0;
    margin-right: 0;
}

.clear-btn {
    background-color: #fff;
    color: #fc5531;
}

.clear-btn:hover {
    background-color: #fc5531;
    color: #fff;
}

.cancel-btn {
    margin-left: auto;
    margin-right: 30px;
    background-color: #fff;
    color: #fc5531;
}

.cancel-btn:hover {
    background-color: #fc5531;
    color: #fff;
}

.file-edit-area {
    width: 100%;
    border-bottom: 1px dashed #3D5A80;
    padding: 16px;
}

.file-edit-area .input-title {
    display: block;
    margin-bottom: 10px;
    height: 32px;
    width: 30%;
    padding-left: 5px;
    background-color: #fff;
    border-radius: 8px;
    outline: 1px solid #3D5A80;
    border: 0;
    box-sizing: border-box;
    color: #606266;
}

.file-edit-area .input-title:focus {
    outline: 2px solid #fc5531;
}

.file-edit-area .input-brief {
    display: block;
    resize: none;
    height: 70px;
    width: 70%;
    padding: 5px;
    background-color: #fff;
    border-radius: 8px;
    outline: 1px solid #3D5A80;
    border: 0;
    box-sizing: border-box;
    color: #606266;
}

.file-edit-area .input-brief:focus {
    outline: 2px solid #fc5531;
}


.artical-edit-area {
    position: relative;
    width: 100%;
    height: 100%;
}

.artical-edit-area .md-fullscreen {
    position: absolute;
}

::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(238, 108, 77, 0.5);
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}
</style>

<script lang="ts" setup>
import MdEditor1 from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { getCurrentInstance, reactive, ref } from 'vue';

const cns: any = getCurrentInstance();
const global = cns.appContext.config.globalProperties.$global;

const emit = defineEmits(['showSubmitBox_change', 'showPromptBox']);

let state = reactive({
    text: '',
    theme: 'dark',
    language: 'my-lang',
    previewOnly: false,
    pageFullScreen: true
});

type ResponseData = {
    code:Number;
    msg:string;
}

function cancelClick() {
    emit('showSubmitBox_change', false);
}

const file = ref();
const blogTitle = ref('');
const blogBrief = ref('');

function briefBlur() {
    if (blogBrief.value.length === 0) {
        blogBrief.value = '懒死了，简介都不填';
    }
}

let input_file = ref();
function fileSelect() {
    input_file.value.click();
}
function getFile() {
    file.value = input_file.value.files[0];
    // console.log(file.value);
    let fileName: string = file.value.name;
    let regExp = /.md$/;
    let flag_isMd = regExp.test(fileName);
    if (!flag_isMd) { //不是md文件要清空并提示 
        clear();
        emit('showPromptBox', false, '请上传.md文件');
    } else {
        blogTitle.value = fileName.split('.')[0];
        setMdText();
    }
}
function clear() {   //全部清空还原
    input_file.value.value = '';
    file.value = null;
    blogTitle.value = '';
    blogBrief.value = '';
    state.text = '';
}
function setMdText() {
    let reader = new FileReader();
    reader.readAsText(file.value);
    reader.onload = () => {
        state.text = reader.result as string;
    }
}

function checkFileMsg() { //校验是不是必要的都填了：标题、内容不为空，简介空的话填个默认的
    let flag = true;
    let errMsg = '';
    if (blogTitle.value.length === 0) {
        flag = false;
        errMsg += '标题';
    }
    if (state.text.length === 0) {
        flag = false;
        errMsg += '内容';
    }
    errMsg += '不可为空';

    if (flag) { return true }
    else {
        emit('showPromptBox', false, errMsg);
        return false;
    }
}

function submitBlogClick() {
    //先校验是不是必要的都填了：标题、内容不为空，简介空的话填个默认的
    if (checkFileMsg()) {
        //要将其打包成文件，文件名就是标题名.md
        let blob = new Blob([state.text], { type: 'text/plain' });
        let file = new window.File([blob], `${blogTitle.value}.md`, { type: 'text/plain' });
        submitBlog(file, blogTitle.value, blogBrief.value, global.userID);
    }
}

async function submitBlog(file:File ,blogTitle:string, blogBrief:string, userID:string){
    let formData = new FormData();
    formData.append('blogFile', file);
    formData.append('blogTitle', blogTitle);
    formData.append('blogBrief', blogBrief);
    formData.append('userID', userID);

    let responseData:any = await fetch('',{
        method:'POST',
        body:formData,
    }).then((response:Response)=>response.json);
    checkResponse(responseData)
}
function checkResponse(data:ResponseData){
    if(data.code === 200){ //上传成功
        emit('showPromptBox', true, '上传成功');
        clear();
    }else{
        emit('showPromptBox', false, data.msg);
    }
}
</script>