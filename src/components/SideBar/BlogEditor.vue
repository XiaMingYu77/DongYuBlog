<template>
    <div class="blogEditor-page">
        <div class="border">
            <MdEditor1 v-model="state.text" :code-theme="state.theme" :page-full-screen="state.pageFullScreen"
                :toolbars="toolbars" @click.stop="" editorId='md-editor-v3-2' @save="saveEdit" />
        </div>
    </div>
    <div class="msg-show" v-if="showmsg">{{ message }}</div>
</template>

<style scoped>
.blogEditor-page {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: auto;
    width: 148vh;
    z-index: 10;
    margin: 1em 0 1em 0;
    transition: all 0.5s ease-in-out;
    /* background-color: #3D5A80; */
}

.border {
    position: relative;
    width: 100%;
    height: 100%;
}

.blogEditor-page .md-fullscreen {
    position: absolute;
    border-radius: 8px;
}

.msg-show {
    position: absolute;
    z-index: 100;
    width: 150px;
    height: 50px;
    border-radius: 20px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    left: 0;
    right: 0;
    top: 20px;
    margin: auto;
    background-color: #00000073;
}
</style>

<script setup lang="ts">
import MdEditor1 from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { inject, onMounted, reactive, ref } from 'vue';

const emit = defineEmits(['saveBlogEdit']);

let toolbars:any = [
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'preview',
  'htmlPreview',
  'catalog',
];
MdEditor1.config({
    editorConfig: {
        languageUserDefined: {
            'my-lang': {
                toolbarTips: {
                    bold: '加粗',
                    underline: '下划线',
                    italic: '斜体',
                    strikeThrough: '删除线',
                    title: '标题',
                    sub: '下标',
                    sup: '上标',
                    quote: '引用',
                    unorderedList: '无序列表',
                    orderedList: '有序列表',
                    codeRow: '行内代码',
                    code: '块级代码',
                    link: '链接',
                    image: '图片',
                    table: '表格',
                    mermaid: 'mermaid图',
                    katex: '公式',
                    revoke: '后退',
                    next: '前进',
                    save: '保存',
                    prettier: '美化',
                    pageFullscreen: '浏览器全屏',
                    fullscreen: '屏幕全屏',
                    preview: '预览',
                    htmlPreview: 'html代码预览',
                    catalog: '目录',
                    github: '源码地址'
                },
                titleItem: {
                    h1: '一级标题',
                    h2: '二级标题',
                    h3: '三级标题',
                    h4: '四级标题',
                    h5: '五级标题',
                    h6: '六级标题'
                },
                imgTitleItem: {
                    link: '添加链接',
                    upload: '上传图片',
                    clip2upload: '裁剪上传'
                },
                linkModalTips: {
                    title: '添加',
                    descLable: '链接描述：',
                    descLablePlaceHolder: '请输入描述...',
                    urlLable: '链接地址：',
                    UrlLablePlaceHolder: '请输入链接...',
                    buttonOK: '确定'
                },
                clipModalTips: {
                    title: '裁剪图片上传',
                    buttonUpload: '上传'
                },
                copyCode: {
                    text: '复制代码',
                    successTips: '已复制！',
                    failTips: '复制失败！'
                },
                mermaid: {
                    flow: '流程图',
                    sequence: '时序图',
                    gantt: '甘特图',
                    class: '类图',
                    state: '状态图',
                    pie: '饼图',
                    relationship: '关系图',
                    journey: '旅程图'
                },
                katex: {
                    inline: '行内公式',
                    block: '块级公式'
                },
                footer: {
                    markdownTotal: '字数',
                    scrollAuto: '同步滚动'
                }
            }
        }
    }
});

let state = reactive({
    text: '',
    theme: 'dark',
    language: 'my-lang',
    previewOnly: false,
    pageFullScreen: true
});

onMounted(() => {
    prepare();
})

function prepare() {
    let textMsg: any = inject('markDownState');
    setTimeout(() => {
        state.text = textMsg().text;
    }, 100)
}

function saveEdit(text: string) { //还要执行文件的上传
    emit('saveBlogEdit', text);
    uploadBlogChange();
    showSave();
}

async function uploadBlogChange() { //现在先不写，blogID从路由获取

}

let showmsg = ref(false);
let message = ref('保存成功');
function showSave() {
    message.value = '保存成功'
    showmsg.value = true;
    setTimeout(() => {
        showmsg.value = false;
    }, 1500);
}
</script>