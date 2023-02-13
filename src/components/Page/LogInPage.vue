<template>
    <div class="login-container">
        <div class="left-container">
            <div class="left-out" :style="left_outStyle">
                <div class="titleLog"><span>登录</span></div>
                <form class="input-container" :style="log_inputContanerStyle" ref="logForm" onsubmit="return false">
                    <input type="text" placeholder="用户名" v-model.lazy="username" required>
                    <input type="password" placeholder="密码" v-model.lazy="password" required>
                </form>
                <div class="logMessage">
                    <span class="login-form-error" :style="login_form_errorStyle">{{ logErrorMsg }}</span>
                    <div class="message-container">
                        <span>忘记密码</span>
                    </div>
                </div>
            </div>
            <div class="left-in" :style="left_inStyle">
                <form class="input-container regist_inputArea" ref="registForm">
                    <div>
                        <input type="text" placeholder="用户名（5-12位）" v-model="username" required @blur="regUsernameBlur">
                        <span :style="regist_form_userNameErrorStyle">{{ regUserNameErrorMsg }}</span>
                    </div>
                    <div>
                        <input type="password" placeholder="密码（7-15位）" v-model="password" required
                            @blur="regPasswordBlur">
                        <span :style="regist_form_passwordErrorStyle">{{ regPasswordErrorMsg }}</span>
                    </div>
                    <div>
                        <input type="password" placeholder="再次输入密码" v-model="re_password" required
                            :disabled="rePasswordDisabled" @keyup="rePasswordKeyup" @blur="rePasswordBlur">
                        <span :style="regist_form_RepasswordErrorStyle">{{ regRePasswordErrorMsg }}</span>
                    </div>
                </form>
            </div>
        </div>
        <div class="right-container">
            <div class="regist-container"><span class="regist">注册</span></div>
            <div class="action-container">
                <span class="btn_size" @click="ButtonShake(openAndClose)">{{ sizeBtn_msg }}</span>
                <span class="btn_submit" @click="ButtonShake(submitClick)">{{ logOrRegisterBtn_msg }}</span>
            </div>
        </div>
    </div>

    <div class="testMSG">注意：目前无后端，可以使用任意用户名、密码进行登陆，注册用户不会上传</div>
</template>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.login-container {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 40em;
    height: 22em;
    margin: auto;
    border-radius: 20px;
    box-shadow: 0 10px 50px 0px rbg(59, 45, 159);
    background-color: rgba(91, 108, 146, 0.8);
    z-index: 20;
}

.left-container {
    width: 75%;
    height: 22em;
    border-radius: 20px;
    position: relative;
    float: left;
}


.left-out {
    background-image: linear-gradient(to bottom left, rgba(105, 122, 161, 0.8) 40%, rgba(231, 182, 193, 0.8) 100%);
    border-radius: 20px;
    z-index: 10;
    position: absolute;
    height: 100%;
    overflow: hidden;
    transition: width 1s ease-in-out;
}

.left-in {
    position: absolute;
    right: 0;
    border-radius: 20px;
    z-index: 5;
    height: 100%;
    overflow: hidden;
    transition: width 1s ease-in-out;
}

.titleLog {
    margin: 3rem;
    margin-bottom: 0;
    color: #fff;
    font-size: 18px;
    font-weight: 200;
}

.titleLog span {
    border-bottom: 3px solid rgb(237, 221, 22);
}

.input-container {
    padding: 20px 0;
    margin: 3rem;
    margin-top: 1rem;
    margin-bottom: 0;
}

input {
    border: 0;
    background: none;
    outline: none;
    color: #fff;
    margin: 20px 0;
    display: block;
    width: 100%;
    padding: 5px 0;
    transition: .2s;
    border-bottom: 1px solid rgb(199, 191, 219);
}

input:hover {
    border-bottom-color: #fff;
}

::-webkit-input-placeholder {
    color: rgb(199, 191, 219);
}

.logMessage {
    width: 27rem;
    background-color: gray;
}

.login-form-error {
    font-size: 14px;
    color: #fc5531;
    margin-left: 3rem;
    float: left;
}

.message-container {
    font-size: 14px;
    transition: .2s;
    color: rgb(199, 191, 219);
    cursor: pointer;
    margin-right: 0;
    float: right;
}

.message-container:hover {
    color: #fff;
}

.right-container {
    position: relative;
    float: right;
    height: 100%;
    width: 25%;
}

.regist-container {
    margin-top: 3rem;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 200;
}

.regist-container span {
    border-bottom: 3px solid rgb(237, 221, 22);
}

.regist_inputArea {
    margin-top: 3em;
}

.regist_inputArea input {
    margin-bottom: 5px;
}

.regist_inputArea span {
    display: block;
    width: 15rem;
    height: 0.5em;
    color: #fc5531;
}

