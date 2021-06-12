// movie首页相关路由
export default {
    path: '/movie',
    component: () => import('views/movie/Movie'),
    children: [
        {
            path: '',
            redirect: 'hotshow'
        },
        {
            path: 'hotshow',
            component: () => import('views/movie/HotShow')
        },
        {
            path: 'theshow',
            component: () => import('views/movie/TheShow')
        }
    ]
}