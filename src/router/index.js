import { createRouter, createWebHistory } from 'vue-router'
import { Toast, Notify } from 'vant';
import store from '../store';


const Home = () =>
    import ('views/home/Home');
const Category = () =>
    import ('views/category/Category');
const ShopCart = () =>
    import ('views/shopcart/ShopCart');
const Profile = () =>
    import ('views/profile/Profile');
const Detail = () =>
    import ('views/detail/Detail');
const Register = () =>
    import ('views/profile/Register');
const Login = () =>
    import ('views/profile/Login');
const Collect = () =>
    import ('views/profile/Collect');
const Setting = () =>
    import ('views/profile/Setting');
const About = () =>
    import ('views/profile/About');
const Adderss = () =>
    import ('views/profile/Adderss');
const AdderssEdit = () =>
    import ('views/profile/AdderssEdit');
const CreateOrder = () =>
    import ('views/order/CreateOrder');
const PayOrder = () =>
    import ('views/order/PayOrder');
const routes = [{
    path: "",
    redirect: '/home',
    meta: {
        title: '图书兄弟'
    }
}, {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
        title: '图书兄弟'
    }
}, {
    path: "/category",
    name: "Category",
    component: Category,
    meta: {
        title: '图书兄弟-图书分类'
    }
}, {
    path: "/shopcart",
    name: "Shopcart",
    component: ShopCart,
    meta: {
        title: '图书兄弟-购物车',
        isAuthRequired: true,
    }
}, {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
        title: '图书兄弟-个人中心',
        isAuthRequired: true
    }
}, {
    path: "/detail",
    name: "Detail",
    component: Detail,
    meta: {
        title: '图书兄弟-图书详情'
    }
}, {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
        title: '图书兄弟-用户注册'
    }
}, {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
        title: '图书兄弟-用户登录'
    }
}, {
    path: "/myorder",
    name: "CreateOrder",
    component: CreateOrder,
    meta: {
        title: '图书兄弟-我的订单',
        isAuthRequired: true
    }
}, {
    path: "/about",
    name: "About",
    component: About,
    meta: {
        title: '图书兄弟-关于我们',
        isAuthRequired: true
    }
}, {
    path: "/adderss",
    name: "Adderss",
    component: Adderss,
    meta: {
        title: '图书兄弟-地址管理',
        isAuthRequired: true
    }
}, {
    path: "/collect",
    name: "Collect",
    component: Collect,
    meta: {
        title: '图书兄弟-我的收藏',
        isAuthRequired: true
    }
}, {
    path: "/setting",
    name: "Setting",
    component: Setting,
    meta: {
        title: '图书兄弟-账户管理',
        isAuthRequired: true
    }
}, {
    path: "/addressedit",
    name: "AdderssEdit",
    component: AdderssEdit,
    meta: {
        title: '图书兄弟-编辑地址',
        isAuthRequired: true
    }
}, {
    path: "/payorder",
    name: "PayOrder",
    component: PayOrder,
    meta: {
        title: '图书兄弟-订单支付',
        isAuthRequired: true
    }
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    // 需要登录授权但是尚未登录的
    if (to.meta.isAuthRequired && store.state.user.isLogin == false) {
        Toast.fail("请先登录");
        // Notify("请先登录");
        return next("/login");
    } else {
        next();
    }

    document.title = to.meta.title
});

export default router