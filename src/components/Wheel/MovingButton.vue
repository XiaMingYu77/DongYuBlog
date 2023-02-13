<template>
    <div v-show="hide" class="move-button" ref="moveBtn" @mousedown="btnDown" @touchstart="btnDown" @mousemove="btnMove"
        @touchmove="btnMove" @mouseleave="btnEnd" @touchleave="btnEnd" @mouseup="btnEnd" @touchend="btnEnd"
        @touchcancel="btnEnd">
        <div class="button-mainbg">
            <div class="btn_left" @click="ButtonShake(backClick)">
                <img class="btn_icon" src="../../assets/backArrow.svg" />
            </div>
            <div class="btn_right" @click="ButtonShake(homeClick)">
                <img class="btn_icon" src="../../assets/home.svg" />
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.move-button {
    border-radius: 50%;
    width: 16vh;
    height: 14vh;
    position: fixed;
    z-index: 7;
}

.button-mainbg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    border-radius: 10vh;


    /* background-repeat: no-repeat;
    background-position: center;
    background-size: 5vh 5vh; */
}

.btn_left {
    position: relative;
    float: left;
    width: 3vh;
    height: 6vh;
    border-radius: 10vh 0 0 10vh;
    background-color: rgb(238, 108, 77);
    box-shadow: .25em .5em .5em rgba(0, 0, 0, 0.3);
    transition: width 0.5s ease-in-out;
    overflow: hidden;
}

.btn_right {
    position: relative;
    float: right;
    width: 3vh;
    height: 6vh;
    border-radius: 0 10vh 10vh 0;
    background-color: #3D5A80;
    box-shadow: .25em .5em .5em rgba(0, 0, 0, 0.3);
    transition: width 0.5s ease-in-out;
    overflow: hidden;
}

.button-mainbg:hover .btn_left {
    width: 8vh;
}

.button-mainbg:hover .btn_right {
    width: 8vh;
}

.btn_left:active {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
    transform: translate(0.25em, .5em);
    transition: transform 0.15s, box-shadow 0.15s;
}

.btn_right:active {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
    transform: translate(0.25em, .5em);
    transition: transform 0.15s, box-shadow 0.15s;
}

.btn_icon {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    object-fit: cover;
    width: 5vh;
    height: 5vh;

    pointer-events: none;
    user-select: none;
}

.btn_left .btn_icon {
    margin-left: 1vh;
}

.btn_right .btn_icon {
    margin-right: 1vh;
}
</style>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import ButtonShake from "../Tools/ButtonShake";
import Throtting from '../Tools/Throttling';

let hide = true;
let flags = false;
let position = {
    x: 0,
    y: 0
}
let nx = 0, ny = 0, dx = 0, dy = 0;
let xPum = 0, yPum = 0;
let isShow = false;
let moveBtn: any = ref();
let timer: any = null;
let currentTop = 0;
let moving = ref(false);

let beforMovePosition = {
    x: 0,
    y: 0
}

let handleScrollEnd = function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop === currentTop) {
        hide = true;
        clearTimeout(timer);
    }
}

let hideButton = function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
        handleScrollEnd();
    }, 300);
    currentTop = document.documentElement.scrollTop || document.body.scrollTop;
    hide = false;
}

onMounted(() => {
    window.addEventListener('scroll', hideButton);
})

function btnDown(event: any) {
    flags = true;
    moving.value = false;
    [beforMovePosition.x, beforMovePosition.y] = [position.x, position.y];

    let touch;
    if (event.touches) {
        touch = event.touches[0];
    } else {
        touch = event;
    }
    position.x = touch.clientX;
    position.y = touch.clientY;

    dx = moveBtn.value.offsetLeft;
    dy = moveBtn.value.offsetTop;
}

function btnMove(event: any) {
    Throtting(() => {
        //添加节流
        if (flags) {
            if (Math.abs(position.x - beforMovePosition.x) > 20 ||
                Math.abs(position.y - beforMovePosition.y) > 20) moving.value = true; //防抖，防止用户点击按钮却判断为移动按钮 

            let touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            nx = touch.clientX - position.x;
            ny = touch.clientY - position.y;

            xPum = dx + nx;
            yPum = dy + ny;

            let clientWidth = document.documentElement.clientWidth;
            let clientHeight = document.documentElement.clientHeight;


            if (xPum > 0 && xPum < (clientWidth - moveBtn.value.offsetWidth)) {
                moveBtn.value.style.left = xPum + "px";
            }
            if (yPum > 0 && yPum < (clientHeight - moveBtn.value.offsetHeight)) {
                moveBtn.value.style.top = yPum + "px";
            }

            //阻止页面的滑动默认事件
            document.addEventListener("touchmove", handler, {
                passive: false
            });
        }
    })
}

function btnEnd() {
    flags = false;
    document.addEventListener('touchmove', handler, {
        passive: false
    });
}

function handler(event: any) {
    if (flags) {
        event.preventDefault();
    } else {
        return true;
    }
}

let emit = defineEmits(['backClick', 'homeClick'])

function backClick() {
    if (!moving.value) emit('backClick');
}
function homeClick() {
    if (!moving.value) emit('homeClick');
}

</script>