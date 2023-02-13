<template>
    <div class="fullPage">
        <div class="fullContentCard">
            <div class="head-column">
                <div class="general-info-user">
                    <div class="general-info-avatar" @click="showUserHanderChangeWindow">
                        <img class="userHeaderImg" src='/userHeader.png' />
                        <div class="avatar-hover">
                            <img class="hover-img">
                        </div>
                    </div>
                    <div class="general-info-user-info">
                        <div class="profile-nickname-info">{{ userData.nikeName }}</div>
                        <div class="profile-blogsNumber-info">博客数：{{ userData.totalBlogNumber }}</div>
                        <div class="profile-joinTime-info">{{ userData.updateTime }}</div>
                    </div>
                </div>
                <div class="general-info-toPersonalMainPage">
                    <button class="btn-toPersonalMainPage" @click="ButtonShake(toUserInfoCenter)">个人主页<i class="el-icon-arrow-right"></i></button>
                </div>
            </div>
            <div class="sideBar">
                <li @click="changeCountent">
                    <span class="router-link" name="toPersonalFolder">个人资料</span>
                    <span class="router-link" name="toAccountSettings">账号设置</span>
                    <span class="router-link" name="toArticalManagement">内容管理</span>
                    <span class="router-link" name="toBrowsingHistory">历史记录</span>
                </li>
            </div>
            <div class="content">
                <component :is="currentTab" @showPromptBox="showPromptBox" @showWarning="showWarning_unsubscribe"
                    @showCheckBox="showCheckBox"></component>
            </div>

            <div class="warningBox" :style="warningBoxStyle">
                <article>
                    <h2>账号注销则视为您主动放弃以下权益，且同意以下规则：</h2>
                    <p>1.账号注销后，您将无法登录、使用本站账号，且不支持找回任何个人资料。</p>
                    <p>2.该账号将解除与其他产品的绑定或授权关系，且不支持找回。</p>
                    <p>3.本站存储的所有文章将会丢失，其他人也不再能看到您的账户及内容</p>
                </article>
                <div class="checkPlace">
                    <button class="btn-cancel" @click="unsubscribe_cancel">取消</button>
                    <button class="btn-confirm" @click="unsubscribe">确认注销</button>
                </div>
            </div>
        </div>

        <div class="headChangeWindow" v-if="headChangeWindow_showState">
            <HeadImgChangeWindow @closeUserHanderChangeWindow="closeUserHanderChangeWindow"
                @showPromptBox="showPromptBox"></HeadImgChangeWindow>
        </div>

        <div class="promptBox" :class="moveClass" :style="promptBoxStyle" @animationend="moveAnimationEnd">
            <i class="notification-icon" :style="iconStyle"></i>
            <span class="notification-msg" :style="msgStyle">{{ notificationMsg }}</span>
        </div>

        <div class="checkBox" :style="checkBoxStyle">
            <span class="check-msg">真的要删除吗</span>
            <span class="check-yes" @click="yesBtnClicked">Yes</span>
            <span class="check-no" @click="noBtnClicked">No</span>
        </div>
    </div>
</template>

<style scoped>
.fullPage {
    width: 100%;
    height: 100vh;
}

.fullContentCard {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1200px;
    margin: 20px auto auto auto;

    display: grid;
    grid-template-columns: 190px 1fr;
    grid-template-rows: 222px 1fr;
}

.sideBar {
    box-sizing: border-box;
    grid-row: 1/-1;
    grid-column: 1/2;
    background-color: #F0F4F6;
    border: 2px #3D5A80 solid;
    border-radius: 10px 0 0 10px;
    height: fit-content;

    box-shadow: .35em .5em .5em rgba(41, 50, 65, 0.3);
}


.sideBar li {
    list-style: none;
    padding: 8px 0 8px 0;
}

.sideBar .router-link {
    display: block;
    text-align: center;
    height: 48px;
    line-height: 48px;

    color: black;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    border-radius: 5px;
}

.sideBar .router-link:hover {
    background-color: rgba(101, 197, 214, 0.1);
}

.sideBar .router-link:active {
    box-shadow: inset .25em .35em .15em rgba(41, 50, 65, 0.3);
    transition: box-shadow 0.15s ease-out;
}

