<template>
    <div>
        <div class="articalMm-head">内容管理</div>
        <div class="articalMm-content">
            <component :is="currentTab" @showPromptBox="showPromptBox" @showCheckBox="showCheckBox"
                @showSubmitBox_change="showSubmitBox_change"></component>
        </div>
    </div>
</template>

<style scoped>
.articalMm-head {
    height: 48px;
    line-height: 48px;
    font-size: 18px;
    font-weight: 600;
    color: #2e2e2e;
    padding-left: 16px;
    border-bottom: 1px solid #3D5A80;
}

.articalMm-content {
    height: 60vh;
}
</style>

<script lang="ts" setup>
import { getCurrentInstance, markRaw, reactive, ref } from 'vue';
import BlogManageBox from '../SideBar/BlogManageBox.vue';
import BlogSubmitBox from '../SideBar/BlogSubmitBox.vue';

const tabs = [markRaw(BlogManageBox), markRaw(BlogSubmitBox)];
let currentTab = ref(tabs[0]);

const emit = defineEmits(['showPromptBox', 'showCheckBox']);

function showPromptBox(state: boolean, msg: string) {
    emit('showPromptBox', state, msg);
}
function showCheckBox(ID: string) {
    emit('showCheckBox', ID);
}
function showSubmitBox_change(method: boolean) { //true表示要打开，false表示要关闭
    if(method) currentTab.value = tabs[1];
    else currentTab.value = tabs[0];
}
</script>