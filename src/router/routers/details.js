
// 配置详情页路由

export default {
    path: '/details/:filmid',
    name: 'details',
    component: () => import('views/details/Details')
}