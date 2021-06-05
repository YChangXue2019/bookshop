<template>
    <div class="Profile">
        <nav-bar-item :title="title"></nav-bar-item>
        <div class="profile-box">
            <div class="profile-title-info">
                <div class="profile-logo">
                    <img :src="user.avatar_url"/>
                </div>
                <div class="profile-info-item">
                    <p><span>昵称：</span>{{user.name}}</p>
                    <p><span>登录名：</span>{{user.email}}</p>
                    <p><span>个性签名：人生除了生死，其余的都是擦伤</span></p>
                </div>
            </div>
            <div class="profile-body-info">
                <ul>
                    <li @click="goTo('/collect')">我的收藏<span><van-icon name="arrow"/></span></li>
                    <li @click="goTo('/myorder')">我的订单<span><van-icon name="arrow"/></span></li>
                    <li @click="goTo('/setting')">账号管理<span><van-icon name="arrow"/></span></li>
                    <li @click="goTo('/adderss')">地址管理<span><van-icon name="arrow"/></span></li>
                    <li @click="goTo('/about')">关于我们<span><van-icon name="arrow"/></span></li>
                </ul>
            </div>
        </div>
        <div class="btn">
            <van-button @click="logoutClick" round block type="primary">退出</van-button>
        </div>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem'
import {logout} from 'network/user'
import {ref,reactive,onMounted,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {getUser} from 'network/user'
import { Toast,Notify } from 'vant';
    export default {
        name:'Profile',
        components:{
            NavBarItem
        },
        setup(){
            let title="个人中心";
            let state=reactive({
                user:{}
            });
            const router=useRouter();
            const store=useStore();
            onMounted(()=>{
                getUser().then(res=>{
                    state.user=res;
                    console.log(res);

                })
            });
            const logoutClick=()=>{
                logout().then(res=>{
                    if(res.status==204){
                        // console.log(res);
                        Toast.success("退出成功");
                        window.localStorage.removeItem("token");
                        store.commit('setIsLogin', false);
                        setTimeout(() => {
                             router.push("/login");
                        }, 500);
                    }else{
                        Toast.fail("退出失败");
                    }
                    
                }).catch(err=>{
                    console.log(err);
                })
            };
            // 跳转方法
            const goTo=(path,query)=>{
                router.push({path,query:query||{}})
            };
            return{
                title,
                logoutClick,
                ...toRefs(state),
                goTo,
                
            }
        }
    }
</script>

<style lang="scss" scoped>
.profile-box{
    padding:5px 15px;
    .profile-title-info{
        display: flex;
        width:100%;
        height: 100px;
        margin-top: 45px;
        margin-bottom: 20px;
        border-radius: 5px;
        background: #42bBaa;
        .profile-logo{
            width:80px;
            height: 80px;
            // background: peru;
            text-align: center;
            img{
                width: 100%;
                height: auto;
                margin-top: 10px;
                margin-left: 5px;
            }
        }
        .profile-info-item{
            flex: 1;
            margin-left: 15px;
            padding: 10px 0;
            p{
                color: #ffffff;
                font-size: 12px;
                line-height: 20px;
            }
        }
    }
    .profile-body-info{
        ul li{
            width: 100%;
            height: 40px;
            margin-bottom: 10px;
            line-height: 40px;
            font-size: 12px;
            // background: cornflowerblue;
            span{
                float:right;
            }
        }
    }

}
.btn{
    padding: 0 15px;
}
</style>