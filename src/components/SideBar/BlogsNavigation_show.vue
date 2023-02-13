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
            blogID: 'First',
            blogTitle: '这个是测试题目1',
            blogBrief: '我们用测试数据就别讲究那么多了\n hhh \ngg\na\nb\nc',
            authorName: '墨屿洺egabgiauhgsg',
            authorHeadPortrait: '/userHeader.png'
        }, {
            blogID: 'Second',
            blogTitle: '测试题目2',
            blogBrief: '捏0036E8F2.png',
            authorName: 'hhh',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Second',
            blogTitle: '测试题目3',
            blogBrief: '捏0036E8F2.png',
            authorName: 'hhh',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Second',
            blogTitle: '测试题目4',
            blogBrief: '捏0036E8F2.png',
            authorName: 'hhh',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Second',
            blogTitle: '测试题目5',
            blogBrief: '捏0036E8F2.png',
            authorName: 'hhh',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Second',
            blogTitle: '测试题目6',
            blogBrief: '捏0036E8F2.png',
            authorName: 'hhh',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Second',
            blogTitle: '测试题目7',
            blogBrief: '捏0036E8F2.png',
            authorName: 'hhh',
            authorHeadPortrait: '/userHeader.png'
        },
        {
            blogID: 'Second',
            blogTitle: '测试题目8',
            blogBrief: '捏0036E8F2.png',
            authorName: 'hhh',
            authorHeadPortrait: '/userHeader.png'
        }
        ] //测试数据


        function createLi() {
            let liNodes = [];
            for (const blog of blogs) {
                let timmer:any = null;
                let v_node = h('li', {
                    onclick: () => {
                        clearTimeout(timmer);
                        timmer = setTimeout(()=>{
                            router.push(`/Home/BlogPage/1`);
                        },300);
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