<template>
    <div class="register">
        <nav-bar-item :title="title"></nav-bar-item>
        <div class="register-box">
            <van-form @submit="onSubmit">
             <van-field
               v-model="name"
               name="用户名"
               label="用户名"
               placeholder="用户名"
               :rules="[{ required: true, message: '请填写用户名' }]"
             />
             <van-field
               v-model="password"
               type="password"
               name="密码"
               label="密码"
               placeholder="密码"
               :rules="[{ required: true, message: '请填写密码' }]"
             />
             <van-field
               v-model="password_confirmation"
               type="password"
               name="确认密码"
               label="确认密码"
               placeholder="请确认密码"
               :rules="[{ required: true, message: '请确认密码' }]"
             />
               <van-field
               v-model="email"
               name="电子邮箱"
               label="电子邮箱"
               placeholder="请输入电子邮箱"
               :rules="[{ required: true, message: '请输入电子邮箱' }]"
             />
             <div style="margin: 16px;">
                <div class="link-login" @click="linkLogin">已有账号，去登录</div>
               <van-button style="background:#42b983;color:#fff" round block type="default" native-type="submit">注册</van-button>
             </div>
            </van-form>
        </div>
    </div>
</template>

<script>
import {ref,reactive,onMounted,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {register} from 'network/user'
import { Toast,Notify } from 'vant';
import NavBarItem from 'components/content/navbaritem/NavBarItem';

    export default {
        name:"Register",
        components:{
            NavBarItem
        },
        setup(props) {
            const router=useRouter();
            let title="用户注册";
            let userInfo= reactive({
                name:"",
                email:"",
                password:"",
                password_confirmation:""
            });
            const onSubmit=()=>{
                if(userInfo.password!=userInfo.password_confirmation){
                    Notify("两次密码不一致")
                }else{
                    register(userInfo).then(res=>{
                        if(res.status==201){
                            Toast.success('注册成功');
                            router.push('/login');
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            };
            const linkLogin=()=>{
                router.push('/login')
            };
            return{
                onSubmit,
                ...toRefs(userInfo),
                title,
                linkLogin
            }
        }
    }
</script>

<style lang="scss" scoped>
.register-box{
    margin-top: 40%;
    padding: 0px 30px;
}
.link-login{
    margin-bottom: 10px;
    font-size: 12px;
    text-align: left;
    color:#42b983;
}
</style>