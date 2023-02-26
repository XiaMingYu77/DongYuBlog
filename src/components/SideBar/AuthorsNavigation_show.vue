<script lang="ts">
import { h } from 'vue';
import { useRouter } from 'vue-router';

export default {
    props: ['authors'],
    setup: (props:any) => {
        const router = useRouter();
        type AuthorObject = {
            authorID: string;
            authorName: string,
            authorHeadPortrait: string
        }
        // let authors: AuthorObject[] = props.authors.value;
        let authors: AuthorObject[] = [
            {
                authorID: '1',
                authorName: '墨屿洺',
                authorHeadPortrait: '/userHeader.png'
            }
        ];
        function createLi() {
            let liNodes = [];
            for (const author of authors) {
                let v_node = h('li', {
                    onclick: () => {
                        console.log('hhh')
                        router.push(`/Home/UserInfoCenter/${author.authorID}`);      //此处路径没写全，要等主页部署完毕后再弄
                    },
                    class: 'author-skipBar'
                }, [
                    h('div', { class: 'authorInfo' }, [
                        h('img', { class: 'authorHeadPortrait', src: author.authorHeadPortrait }),
                        h('span', { class: 'authorName', innerText: author.authorName })
                    ])
                ]);
                liNodes.push(v_node);
            }
            return liNodes;
        };
        return () => h('ul', { class: 'authors-show-place' }, createLi());
    }
}
</script>

<style scoped>
.authors-show-place {
    height: 100%;
    overflow-y: scroll;
    list-style: none;
    padding: 0;
    margin: 0;
}
.authors-show-place::-webkit-scrollbar {
    width: 7px;
    height: 7px;
}

.authors-show-place::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 .5px rgba(0, 0, 0, 0.2);
    background: rgba(231, 182, 193);
}

.authors-show-place::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}
.author-skipBar {
    font-size: 12px;
    font-weight: 400px;
    line-height: 21px;
    height: 80px;
    padding: 10px;
    position: relative;
    border-radius: 8px;
    margin-bottom: 5px;
    box-shadow: .1em .2em .15em rgba(0, 0, 0, 0.3);
    margin-right: 2px;
    transition: box-shadow .1s, transform .1s;
}

.author-skipBar:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.author-skipBar:active {
    box-shadow: 0 0 .15em rgba(0, 0, 0, 0.2);
    transform: translate(.1em, .2em);
}

.authorInfo{
    display: flex;
    align-items: center;
}
.authorName{
    margin-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    color: #292a38;
    font-size: 14px;
    font-weight: 600;
}

.authorHeadPortrait {
    height: 50px;
    width: 50px;
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: 50%;
    display: inline-block;
}
</style>