<template>
    <div class="displayArea" ref="areaElement">
        <div class="user-displayArea" @click="ButtonShake(toPersonalCenter)">
            <img :src="getUserHeadImg" class="personalImg">
            <h1 class="personalText">{{userName}}</h1>
        </div>

        <div class="changingButtom">
            <button :style="loginBtnStyle" class="logButton" @click="ButtonShake(Login)">登录</button>
            <button :style="logoutBtnStyle" @click="logout" class="logButton">注销</button>
        </div>

        <!-- 旋转正方形 -->
        <RotateCube></RotateCube>

        <div class="thankList-out">
            <article class="thankList">
                <h1>DongYuBlog</h1>
                <p>制作名单</p>
                <p>前端：夏明宇</p>
                <p>后端：罗瑞东</p>
            </article>
        </div>
    </div>
</template>

<style scoped>
.displayArea:hover {
    left: 0;
    transform: translate3d(0, 0, 0);
}

.displayArea {
    width: 27vh;
    height: 100vh;
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    justify-items: center;
    background-image: linear-gradient(210deg, #697AA1 20%, #E7B6C1 100%);
    position: absolute;
    z-index: 10;
    border-radius: 0 0.75em 0.75em 0;
    left: -24vh;
    transition: all 0.75s ease-in-out;
}

.user-displayArea {
    grid-row: 1/2;
    margin: 4vh auto 0 auto;
    width: 100%;
    text-align: center;
}

.personalImg {
    box-sizing: border-box;
    object-fit: cover;
    object-position: 50% 50%;
    width: 20vh;
    height: 30vh;
    margin: auto;
}

.personalText {
    text-align: center;
    color: #3b4348;
}

.thankList-out {
    font-size: 12px;
    grid-row: 4/5;
    position: relative;
    width: 100%;
}

.thankList {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    text-align: center;
    color: #3b4348;
}

.thankList h1 {
    font-size: 1.2em;
}

.thankList p {
    font-size: 0.9em;
}

.displayArea:after {
    /* 拉环 */
    box-sizing: border-box;
    position: absolute;
    content: "";
    display: block;
    width: 1.7em;
    height: 7em;
    background-color: #697AA1;
    border: .5em solid #9B91AD;
    border-left-color: transparent;
    right: -1.7em;
    top: 3vh;
    border-radius: 0 0.5em 0.5em 0;
}

.changingButtom{
    grid-row: 2/3;
    margin: 0 auto 0 auto;
    width: 100%;
    height: 1em;
    text-align: center;
}

.logButton {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;

    width: 4em;
    height: 2em;
    background-color: #EE6C4D;
    border: 0;
    border-radius: 2em;
    color: #e4e4e4;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-size: 100%;
    line-height: 2em;

    box-shadow: .15em .25em .25em rgba(0, 0, 0, 0.3);
}

.logButton:active {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
    transform: translate(0.15em, .25em);
    transition: transform 0.15s, box-shadow 0.15s;
}
</style>
<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import RotateCube from '../Wheel/rotateCube1.vue';
import CookieUtil from '../Tools/CookieTool'
import router from '@/router/router';
import { jsxAttribute } from '@babel/types';
import ButtonShake from '../Tools/ButtonShake';

let userName = ref("屿洺");
let getUserHeadImg = "https://ts1.cn.mm.bing.net/th/id/R-C.86a0fa17b9b37ff7518b552e2517a0ae?rik=CX0%2fMchuLIBQVA&riu=http%3a%2f%2fimg.crcz.com%2fallimg%2f201809%2f11%2f1536666825645562.jpg&ehk=g6IGr0cDabvrRd5KSQdbup2trGpltKDfA7Hx7eopcm0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"

//用户信息
const cns: any = getCurrentInstance();
const global = cns.appContext.config.globalProperties.$global;

console.log(global); //测试


let loginBtnStyle = reactive({
    display: 'block'
})
let logoutBtnStyle = reactive({
    display: 'block'
})

onMounted(() => {
    //根据登录状态显示登陆按钮/注销按钮
    if (global.logState.value) { //已登录
        loginBtnStyle.display = 'none';
        logoutBtnStyle.display = 'block';
    } else {
        loginBtnStyle.display = 'block';
        logoutBtnStyle.display = 'none';
    }
})

function logout() {
    CookieUtil.unset('userID');
    global.userID.value = '';
    global.logState.value = false;
    location.reload();//刷新
}
function Login(){
    router.push('/LogIn');
}

function toPersonalCenter(){
    router.push('/PersonalCenter');
}
</script> 