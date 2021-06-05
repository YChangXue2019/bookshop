<template>
    <div class="login">
        <nav-bar-item :title="title"></nav-bar-item>
        <div class="login-box">
            <van-form @submit="onSubmit">
                <van-field
                  v-model="email"
                  name="邮箱"
                  label="邮箱"
                  placeholder="用户名"
                  :rules="[{ required: true, message: '请填写邮箱' }]"
                />
                <van-field
                  v-model="password"
                  type="password"
                  name="密码"
                  label="密码"
                  placeholder="密码"
                  :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                <div class="link-register" @click="linkRegister">没有账号？去注册</div>
                  <van-button style="background:#42b983;color:#fff" round block type="default" native-type="submit">登录</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem'
import {login} from 'network/user'
import {ref,reactive,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import { Toast,Notify } from 'vant';

    export default {
        name:'Login',
        components:{
            NavBarItem
        },
        setup(props) {
            let title="用户登录";
            let router=useRouter();
            const store=useStore();
            let userInfo = reactive({
                email:'',
                password:''
            });
            const onSubmit=()=>{
                login(userInfo).then(res=>{
                    console.log(res);
                    Toast.success('登录成功');
                    window.localStorage.setItem("token",res.access_token);
                    store.commit('setIsLogin', true);
                    setTimeout(() => {
                         router.push("/home");
                    }, 500);
                }).catch(err=>{

                })
            };
            const linkRegister=()=>{
                console.log(1);
                router.push('/register')
            }
            return{
                title,
                onSubmit,
                ...toRefs(userInfo),
                linkRegister
            }
        }
    }
</script>

<style lang="scss" scoped>
.login-box{
    padding: 0 30px;
    margin-top: 50%;
}
.link-register{
    margin-bottom:10px;
    font-size:12px;
    color:#42b983;
    text-align: left;
}
</style>