.action-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.action-container span {
    font-size: 15px;
    color: #fff;
    text-align: center;
    border: 1px solid rgb(237, 221, 22);
    padding: 0 1.3rem 0 1.3rem;
    line-height: 2.5rem;
    border-radius: 2rem;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    width: fit-content;
    height: 2.5rem;
    transition: .2s;
    cursor: pointer;
    vertical-align: middle;
}

.btn_size {
    bottom: 0;
    top: 0;
}

.btn_submit {
    bottom: 4em;
}

.action-container span:hover {
    background-color: rgb(237, 221, 22);
    color: rgb(95, 76, 194);
}

.testMSG{
    position: fixed;
    left: 0;
    right: 0;
    top: 20px;
    width: fit-content;
    font-size: 16px;
    margin: auto;
}
</style>

<script setup lang="ts">
import router from '@/router/router';
import { getCurrentInstance, reactive, ref, watch } from 'vue';
import CookieUtil from '../Tools/CookieTool'
import ButtonShake from '../Tools/ButtonShake';


//用户信息
const cns: any = getCurrentInstance();
const global = cns.appContext.config.globalProperties.$global;

//控制左侧卡片拉伸
let left_outStyle = reactive({
    width: "100%"
})
let left_inStyle = reactive({
    width: "0%"
})
let log_inputContanerStyle = reactive({
    transition: "opacity 1s ease-in-out",
    opacity: "1"
})

//按钮内容
let sizeBtn_msg = ref('展开');
let logOrRegisterBtn_msg = ref('登录');

//卡片伸缩
let flag_open = false;
function openAndClose() {
    if (!flag_open) {
        left_outStyle.width = "28%";
        left_inStyle.width = "72%";
        sizeBtn_msg.value = "缩回";
        logOrRegisterBtn_msg.value = "注册"
        log_inputContanerStyle.opacity = "0";
        flag_open = true;
        flag_submitModel = 1; //按钮模式调整为注册模式
        //登陆错误提示隐藏
        login_form_errorStyle.opacity = '0';
        login_form_errorStyle.transition = 'opacity 1s ease-in-out';
        //移除注册错误信息过渡
        removeRegistErrorMsgTransisiton();
        //将表单内容清空
        clearForm();
    } else {
        left_outStyle.width = "100%";
        left_inStyle.width = "0%";
        sizeBtn_msg.value = "展开";
        logOrRegisterBtn_msg.value = "登陆";
        log_inputContanerStyle.opacity = "1";
        flag_open = false;
        flag_submitModel = 0; //按钮模式调整为登陆模式
        //将登陆错误提示的过渡弄掉
        login_form_errorStyle.transition = '';
        //注册错误信息隐藏
        hideRegistErrorMsg();
        //将表单内容清空
        clearForm();
    }
}

function removeRegistErrorMsgTransisiton() {
    regist_form_RepasswordErrorStyle.transition = '';
    regist_form_passwordErrorStyle.transition = '';
    regist_form_userNameErrorStyle.transition = '';
}

function hideRegistErrorMsg() {
    regist_form_RepasswordErrorStyle.opacity = '0';
    regist_form_RepasswordErrorStyle.transition = 'opacity 0.5s ease-in-out'

    regist_form_passwordErrorStyle.opacity = '0';
    regist_form_passwordErrorStyle.transition = 'opacity 0.5s ease-in-out'

    regist_form_userNameErrorStyle.opacity = '0';
    regist_form_userNameErrorStyle.transition = 'opacity 0.5s ease-in-out'
}


//表单部分
let path = 'http://www.pathfinder-l.top:8080';
let regSubmitPermissions = new Array(3).fill(false); //记录注册表单的填写情况

let logForm = ref();
let registForm = ref();

//表单填入的内容
let username = ref('');
let password = ref('');
let re_password = ref('');

//错误信息显示
let logErrorMsg = ref('');
let regUserNameErrorMsg = ref('');
let regPasswordErrorMsg = ref('');
let regRePasswordErrorMsg = ref('');

//控制重输入密码表单，让密码不符合规则的时候不允许填入
let rePasswordDisabled = ref(true);

//登陆、注册返回的数据
type responseData = {
    data: string, //userid
    info: string, //信息
    code: Number  //-1错误 200成功
}

//错误信息的样式
let login_form_errorStyle = reactive({
    opacity: '0',
    transition: ''
});
let regist_form_userNameErrorStyle = reactive({
    opacity: '1',
    transition: ''
});
let regist_form_passwordErrorStyle = reactive({
    opacity: '1',
    transition: ''
});
let regist_form_RepasswordErrorStyle = reactive({
    opacity: '1',
    transition: ''
});

//清空字段
function clearForm() {
    username.value = '';
    password.value = '';
    re_password.value = '';
}

