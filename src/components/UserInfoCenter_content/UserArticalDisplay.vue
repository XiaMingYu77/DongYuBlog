<template>
    <div class="articalDisplay-fullPage">
        <BlogsNavigation_show :blogs="blogs" v-if="hasBlogs"></BlogsNavigation_show>
        <div class="noBlogs-show" v-if="!hasBlogs">555没有相关博客</div>
    </div>
</template>

<style scoped>
.articalDisplay-fullPage{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    position: relative;
}
.articalDisplay-fullPage::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

.articalDisplay-fullPage::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 .5px rgba(0, 0, 0, 0.2);
    background: #E7B6C1;
}

.articalDisplay-fullPage::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}

.noBlogs-show{
    position: absolute;
    top: 0;
    bottom: 100px;
    left: 0;
    right: 0;
    margin: auto;
    height: fit-content;
    width: fit-content;
    padding: 30px 50px;
    border-radius: 10px;
    background-color: rgba(237, 199, 208, 0.4);
    border-right: 2px solid #E7B6C1;
    border-bottom: 2px solid #E7B6C1;
    box-shadow: .1em .2em .1em rgba(215, 170, 179, 0.7);
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BlogsNavigation_show from '../SideBar/BlogsNavigation_show.vue';

const props = defineProps(['blogs']);
let blogs = ref();
let hasBlogs = ref(false);

onMounted(()=>{  //注意要保证有内容时才加载
    blogs.value = props.blogs;
    if(blogs.value.length !== 0) hasBlogs.value = true;
    else hasBlogs.value = false;
});

</script>