.head-column {
    grid-row: 1/2;
    grid-column: 2/3;
    background-color: #F0F4F6;
    border: 2px #3D5A80 solid;
    margin-left: 10px;
    border-radius: 0 10px 10px 0;
    box-shadow: .35em .5em .5em rgba(41, 50, 65, 0.3);
}

.general-info-user {
    box-sizing: border-box;
    height: 174px;
    padding: 24px 0 40px 24px;
}

.general-info-avatar {
    display: inline-block;
    margin-right: 16px;
    height: 92px;
    position: relative;
}

.userHeaderImg {
    width: 92px;
    height: 92px;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 50%;
}

.avatar-hover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.general-info-avatar:hover .avatar-hover {
    display: flex;
}

.hover-img {
    content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFC0lEQVR4Xu2ba8ilUxTHf39J5H6NQiQSii80bjENNeEDmtw1Jb64jhqF1AwJZcow+EJqmnJLzIeZmkJoxMQXComkjCL3cckk+WvpOdM++33OOc9znufMeY9zVp0v77P22mv991prr7X3fsWUk6bcfmYAzDxgyhGYhcCUO8DOTYK2d6kCuKR/qvC1wTPSELB9CHAVcA5wGLBrRaX/Br4B3gKelfRdxXG12UYGgO3TgQeAvWtr1T3gN+BuSe82lFM6fCQA2D4eeBrYvSWltwPXS/q0JXk7xLQOgO3dwm2Bo1pW9kvgakl/tSl3FAAsA67JlHwKeB4Id65CETZXADdkzOskPVpFQFWeVgGwfXLh+qncjZJWVFUo5bN9H3BB8jcXofDhMPLKxrQGgO2I9+eAI5KJvgcuk1R15bt0tB2e8CJwcPJhK3ClpMgLjakyAIWBC4ATC4X2zGaPLS++pXSrpHeaaGn7TCB3+4+BfGv8AwjA49uWqgANBMD2PsB1wJKaWX29pPubGN8Za/se4OIassI7XgKekfRrv3F9AShi+mHggBqTB+u3wOWSYlUak+3wtheAQ2sK+wm4Q1LPnNETANvh7qtrVG8d3QL9myV9UFPZvuy2TwEer+mFITOqymWStlROgrYjka0D9soG/Qi8CnwBlK1uTPbRqErXorQ+qceihJccA5wPHJjp/TtwraRIoF1U6gG2HwHOzng3AKskhbB5S7Zj0ZYDF2VKbpZ0+0AAbEcmX5sxRjJ5ct5aXaKY7RuL5J1+XSopdokdNMcDbN8W7pLwfF64T7j3xJDt6DwjjI9NlJ5TSZYBEHX8ccmguyRF3E8c2Y588GCi+GeSoj3v6wGvA/smPIsl/dCG9cWqnAvE74SkwosC5hPgzfhJasXbbB8EbEp03yZpUU8AbIdHvJ8Zu6ANhWwvBCK8Dh8A5tdR+Ul6oynoBeD59neqpOgp/qOuECiOrN7LJj6tyRFVIfOWLK9UsS3id00Lc/e1Z2cAkCfVKsZ3eBq1v1UWdKQAFG4fpXROUVOsB+KQI+jootbP9+74FqXsUOEwVgCK+IuGJI35n4EVvTpE22cA9wL7J4hFTlgyTB4aNwDnAQ9lSz+wPS5AeCwbd6ek1+rETvCOG4BohRcnSm+QtLKKEbaDLw2HTZKiJa5F4wbgZeDIROM41a3UIRadX5wqd+grSZfWsn4eeMBmYI9E6UWStlUxwnYUYlGQdehPSXlzNlDUuD1g6gGY+hCY+iQ49dtg9OPTWwgVhUh0gNNZCnf2qJITpoHbV8Iw2c1QUo5ObzuceMI4DkTiSc54zwNSfx/Dkdj8AqBO8LfBO9ZSuA0DmsqoDUCRtN7O7t8WDnu/39SApuOL9wXpadJ2SWelcsvuBV7JHjlUbmObKtz2+JK2equkSwYBkNfwQz9xaduguvJsx/Hahcm4OQcrZR5QVsPH9XKExsSQ7XD1uN5Pac7RWhkAZTX8L8DKSQGhMD6O1fZLrC89XO11PR5XV6tKlnsjEDmi1/uAcXpI531AxHjq9h2dlkuKq7cu6vdCJMrXpeO0qMW510paUyavHwBRRd30PwAh3jo80euKrcorsQiHeP056FKzxQVrRVTE/Ooyt++7DZZNndXwnXeCbT2EbsVaIB5ndd4JVr5mH+gBvbSr+s8PbVk3SM6wt8hDAzBIoUn5PgNgUlZqVHrOPGBUyE6K3JkHTMpKjUrPfwGerYtf3LH0qAAAAABJRU5ErkJggg==');
    width: 45px;
    height: 45px;
}

