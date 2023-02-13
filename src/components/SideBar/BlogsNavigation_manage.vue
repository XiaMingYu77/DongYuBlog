<script lang="ts">
import router from '@/router/router';
import ButtonShake from '../Tools/ButtonShake';
import { h, watch } from 'vue';

export default {
    props: ['blogs'],
    emits:['showPromptBox', 'showCheckBox'],
    setup(props:any, context:any) {
        type BlogObject = {
            blogID: string,
            blogTitle: string,
            blogBrief: string,
            authorName: string,
            authorHeadPortrait: string
        };
        function showCheckBox(blogID:string){
            //在这里做确认
            context.emit('showCheckBox', blogID);
        }


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
        }
        ] //测试数据


        function createLi() {
            let liNodes = [];
            for (const blog of blogs) {
                let timmer:any = null
                let v_node = h('li', {
                    onclick: () => {
                        clearTimeout(timmer);
                        timmer = setTimeout(()=>{
                            router.push(`/Home/BlogPage/1`);      //此处路径没写全，要等主页部署完毕后再弄
                        }, 300);
                    },
                    class: 'blog-skipBar'
                }, [
                    h('h2', { class: 'blog-Title', innerText: blog.blogTitle }),
                    h('div', { class: 'blog-brief', innerText: blog.blogBrief }),
                    h('div', { class: 'blog-author' }, [
                        h('img', { class: 'authorHeadPortrait', src: blog.authorHeadPortrait }),
                        h('span', { class: 'authorName', innerText: blog.authorName })
                    ]),
                    h('button', {
                        class: 'delete-btn', onclick: ButtonShake((event: Event) => {
                            event.stopPropagation(); //阻止点击事件冒泡到外面
                            showCheckBox(blog.blogID);
                        })
                    })
                ]);
                liNodes.push(v_node);
            }
            return [liNodes]
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
    font-weight: 400px;
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
    margin: 0 0 10px 0;
}

.blog-brief {
    display: -webkit-box;
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
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 8px;

    background: url('../../assets/garbageCan.svg');
    background-size: 30px 30px;
    background-position: center;
    background-repeat: no-repeat;
}
.delete-btn:hover {
    background-color: #bfc9cb;
}
</style>