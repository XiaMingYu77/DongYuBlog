import {createRouter, createWebHashHistory} from "vue-router";
import MainPage from "@/components/Page/MainPage.vue";
import BlogsCenterPage from "@/components/Page/BlogsCenterPage.vue";


const routes: Array<any> = [
    {
        path:'/',
        redirect:'/Home/'
    },
    {
        path:"/Home",
        name:"MainPage",
        component: MainPage,
        redirect:'/Home/BlogsCenter',
        children: [
            {
                path:'BlogsCenter',
                name:'BlogsCenter',
                component: BlogsCenterPage,
            },
            {
                path:'BlogPage/:blogID',
                name:'BlogPage',
                component: ()=>import("@/components/Page/BlogPage.vue")
            },
            {
                path:'UserInfoCenter',
                name:'UserInfoCenter',
                component: ()=>import("@/components/Page/UserInfoCenter.vue")
            }
        ]
    },
    {
        path:"/LogIn",
        name:"LogInPage",
        component: ()=>import("@/components/Page/LogInPage.vue")
    },
    {
        path:"/PersonalCenter",
        name:"PersonalCenter",
        component: ()=>import("@/components/Page/PersonalCenter.vue")
    },
    {
        path:"/Blog"
    }
];


const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export default router;