.general-info-user-info {
    display: inline-block;
    vertical-align: top;
    height: 100%;
}

.profile-nickname-info {
    font-size: 1.5em;
}

.profile-blogsNumber-info {
    font-size: 1em;
    margin-top: 15px;
    margin-bottom: 15px;
}

.profile-joinTime-info {
    font-size: 0.75em;
}

.general-info-toPersonalMainPage {
    box-sizing: border-box;
    background-color: #D8E3E5;
    height: 44px;
    position: relative;
    border-radius: 0 0 10px 0;
}

.btn-toPersonalMainPage {
    background-color: #fc5531;
    display: flex;
    height: 28px;
    width: fit-content;
    border-radius: 20px;
    border: 1px solid #fc5531;
    padding: 0 2px 0 12px;
    box-shadow: .15em .25em .25em rgba(41, 50, 65, 0.3);

    position: absolute;
    top: 0;
    bottom: 0;
    left: 30px;
    margin: auto;

    color: #fff;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-size: 0.9em;
    line-height: 28px;
}

.btn-toPersonalMainPage:active {
    box-shadow: 0 0 0 rgba(41, 50, 65, 0.3);
    transform: translate(0.15em, .25em);
    transition: transform 0.15s, box-shadow 0.15s;
}

.el-icon-arrow-right {
    background: url('../../assets/rightArrow.svg');
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center;

    height: 28px;
    width: 28px;
}

.content {
    grid-row: 2/3;
    grid-column: 2/3;
    background-color: #F0F4F6;
    border: 2px #3D5A80 solid;
    border-radius: 0 10px 10px 10px;
    margin: 10px 0 auto 10px;
    box-shadow: .35em .5em .5em rgba(41, 50, 65, 0.3);
}

.promptBox {
    position: fixed;
    width: 380px;
    height: 48px;
    left: 0;
    right: 0;
    margin: auto;

    border: 2px #3D5A80 solid;
    border-radius: 5px;
    display: flex;
    align-items: center;
}

.notification-icon {
    width: 32px;
    height: 32px;
    margin-left: 6px;
}

