import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/index.vue'
import LOGIN from '../views/login/index.vue'
import Brand from '../views/brand/index.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Home,
        redirect:"/index",
        children: [

            {
                path: 'index',
                name: 'Index',
                component: () => import(/* webpackChunkName: "about" */ '../views/index/index.vue')
            },
            {
                path: 'brand',
                name: 'Brand',
                component: Brand
            },
            {
                path: 'category',
                name: 'Category',
                component: () => import(/* webpackChunkName: "about" */ '../views/category/index.vue')
            },
            {
                path: 'good',
                name: 'Good',
                component: () => import(/* webpackChunkName: "about" */ '../views/good/index.vue')
            },

            {
                path: 'dept',
                name: 'dept',
                component: () => import(/* webpackChunkName: "about" */ '../views/dept/index.vue')
            },
            {
                path: 'admin',
                name: 'dept',
                component: () => import(/* webpackChunkName: "about" */ '../views/admin/index.vue')
            },

            {
                path: 'role',
                name: 'Role',
                component: () => import(/* webpackChunkName: "about" */ '../views/role/index.vue')
            },

            {
                path: 'menu',
                name: 'menu',
                component: () => import(/* webpackChunkName: "about" */ '../views/menu/index.vue')
            },


        ]
    },

    {
        path: '/login',
        name: 'Login',
        component: LOGIN
    },


    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
