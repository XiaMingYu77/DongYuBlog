<template>
  <div>
    <div class="logWarnBox" :class="moveClass" @animationend="moveAnimationEnd">
      <i class="notification-icon"></i>
      <span class="notification-msg">请先登录</span>
    </div>
    <RouterView :style="PageGraduallyStyle" class="fullPage" @animationend="animationEnd" @logWarn="showLogWarn">
    </RouterView>
    <div class="HomeButtom">
      <MovingButton :style="movingBtnStyle" @back-click="backPage" @home-click="goToHome">
      </MovingButton>
    </div>
  </div>
</template>


<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, ref, type ComponentInternalInstance } from "vue";
import router from "./router/router";
import MovingButton from "./components/Wheel/MovingButton.vue"
import CookieUtil from './components/Tools/CookieTool'
import createRibbons from './components/Background/coloredRibbon'


//用户信息，在这里要获取cookie中的登陆信息更新全局变量
const cns: any = getCurrentInstance();
const global = cns.appContext.config.globalProperties.$global;

let userID = CookieUtil.get('userID');
if (userID) {
  global.userID.value = userID;
  global.logState.value = true;
} else {
  global.userID.value = '';
  global.logState.value = false;
}

onMounted(() => {
  createRibbons();
})

const movingBtnStyle = reactive({
  left: '65%',
  top: '80%',
  transition: ''
})

let goToHome = function () {
  router.push('/Home');
}

let backPage = function () {
  router.back();
}

//页面切换渐变动画
let PageGraduallyStyle = reactive({
  animation: "",
  opacity: '1'
})
router.afterEach((to, from) => {
  // console.log(to.name)
  // 进入最外层页面的渐变显示
  if (to.name === 'LogInPage' || to.name === 'PersonalCenter' || 
  (to.name === 'BlogsCenter' && from.name !== 'BlogPage' && from.name !== 'UserInfoCenter') || 
  (to.name === 'BlogPage' && from.name !== 'BlogsCenter' && from.name !== 'UserInfoCenter') ||
  (to.name === 'UserInfoCenter' && from.name !== 'BlogsCenter' && from.name !== 'BlogPage')) {
    PageGraduallyStyle.animation = 'PageGraduallyShow 1s ease';
    PageGraduallyStyle.opacity = '1'
  }

  // 可移动Home键的自动移动
  if (to.name === 'BlogPage') {   //这里是需要移动到位置1的页面
    movingBtnStyle.left = '65%';
    movingBtnStyle.top = '80%';
    movingBtnStyle.transition = 'all 1.5s';
    setTimeout(() => {
      movingBtnStyle.transition = ''
    }, 1500);
  } else {  // 这里是剩下挪到位置2的页面
    movingBtnStyle.left = '90%';
    movingBtnStyle.top = '85%';
    movingBtnStyle.transition = 'all 1.5s';
    setTimeout(() => {
      movingBtnStyle.transition = ''
    }, 1500);
  }
})
function animationEnd() {
  PageGraduallyStyle.animation = '';
}
router.beforeEach(async (to, from) => {
  //处理最外层页面的渐进消失
  if (from.name === 'LogInPage' || from.name === 'PersonalCenter' ||
  (from.name === 'BlogPage' && to.name !== 'BlogsCenter' && to.name !== 'UserInfoCenter') ||
  (from.name === 'BlogsCenter' && to.name !== 'BlogPage' && to.name !== 'UserInfoCenter') ||
  (from.name === 'UserInfoCenter' && to.name !== 'BlogPage' && to.name !== 'BlogsCenter')) {
    PageGraduallyStyle.animation = 'PageGraduallyClose 0.3s ease';
    PageGraduallyStyle.opacity = '0';
    let p = new Promise((resolve) => { setTimeout(resolve, 300) });
    await p;
  }
})


let moveClass = ref('');
function showLogWarn() {
  moveClass.value = 'move';
}
function moveAnimationEnd() {
  moveClass.value = '';
}
</script>

<style>
body {
  font-family: PingFangSC-Regular !important;
  margin: 0;
}

* {
  box-sizing: border-box;
}

canvas {
  pointer-events: none;
}

@keyframes PageGraduallyShow {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes PageGraduallyClose {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
<style scoped>
.logWarnBox {
  position: fixed;
  width: 380px;
  height: 48px;
  left: 0;
  right: 0;
  top: -60px;
  margin: auto;

  background-color: #f2caca;
  border: 2px #3D5A80 solid;
  border-radius: 5px;
  display: flex;
  align-items: center;
  z-index: 20;
}

.logWarnBox .notification-icon {
  width: 32px;
  height: 32px;
  margin-left: 6px;
  background: url('src/assets/failed.svg');
}

.logWarnBox .notification-msg {
  color: #cf4343;
  margin-left: 10px;
}

.move {
  animation: showNotification 3s;
}

@keyframes showNotification {
  from {
    transform: translateY(0);
  }

  30% {
    transform: translateY(110px);
  }

  70% {
    transform: translateY(110px);
  }

  to {
    transform: translateY(0);
  }
}
</style>