.notification-msg {
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

.warningBox {
    grid-row: 1/-1;
    grid-column: 2/3;
    background-color: #F0F4F6;
    z-index: 30;
    margin-left: 10px;
    height: 90%;
    border: #3D5A80 2px solid;
    border-radius: 0 10px 10px 10px;
    box-shadow: .35em .5em .5em rgba(41, 50, 65, 0.3);
}

.warningBox article {
    padding: 32px;
}

.warningBox article h2 {
    font-size: 16px;
    font-weight: 600;
    color: #222226;
    line-height: 24px;
}

.warningBox article p {
    margin-top: 16px;
    font-size: 16px;
    font-weight: 400;
    color: #222226;
    line-height: 24px;
}

.warningBox .checkPlace {
    display: flex;
    width: fit-content;
    margin: auto;
}

.warningBox .checkPlace button {
    width: 188px;
    height: 40px;
    border-radius: 20px;
    border: none;
}

.warningBox .checkPlace .btn-cancel {
    border: 1px #EE6C4D solid;
    color: #EE6C4D;
    background-color: transparent;
}

.warningBox .checkPlace .btn-cancel:hover {
    background-color: #fff5f2;
}

.warningBox .checkPlace .btn-confirm {
    margin-left: 140px;
    background-color: #EE6C4D;
    color: #FFF;
}

.warningBox .checkPlace .btn-confirm:hover {
    background-color: #fc1944;
}

.checkBox {
    position: fixed;
    width: 380px;
    height: 48px;
    left: 0;
    right: 0;
    margin: auto;

    border: 2px #3D5A80 solid;
    border-radius: 5px;
    align-items: center;
    background-color: #D8E3E5;
    display: flex;

    transition: top 1s;
}

.check-msg {
    color: #fc5531;
    margin-left: 16px;
    flex-grow: 1;
}

.check-yes {
    margin-right: 20px;
    width: 50px;
    text-align: center;
    padding: 0 10px;
    border: 1px solid #fc5531;
    font-size: 14px;
    color: #fc5531;
    transition: background-color .3s ease-in, border-color .3s ease-in;
    line-height: 32px !important;
    height: 32px !important;
    border-radius: 30px;
    min-height: unset;
    background: transparent;
    font-weight: 500;
    cursor: pointer;
}

.check-yes:hover {
    background-color: #fc5531;
    color: #fff;
}

.check-no {
    margin-right: 20px;
    width: 50px;
    text-align: center;
    padding: 0 10px;
    border: 1px solid #fc5531;
    font-size: 14px;
    color: #fff;
    transition: background-color .3s ease-in, border-color .3s ease-in;
    line-height: 32px !important;
    height: 32px !important;
    border-radius: 30px;
    min-height: unset;
    background: #fc5531;
    font-weight: 500;
    cursor: pointer;
}

.check-no:hover {
    background-color: transparent;
    color: #fc5531;
}

.headChangeWindow {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
<script lang="ts" setup>
import router from '@/router/router';
import { defineAsyncComponent, getCurrentInstance, markRaw, onMounted, provide, reactive, ref } from 'vue';
import HeadImgChangeWindow from '../SideBar/HeadImgChangeWindow.vue';
import ButtonShake from '../Tools/ButtonShake';

const emit = defineEmits(['logWarn']);

let PersonalFolder = defineAsyncComponent(() => import('../PersonalCenter_content/PersonalFolder.vue'));
let AccountSettings = defineAsyncComponent(() => import('../PersonalCenter_content/AccountSettings.vue'));
let ArticalManagement = defineAsyncComponent(() => import('../PersonalCenter_content/ArticalManagement.vue'));
let BrowsingHistory = defineAsyncComponent(() => import('../PersonalCenter_content/BrowsingHistory.vue'));

//全局数据
const cns: any = getCurrentInstance();
const global = cns.appContext.config.globalProperties.$global;

const tabs = [markRaw(PersonalFolder), markRaw(AccountSettings), markRaw(ArticalManagement), markRaw(BrowsingHistory)];
let currentTab = ref(tabs[0]);

function changeCountent(event: Event) {
    const el: any = event.target;
    let name = el.getAttribute('name');

    switch (name) {
        case 'toPersonalFolder':
            currentTab.value = tabs[0];
            break;
        case 'toAccountSettings':
            currentTab.value = tabs[1];
            break;
        case 'toArticalManagement':
            currentTab.value = tabs[2];
            break;
        case 'toBrowsingHistory':
            currentTab.value = tabs[3];
    }
}

type responseData = {
    userName: string,
    nikeName: string,
    birthday: string,
    sex: string,
    totalBlogNumber: number,
    updateTime: string
}
let userData = reactive({  //本页面共享的一个用户数据，提供刷新
    userName: '',
    nikeName: '',
    birthday: '',
    sex: '',
    totalBlogNumber: 0,
    updateTime: ''
});

provide('userData', userData);

onMounted(async () => {  //这个正式搭载之后再激活
    // if (global.userId.value == '') {
    //     emit('logWarn');
    //     router.back();
    // } else {
    //     await getUserData();
    //     provide('userData', userData);
    // }
});

async function getUserData() {
    let jsonText = JSON.stringify({
        userID: global.userID.value
    });

    let jsonHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    let data = await fetch('...', {  //这里的路径还没写
        method: 'POST',
        body: jsonText,
        headers: jsonHeaders
    }).then((response) => response.json());
    setUserData(data);
}
function setUserData(data: responseData) {
    userData.userName = data.userName;
    userData.nikeName = data.nikeName;
    userData.sex = data.sex;
    userData.birthday = data.birthday;
    userData.totalBlogNumber = data.totalBlogNumber;
    userData.updateTime = data.updateTime;
}

let notificationMsg = ref('')
const promptBoxStyle = reactive({
    top: '-60px',
    // top: '100px',
    'background-color': '',

})
const iconStyle = reactive({
    background: ""
})
const msgStyle = reactive({
    color: ''
})
let moveClass = ref('');

const seccessStyle = {
    background: "url('../../assets/seccess.svg')",
    'background-color': '#F0F9EB',
    color: '#67C23A'
}
const failedStyle = {
    background: "url('../../assets/failed.svg')",
    'background-color': '#f2caca',
    color: '#cf4343'
}
function showPromptBox(state: boolean, msg: string) {  //可以把弹出做成一个动画
    if (state) { //弹出成功窗口
        promptBoxStyle['background-color'] = seccessStyle['background-color'];
        iconStyle.background = seccessStyle.background;
        msgStyle.color = seccessStyle.color;
    } else { //弹出失败窗口
        promptBoxStyle['background-color'] = failedStyle['background-color'];
        iconStyle.background = failedStyle.background;
        msgStyle.color = failedStyle.color;
    }
    notificationMsg.value = msg;
    moveClass.value = 'move';
}

function moveAnimationEnd() {
    moveClass.value = ''
}
// function test() {
//     console.log('hhh');
//     showPromptBox(false, '字段未修改');
// }

let warningBoxStyle = reactive({
    display: 'none'
});
function showWarning_unsubscribe() {
    warningBoxStyle.display = 'block';
}

async function unsubscribe() {
    warningBoxStyle.display = 'none';
    await deleteUser();
}
function unsubscribe_cancel() {
    warningBoxStyle.display = 'none';
}



type DeleteResponseData = {
    code: Number;
    msg: string;
}

async function deleteUser() {  //删除用户
    let obj = {
        userID: global.userID.value
    }
    let jsonData = JSON.stringify(obj);
    let jsonHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    let responseData: any = await fetch('', {
        method: 'POST',
        body: jsonData,
        headers: jsonHeaders
    }).then((response: Response) => response.json);
    checkBlogDeleteState(responseData);
}
function checkUserDeleteState(responseData: DeleteResponseData) {
    if (responseData.code === 200) {
        //导航到最开始的页面，清除历史记录
        global.userID.value = '';
        global.logState.vale = false;
        router.push('/');
    } else {
        showPromptBox(false, '注销失败');
        console.log(responseData.msg);
    }
}

let checkBoxStyle = reactive({
    top: '-60px'
});
let deleteBlogID = ref('');
function showCheckBox(blogID: string) {
    deleteBlogID.value = blogID;
    checkBoxStyle.top = '50px';
}
function closeCheckBox() {
    deleteBlogID.value = '';
    checkBoxStyle.top = '-60px';
}

function yesBtnClicked() {
    deleteBlog(deleteBlogID.value);
    closeCheckBox();
}
function noBtnClicked() {
    closeCheckBox();
}

async function deleteBlog(blogID: string) {
    let obj = {
        blogID: blogID
    }
    let jsonData = JSON.stringify(obj);
    let jsonHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    let responseData: any = await fetch('/send-me-json', {
        method: 'POST',
        body: jsonData,
        headers: jsonHeaders
    }).then((response: Response) => response.json);
    // let responseData: DeleteResponseData = {
    //     code: 200,
    //     msg: ''
    // }
    checkBlogDeleteState(responseData);
};

function checkBlogDeleteState(responseData: DeleteResponseData) {
    if (responseData.code === 200) {
        showPromptBox(true, '删除成功');
    } else {
        showPromptBox(false, '删除失败');
        console.log(responseData.msg);
    }
}

let headChangeWindow_showState = ref(false)

function showUserHanderChangeWindow() {
    headChangeWindow_showState.value = true;
}

function closeUserHanderChangeWindow() {
    headChangeWindow_showState.value = false;
}

function toUserInfoCenter(){
    router.push('/Home/UserInfoCenter');
}
</script>