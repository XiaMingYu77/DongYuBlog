<template>
    <div>
        <div class="accountSettings-head">基本信息</div>
        <div class="accountSettings-content">
            <form>
                <ul>
                    <li>
                        <div class="content-show-l">密码</div>
                        <div class="content-show-r" v-show="mode_password[0]">修改密码</div>
                        <div class="edit-icon" v-show="mode_password[0]" name="edit_password" @click="startEdit">
                            <i name="edit_password"></i>
                            编辑
                        </div>
                        <div class="edit-password" v-show="mode_password[1]">
                            <input class="el-input" type="password" autocomplete="false" placeholder="请输入新密码（7-15位）"
                                v-model="password" @blur="passwordBlur"/>
                            <span :style="passwordStyle">{{passwordErrorMsg}}</span>
                            <input class="el-input" type="password" autocomplete="false" placeholder="请再次输入密码"
                                v-model="re_password" :disabled="rePasswordDisabled" @keyup="rePasswordKeyup" @blur="rePasswordBlur"/>
                            <span :style="rePasswordStyle">{{rePasswordErrorMsg}}</span>
                        </div>
                        <div class="edit-btn" v-show="mode_password[1]">
                            <button type="button" class="btn_submit" name="edit_password"
                                @click="endEdit($event),submitPassword">提交</button>
                            <button type="button" class="btn_cancel" name="edit_password"
                                @click="endEdit">取消</button>
                        </div>
                    </li>

                    <li>
                        <div class="content-show-l">账号注销</div>
                        <div class="edit-icon" @click="showWarning">
                            <i name="edit_password"></i>
                            立即注销
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>

<style scoped>
.accountSettings-head {
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    font-weight: 600;
    color: #2e2e2e;
    padding-left: 16px;
    border-bottom: 1px solid #3D5A80;
}
li {
    list-style: none;

    line-height: 24px;
    font-size: 14px;
    margin-bottom: 32px;
    display: flex;
    align-items: baseline;
}
.content-show-l {
    width: 56px;
    color: #555666;
    margin-right: 40px;
    flex-shrink: 0;
    padding-left: 16px;
    display: flex;
    box-sizing: content-box;
    justify-content: space-between;
}
.content-show-r {
    color: #222226;
    word-break: break-all;
}
li:hover .edit-icon {
    display: flex;
}
.edit-icon {
    display: none;

    margin-left: 24px;
    cursor: pointer;
    align-items: baseline;
    color: #1989fa;
    font-size: 14px;
    min-width: 50px;
}
.edit-icon i {
    display: inline-block;
    margin-right: 2px;
    width: 16px;
    height: 16px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACshmLzAAAB60lEQVRYCe1XP0vDUBC/q7GDOCi4WP8gOIqCH6BfwMVBEXXrqosIraurLYgOOomOBVerm6OjOPUjNE6CQxFs03e+S5vmvTQpSRqoQx6Ed+/evfvd/V5yvQKkY8wMoB9+rmIVgKhABJsANO1no+kQSa6vPkuTp5peWeSuaRlbnfVG0XhW1JBRFyznLlpVEuKeiPKhwL0OfNaLFdqAX+tdCFFbKtOqaqIxwJkzOAJ+YQaPZqYmXurH2FQPRJUZXJD1KhOaQ8QnycC2nJkxexiOYM+Sdp4ZXBo+NrTN6AsPeG12xdhVwdmjdgXdOwfgzKPD6Sd8wHfqe9jSrTwBOHeeMO2cuS84B6Mx4I0uzjps5o7vRAOICs5BJBZAHPDEAogLnkgAUcDny+1LfhjYGSNdQRTwHuCJnPnpj9gBnBNlBLVrvQo39FProxGh/I3Rqm/8ABAFELwhwt2w77wPHiDopTjAKEhtnmUPeM8MMgihj81ACN+hTNIAUgb+GwPd9mvtJkQjGuodd41cn3qLpzEgi8oHH/n+6Wy5R5ORHJ8OhuNVL0SID7JU5knQ7ULFsluzUbsjzpzB2acNyhjK0Ooy6+22HGBfsUlMlNlXzVL2UHU4EABvRv5jonockLFp0y4zN4uGlv2AaaoYBwN/reAFFzj+0usAAAAASUVORK5CYII=) no-repeat 50%;
    background-size: 16px 16px;
    position: relative;
    top: 3px;
    left: 0;
}
.edit-password{
    width: 360px;
}
.edit-password .el-input {
    background-color: #feffff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;

    margin-bottom: 5px;
}
.edit-password span{
    display: block;
    width: 100%;
    height: 30px;
    color: #fc5531;
    margin-left: 5px;
}


