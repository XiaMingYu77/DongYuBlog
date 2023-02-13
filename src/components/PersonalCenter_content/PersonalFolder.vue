<template>
    <div>
        <div class="personalInfo-head">基本信息</div>
        <div class="personalInfo-content">
            <form>
                <ul>
                    <li>
                        <div class="content-show-l">用户昵称</div>
                        <div class="content-show-r" v-show="mode_nickname[0]">{{nickname}}</div>
                        <div class="edit-icon" v-show="mode_nickname[0]" name="edit_nickname" @click="startEdit">
                            <i name="edit_nickname"></i>
                            编辑
                        </div>
                        <div class="edit-nickname" v-show="mode_nickname[1]">
                            <input class="el-input" type="text" autocomplete="false" placeholder="请输入昵称"
                                v-model="nickname" />
                        </div>
                        <div class="edit-btn" v-show="mode_nickname[1]">
                            <button type="button" class="btn_submit" name="edit_nickname"
                                @click="endEdit($event),submitClick($event)">提交</button>
                            <button type="button" class="btn_cancel" name="edit_nickname"
                                @click="endEdit($event),cancelClick($event)">取消</button>
                        </div>
                    </li>

                    <li>
                        <div class="content-show-l">
                            <span>用</span><span>户</span><span>名</span>
                        </div>
                        <div class="content-show-r">{{userName}}</div>
                    </li>

                    <li>
                        <div class="content-show-l">
                            <span>性</span><span>别</span>
                        </div>
                        <div class="content-show-r" v-show="mode_sex[0]">{{sex}}</div>
                        <div class="edit-icon" v-show="mode_sex[0]" name="edit_sex" @click="startEdit">
                            <i name="edit_sex"></i>
                            编辑
                        </div>
                        <div class="edit-sex" v-show="mode_sex[1]">
                            <label class="sex-select-man"><input name="usersex_select" type="radio" value="男"
                                    v-model="sex" />男</label>
                            <label class="sex-select-woman"><input name="usersex_select" type="radio" value="女"
                                    v-model="sex" />女</label>
                        </div>
                        <div class="edit-btn" v-show="mode_sex[1]">
                            <button type="button" class="btn_submit" name="edit_sex"
                                @click="endEdit($event),submitClick($event)">提交</button>
                            <button type="button" class="btn_cancel" name="edit_sex"
                                @click="endEdit($event),cancelClick($event)">取消</button>
                        </div>
                    </li>

                    <li>
                        <div class="content-show-l">出生日期</div>
                        <div class="content-show-r" v-show="mode_birthday[0]">{{birthday}}</div>
                        <div class="edit-icon" v-show="mode_birthday[0]" name="edit_birthday" @click="startEdit">
                            <i name="edit_birthday"></i>
                            编辑
                        </div>
                        <div class="edit-birthday" v-show="mode_birthday[1]">
                            <input type="date" class="el-input" :max="dateNow" min="1920-01-01" v-model="birthday" />
                        </div>
                        <div class="edit-btn" v-show="mode_birthday[1]">
                            <button type="button" class="btn_submit" name="edit_birthday"
                                @click="endEdit($event),submitClick($event)">提交</button>
                            <button type="button" class="btn_cancel" name="edit_birthday"
                                @click="endEdit($event),cancelClick($event)">取消</button>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    </div>
</template>

<style scoped>
.personalInfo-head {
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

.edit-nickname,
.edit-birthday {
    width: 360px;
}

.personalInfo-content .el-input {
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

.edit-sex label {
    margin-right: 24px;
    color: #606266;
    vertical-align: baseline;
}

.edit-sex .sex-select-man {
    margin-right: 40px;
}

.edit-sex label input {
    margin-right: 5px;
    vertical-align: -2px;
    /* 向文字对齐 */

}
</style>

<script setup lang="ts">
import { getCurrentInstance, inject, onMounted, ref } from 'vue';
const cns: any = getCurrentInstance();
const global = cns.appContext.config.globalProperties.$global;

type userData = {
    userName: string,
    nikeName: string,
    birthday: string,
    sex: string,
}

let userName = ref('');
let nickname = ref('');
let sex = ref('');
let birthday = ref('');

let data: any = inject('userData');

let dateNow = ref('');
onMounted(() => {
    getDateNow();
    // setData(data);
})
function getDateNow() {
    let d = new Date();
    dateNow.value = d.toLocaleDateString().replace(/\//g, '-');
}
function setData(data: userData) {
    userName.value = data.userName;
    nickname.value = data.nikeName;
    sex.value = data.sex;
    birthday.value = data.birthday;
}

const mode1 = [true, false];
const mode2 = [false, true];
const showModes = [mode1, mode2];

let mode_nickname = ref(showModes[0]);
let mode_sex = ref(showModes[0]);
let mode_birthday = ref(showModes[0]);

const previousDatas = {
    nickname: '',
    sex: '',
    birthday: ''
}
function startEdit(event: Event) {
    let e: any = event.target;
    let name = e.getAttribute('name');

    switch (name) {
        case 'edit_nickname':
            previousDatas.nickname = nickname.value;
            mode_nickname.value = showModes[1];
            break;
        case 'edit_sex':
            previousDatas.sex = sex.value;
            mode_sex.value = showModes[1];
            break;
        case 'edit_birthday':
            previousDatas.birthday = birthday.value;
            mode_birthday.value = showModes[1];
            break;
    }
}
function endEdit(event: Event) {
    let e: any = event.target;
    let name = e.getAttribute('name');

    console.log(name)
    switch (name) {
        case 'edit_nickname':
            mode_nickname.value = showModes[0];
            break;
        case 'edit_sex':
            mode_sex.value = showModes[0];
            break;
        case 'edit_birthday':
            mode_birthday.value = showModes[0];
            break;
    }
}

function cancelClick(event: Event) {
    let e: any = event.target;
    let name = e.getAttribute('name');

    console.log(name);
    switch (name) {
        case 'edit_nickname':
            nickname.value = previousDatas.nickname;
            break;
        case 'edit_sex':
            sex.value = previousDatas.sex;
            break;
        case 'edit_birthday':
            birthday.value = previousDatas.birthday;
            break;
    }
}

function submitClick(event: Event) {
    let e: any = event.target;
    let name = e.getAttribute('name');

    console.log(name)
    switch (name) {
        case 'edit_nickname':
            let obj1 = {
                nickname: nickname.value,
                userID: global.userID.value
            }
            submit(obj1);
            break;
        case 'edit_sex':
            let obj2 = {
                sex: sex.value,
                userID: global.userID.value
            }
            submit(obj2);
            break;
        case 'edit_birthday':
            let obj3 = {
                birthday: birthday.value,
                userID: global.userID.value
            }
            submit(obj3);
            break;
    }
}

//这个事件时让PersonalCenter来抛出提示框的
const emit = defineEmits(['showPromptBox']);

async function submit(obj: Object) {
    let path = ''

    let JsonData = JSON.stringify(obj);
    let jsonHeaders = new Headers({
        'Content-Type': 'application/json'
    });

    let data:any = await fetch(path, {
        method: 'POST',
        body: JsonData,
        headers: jsonHeaders
    }).then((resonse: Response) => resonse.json, () => console.log('ERROR!'));

    //根据data中的字段判断是否成功
    if (data.code === 200) {
        //修改成功
        emit('showPromptBox', true, '修改成功'); //这里之后从服务端拿信息
    } else {
        //修改失败
        emit('showPromptBox', false, '修改失败');
    }
}



//未填写灰色在获取信息部分来实现，如果没有相关内容就填入未填写，并将字体颜色变成灰色

</script>