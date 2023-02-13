<template>
    <div class="headChangeWindow-fullPage">
        <div class="content-card">
            <h1 class="head">修改头像</h1>
            <div class="imgBox">
                <div class="left">
                    <div class="putImg-area" v-show="!hasPicture" @dragenter="dragenter" @dragover="dragover"
                        @drop="drop">
                        <div class="imgSelect-area">
                            <label class="select-btn" for="uploads">选择图片</label>
                            <input v-show="false" id="uploads" ref="input_file" type="file"
                                accept="image/png, image/jpeg, image/jpg" @change="putFile" />
                            <p class="hintText">支持jpg、png格式的图片，大小不超过3Mb</p>
                            <p class="hintText">可将图片拖放到此区域</p>
                            <p class="hintText errorText" v-show="fileErrorText_showState">{{ errorMsg }}</p>
                        </div>
                    </div>
                    <VueCropper v-if="hasPicture" :img="cropperOption.img" :fixed="cropperOption.fixed"
                        :fixedNumber="cropperOption.fixedNumber" :autoCrop="cropperOption.autoCrop"
                        :canMoveBox="cropperOption.canMoveBox" :centerBox="cropperOption.centerBox" enlarge="0.5"
                        :fixedBox="cropperOption.fixedBox" :mode="cropperOption.mode"
                        @realTime="getPreviewImg" ref="cropper"></VueCropper>
                </div>
                <div class="right">
                    <div class="show-preview">
                        <div :style="previews.div" class="preview">
                            <img :src="previews.url" :style="previews.img">
                            <img src="../../assets/headBeforeSet.svg" v-show="!hasPicture" class="pic-beforeSet">
                        </div>
                    </div>
                    <div class="changing-select">
                        <p class="previewHint-text" v-show="!hasPicture">预览</p>
                        <button class="reSubmitImg-btn select-btn" v-show="hasPicture"
                            @click="clearPicture">重新上传</button>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="submit-select">
                    <button class="select-btn2 cancel-btn" @click="closeWindow">取消</button>
                    <button class="select-btn2 submit-btn" @click="submitBtnClicked">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.headChangeWindow-fullPage {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.content-card {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 800px;
    height: 700px;
    border-radius: 15px;
    background-image: linear-gradient(170deg, #697AA1 20%, #E7B6C1 100%);

    display: flex;
    flex-direction: column;
}

.head {
    margin: 0;
    height: 70px;
    width: 100%;
    color: rgb(237, 237, 237);
    padding-left: 16px;
    line-height: 70px;
    font-size: 20px;
    border-bottom: 1px solid rgba(231, 182, 193, 0.5);
}

.imgBox {
    /* background-color: rgba(0, 0, 0, 0.3); */
    margin: 32px 0 0 0;
    padding: 16px;
    display: flex;
}

.left {
    height: 500px;
    width: 500px;
    background-color: rgba(242, 253, 255, 0.5);
    border-radius: 10px;
    position: relative;
}

.right {
    height: 100%;
    flex-grow: 1;
    margin-left: 10px;
    background-color: rgba(242, 253, 255, 0.5);
    border-radius: 10px;
    position: relative;
}

.footer {
    flex-grow: 1;
    position: relative;
}

.putImg-area {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.imgSelect-area {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.select-btn {
    background-color: #3D5A80;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color .3s;
    cursor: pointer;
    margin-bottom: 10px;
}

.select-btn:hover {
    background-color: #E7B6C1;
}

.hintText {
    margin: 0;
    color: #5d5d66;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
    text-align: center;
}

.errorText {
    position: absolute;
    top: 100px;
    color: #fc5531;
}

.show-preview {
    width: 400px;
    height: 400px;
    zoom: 0.5;

    position: absolute;
    left: 0;
    right: 0;
    top: 15%;
    margin: auto;
}

.preview {
    overflow: hidden;
    border-radius: 50%;
}

.preview .pic-beforeSet {
    widows: 400px;
    height: 400px;
    object-fit: cover;
    object-position: center;
}


.changing-select {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10%;
    margin: auto;
    width: fit-content;
    height: 30px;
    line-height: 30px;
}

.changing-select .previewHint-text {
    margin: 0;
    color: #7d7d86;
    font-size: 16px;
    font-weight: 600;
}

.changing-select .reSubmitImg-btn {
    border: 0;
    font-size: 16px;
}

.submit-select {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 16px;
    margin: auto;

    height: fit-content;
}

.select-btn2 {
    font-weight: 600;
    margin-left: 70px;
    height: 35px;
    width: 130px;
    border: 0;
    border-radius: 8px;
    transition: color .3s, background-color .3s;
    cursor: pointer;
}

.cancel-btn {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid #fc5531;
    color: #fc5531;
}
.cancel-btn:hover{
    background-color: rgba(252, 85, 49, 0.8);
    color: #fff;
}

.submit-btn{
    border: 1px solid #fc5531;
    background-color: rgba(252, 85, 49, 0.8);
    color: #fff;
}
.submit-btn:hover{
    background-color: rgba(255, 255, 255, 0.8);
    color: #fc5531;
}

</style>

<style>
/* 这个是为了不让截图框被拖动 */
.cropper-box-canvas{
    zoom: 1;
}
</style>

<script lang="ts" setup>
import 'vue-cropper/dist/index.css'
import { VueCropper }  from "vue-cropper";

import { getCurrentInstance, onMounted, reactive, ref } from 'vue';

const cns: any = getCurrentInstance();
const global = cns.appContext.config.globalProperties.$global;

type ResponseData = {
    code:Number;
    msg:string;
}

let imgFile = ref();  //存放检查后的图片文件
let hasPicture = ref(false);

let previews = ref({
    url: '',
    div: '',
    img: ''
}); //预览头像相关信息
let cropper:any = ref();

let input_file = ref(); //文件输入

let errorMsg = ref('请放入符合格式的图片');
let fileErrorText_showState = ref(false);

const emit = defineEmits(['closeUserHanderChangeWindow', 'showPromptBox']);

const cropperOption = reactive({ //这个是裁剪框需要的参数数据
    img: '', //图片地址
    fixed: true, //开启截图框宽高固定比例
    fixedNumber: [1, 1], //截图框的宽高比例
    autoCrop: true, //默认生成截图框
    centerBox: true, //截图框是否被限制在图片里面
    canMoveBox: false, //截图框是否可动
    fixedBox: true, //截图框大小不可变
    mode:'cover' //拉伸布局 填充整个容器
});

//这里是实现文件拖放
function dragenter(event: Event) {
    event.preventDefault();
    event.stopPropagation();
}
function dragover(event: Event) {
    event.preventDefault();
    event.stopPropagation();
}
function drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let file = event.dataTransfer.files[0]; //获取到传入的文件
    let fileName = file.name;
    const regExp = /.png|.jpg|.jpeg$/;
    if (regExp.test(fileName)) {
        checkFileSize(file);
    } else { //显示异常提示
        errorMsg.value = '请放入符合格式的图片';
        fileErrorText_showState.value = true;
    }
}

//这里是通过按钮提交的处理
function putFile() {
    let file = input_file.value.files[0];
    checkFileSize(file);
}

function checkFileSize(file: File) {
    //确认file的大小
    const maxaSize = 3 * 1024 * 1024;
    if (file.size > maxaSize) { //大于3Mb，进行异常提示
        errorMsg.value = '图片过大，请放入不超过3Mb的图片'
        fileErrorText_showState.value = true;
    } else {
        imgFile.value = file;
        errorMsg.value = '';
        fileErrorText_showState.value = false;
        setCropperOptionImg();
        hasPicture.value = true;
    }
}

function setCropperOptionImg() {
    let reader = new FileReader();
    reader.readAsDataURL(imgFile.value);
    reader.onload = () => {
        cropperOption.img = reader.result as string;
    }
}

//实时预览头像
function getPreviewImg(data: any) {
    if (hasPicture.value) {
        previews.value.url = data.url;
        previews.value.img = data.img;
        previews.value.div = data.div;
    }
}

//清空
function clearPicture() {
    hasPicture.value = false;
    imgFile.value = null;

    previews.value.url = '';
    previews.value.img = '';
    previews.value.div = '';

    input_file.value.value = null;
}

function closeWindow(){
    emit('closeUserHanderChangeWindow');
}

function submitBtnClicked(){
    let blob:Blob
    cropper.value.getCropBlob((data:any)=>{
        blob = data;
        submitHeadImg(blob);
    })
}
async function submitHeadImg(blob:Blob){
    let file = new window.File([blob], `${imgFile.value.name.split('.')[0]}.jpeg`, { type: 'image/jpeg' });
    //上传文件
    let formData = new FormData();
    let userID = global.userID;
    formData.append('headImg',file);
    formData.append('userID',userID);
    let responseData:any = await fetch('',{
        method:'POST',
        body:formData,
    }).then((response:Response)=>response.json);
    checkResponse(responseData)
    closeWindow();
}
function checkResponse(responseData: ResponseData){
    if(responseData.code == 200){
        emit('showPromptBox', true, '头像修改成功');
    }else{
        emit('showPromptBox', false, responseData.msg);
    }
}
</script>