.edit-btn button {
    margin-left: 12px;
    padding: 7px 22px;
    border-radius: 20px;
    border: none;
}

.edit-btn .btn_submit {
    background-color: #EE6C4D;
    color: #FFF;
}

.edit-btn .btn_submit:hover {
    background-color: #fc1944;
}

.edit-btn .btn_cancel {
    border: 1px #EE6C4D solid;
    color: #EE6C4D;
    background-color: transparent;
}

.edit-btn .btn_cancel:hover {
    background-color: #fff5f2;
}
</style>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref } from 'vue';

const cns:any = getCurrentInstance();
const global = cns.appContext.config.globalProperties.$global;

//这个事件时让PersonalCenter来抛出提示框的
const emit = defineEmits(['showPromptBox','showWarning']);

const mode1 = [true, false];
const mode2 = [false, true];
const showModes = [mode1, mode2];

let mode_password = ref(showModes[0]);

function startEdit(event:Event){
    let e: any = event.target;
    let name = e.getAttribute('name');

    switch(name){
        case 'edit_password':
            mode_password.value = showModes[1];
            break;

    }
}
function endEdit(event:Event){
    let e: any = event.target;
    let name = e.getAttribute('name');

    switch(name){
        case 'edit_password':
            mode_password.value = showModes[0];
            break;
    }
    clearInput();
}
function clearInput(){
    //密码部分
    password.value = '';
    re_password.value = '';
    passwordStyle.display = 'none';
    rePasswordStyle.display = 'none';
}


//密码检测与提交部分
let passwordErrorMsg = ref('');
let rePasswordErrorMsg = ref('两次密码输入不一致');
const passwordStyle = reactive({
    display: 'none'
});
const rePasswordStyle = reactive({
    display: 'none'
});
let password = ref('');
let re_password = ref('');
let rePasswordDisabled = ref(true);

function passwordBlur(){
    let len = password.value.length; //7-15位
    if (len < 7){
        passwordErrorMsg.value = '密码过短'
        passwordStyle.display = 'block';
    }else if(len > 15){
        passwordErrorMsg.value = '密码过长'
        passwordStyle.display = 'block';
    }else{
        passwordStyle.display = 'none';
        rePasswordDisabled.value = false; //允许再输入框的输入
    }
}

function rePasswordKeyup(){
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
        rePasswordStyle.display = 'block';
    } else {
        rePasswordStyle.display = 'none';
    }
}

let permission = false;
function rePasswordBlur() {
    if (password.value !== re_password.value) {
        rePasswordStyle.display = 'block';
        permission = false;
    } else {
        rePasswordStyle.display = 'none';
        permission = true;
    }
}
async function submitPassword(){
    let obj = {
        password: password.value,
        userID: global.userID.value
    }
    let JsonData = JSON.stringify(obj);
    let jsonHeaders = new Headers({
        'Content-Type': 'application/json'
    });
    let data:any = await fetch('', {  //路径还没给出来
        method: 'POST',
        body: JsonData,
        headers: jsonHeaders
    }).then((resonse: Response) => resonse.json, () => console.log('ERROR!'));

    if(data.code = 200){
        emit('showPromptBox',[true, '修改成功']);
    }else{
        emit('showPromptBox',[false, data.msg]);
    }
}

function showWarning(){
    emit('showWarning');
}

</script>