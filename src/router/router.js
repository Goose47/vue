import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import Post from "@/pages/Post"
import PostPageStore from "@/pages/PostPageStore";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: Post
    },
    {
        path: '/posts_store',
        component: PostPageStore
    },
    {
        path: '/posts_capi',
        component: PostPageCompositionApi
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router