//对各注册字段输入情况的检查
function regUsernameBlur() {
    //检查用户名长度5-12位
    let len = username.value.length;
    if (len < 5) { //长度小了
        regUserNameErrorMsg.value = '用户名过短'
        regist_form_userNameErrorStyle.opacity = '1';
    } else if (len > 12) {
        regUserNameErrorMsg.value = '用户名过长'
        regist_form_userNameErrorStyle.opacity = '1';
    } else {
        regist_form_userNameErrorStyle.opacity = '0';
        regSubmitPermissions[0] = true;
    }
}

function regPasswordBlur() {
    //检查密码长度7-15位
    rePasswordDisabled.value = true;
    let len = password.value.length;
    if (len < 7) {
        regPasswordErrorMsg.value = '密码过短'
        regist_form_passwordErrorStyle.opacity = '1';
    } else if (len > 15) {
        regPasswordErrorMsg.value = '密码过长'
        regist_form_passwordErrorStyle.opacity = '1';
    } else {
        regist_form_passwordErrorStyle.opacity = '0';
        rePasswordDisabled.value = false;
        regSubmitPermissions[1] = true;
    }
}

function rePasswordBlur() {
    if (password.value !== re_password.value) {
        regRePasswordErrorMsg.value = '两次密码内容不同';
        regist_form_RepasswordErrorStyle.opacity = '1';
    } else {
        regist_form_RepasswordErrorStyle.opacity = '0';
        regSubmitPermissions[2] = true;
    }
}

function rePasswordKeyup() {
    let pw1 = password.value;
    let pw2 = re_password.value;
    let len1 = pw1.length;
    let len2 = pw2.length;
    let flag_diffrent = false; //true表示再输入的密码和第一次输入的不一样
    if (len2 > len1) flag_diffrent = true;
    else {
        let subPw = pw1.substring(0, len2);
        if (pw2 !== subPw) flag_diffrent = true;
    }

    if (flag_diffrent) { //密码不同
        regRePasswordErrorMsg.value = '两次密码内容不同';
        regist_form_RepasswordErrorStyle.opacity = '1';
    } else {
        regist_form_RepasswordErrorStyle.opacity = '0';
    }

}

// 登陆/注册
let flag_submitModel = 0; //0表示为登陆，1为注册
function submitClick() {
    switch (flag_submitModel) {
        case 0: LogIn();
            break;
        case 1: Regist();
            break;
    }
}
function showLogError(errorMsg: string) {
    logErrorMsg.value = (errorMsg);
    login_form_errorStyle.opacity = '1';
}

//上传表单内容（由于我们都只需要上传userName和password所以可以包装成一个方法）
function submit(path: string) {
    let logObj = {
        'username': username.value,
        'password': password.value
    }
    let logInJsonText = JSON.stringify(logObj);
    let jsonHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    //返回一个期约
    return fetch(path, {
        method: 'POST',
        body: logInJsonText,
        headers: jsonHeaders
    }).then((response: Response) => response.json(), () => console.log('ERROR!'));
}

//登陆
async function LogIn() {
    if (username.value === '' || password.value === '') {
        showLogError('用户名和密码不可为空');
    }
    else {
        // let data = await submit(`${path}/user/login`);
        let data: responseData = {
            data: '1', //userid
            info: '', //信息
            code: 200,  //-1错误 200成功
        }
        //无后台返回

        checkLogState(data);
    }
}
//检测登陆状态
function checkLogState(logData: responseData) {
    if (logData.code == -1) { //用户不存在
        showLogError('用户名或密码错误');
    } else if (logData.code == 200) { //用户存在就在cookie中存储用户ID，然后返回上一页面
        let date = new Date();
        let expires = date.setDate(date.getDate() + 30);
        CookieUtil.set('userID', logData.data);
        // document.cookie = `userID=${logData.data}`
        //全局变量更新
        global.userID.value = logData.data;
        global.logState.value = true;

        router.back();
    }
}
//注册
async function Regist() {
    if (getPermission()) { //可以进行提交
        // let data = await submit(`${path}/user/register`);
        let data: responseData = {
            data: '1', //userid
            info: '', //信息
            code: 200,  //-1错误 200成功
        }
        // console.log(data);

        checkRegistState(data);
    }
}
//检测注册是否成功
function checkRegistState(logData: responseData) {   //还没测试
    if (logData.code == -1) { //注册失败（用户名已存在）
        regUserNameErrorMsg.value = '用户名已存在';
        regist_form_userNameErrorStyle.opacity = '1';
    } else if (logData.code == 200) { //注册成功
        let date = new Date();
        let expires = date.setDate(date.getDate() + 30);
        CookieUtil.set('userID', logData.data);
        //全局变量更新
        global.userID.value = logData.data;
        global.logState.value = true;

        router.back();
    }
}

//通过各注册表单的填写情况判断是否允许表单上传
function getPermission() {
    for (const per of regSubmitPermissions) {
        if (!per) return false
    }
    return true;
}
</script>