const userRoutes = [
    {
        path: '/register',
        name: 'register',
        // 异步惰性加载，不用打开应用就加载
        component: () => import('@/views/register/Register.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        meta: { auth: true },
        component: () => import('@/views/profile/Profile.vue'),
    },
];

export default userRoutes;
