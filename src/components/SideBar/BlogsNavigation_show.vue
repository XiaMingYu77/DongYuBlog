<script lang="ts">
import router from '@/router/router';
import ButtonShake from '../Tools/ButtonShake';

import { h } from 'vue';
type RequestData = {
    code: Number;
    msg: string;
}

export default {
    props: ['blogs'],
    setup(props: any) {
        type BlogObject = {
            blogID: string,
            blogTitle: string,
            blogBrief: string,
            authorName: string,
            authorHeadPortrait: string
        };

        // let blogs: BlogObject[] = props.blogs;
        let blogs: BlogObject[] = [{
            blogID: 'Git 版本控制的使用.md',
            blogTitle: 'Git 版本控制的使用',
            blogBrief: '详细简述git相关操作，以及工作中可能需要处理的分支问题',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Vue.js.md',
            blogTitle: 'Vue.js',
            blogBrief: 'Vue3的使用',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: '算法.md',
            blogTitle: '算法',
            blogBrief: '一些基础算法',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Typora-PicGo-GitHub实现图片自动上传的方法.md',
            blogTitle: 'Typora-PicGo-GitHub实现图片自动上传的方法',
            blogBrief: '利用github搭建图床，picgo脚本上传',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Node.js —— 用Js来搭建后端.md',
            blogTitle: 'Node.js —— 用Js来搭建后端',
            blogBrief: 'nodejs的基础使用',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: '屿家笔记库—SQL语法.md',
            blogTitle: '屿家笔记库—SQL语法',
            blogBrief: '基础数据库操作语法',
            authorName: '墨屿洺',
            authorHeadPortrait: '/userHeader.png'
        },
        ] //测试数据


        function createLi() {
            let liNodes = [];
            for (const blog of blogs) {
                let timmer: any = null;
                let v_node = h('li', {
                    onclick: () => {
                        clearTimeout(timmer);
                        timmer = setTimeout(() => {
                            router.push(`/Home/BlogPage/${blog.blogID}`);
                        }, 300);
                    },
                    class: 'blog-skipBar'
                }, [
                    h('h2', { class: 'blog-Title', innerText: blog.blogTitle }),
                    h('div', { class: 'blog-brief', innerText: blog.blogBrief }),
                    h('div', { class: 'blog-author' }, [
                        h('img', { class: 'authorHeadPortrait', src: blog.authorHeadPortrait }),
                        h('span', { class: 'authorName', innerText: blog.authorName })
                    ])
                ]);
                liNodes.push(v_node);
            }
            return liNodes
        }
        return () => h('ul', { class: 'blogs-show-place' }, createLi());
    }
}
</script>

<style scoped>
.blogs-show-place {
    list-style: none;
    padding: 0;
    margin: 0;
}

.blog-skipBar {
    font-size: 12px;
    font-weight: 400;
    line-height: 21px;
    height: 137px;
    width: 100%;
    padding: 10px;
    border-bottom: 3px solid #D8E3E5;
    position: relative;
    border-radius: 8px;
    /* background-color: gray; */
}

.blog-skipBar:hover {
    background-color: rgba(101, 197, 214, 0.1);
}

.blog-Title {
    color: #1a1a1c;
    font-weight: 500;
    margin: 0 0 10px 0;
}

.blog-brief {
    display: -webkit-box;
    color: #242429;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    width: 75%;
    height: 63px;
}

.blog-author {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    width: 180px;
    display: flex;
}

.authorHeadPortrait {
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 50%;
    display: inline-block;
}

.authorName::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    height: 100%;
}

.authorName {
    width: 90px;
    margin-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

.delete-btn {
    position: absolute;
    right: 20px;
    bottom: 10px;
    padding: 10px;
}
</style>