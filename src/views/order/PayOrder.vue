<template>
    <div class="pay-order">
        <nav-bar-item :title="title"></nav-bar-item>
        <div class="pay-code">
            <h6>{{paycodeTitle}}</h6>
            <img :src="paycode"/>
        </div>
    </div>
</template>
<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem'
import {useRoute} from 'vue-router';
import {ref,reactive,onMounted,toRefs} from 'vue'
import {getPayOrders} from 'network/createorder'
    export default {
        name:"PayOrder",
        components:{
            NavBarItem
        },
        setup(props) {
            let title="订单支付";
            const route=useRoute();
            const state=reactive({
                paycode:'',
                paycodeTitle:null
            })
            onMounted(()=>{
                const{orderOn,type}=route.query;
                console.log(orderOn,type);
                if(type=="aliyun"){
                    state.paycodeTitle="支付宝二维码"
                     getPayOrders(orderOn,{type:"aliyun"}).then(res=>{
                         state.paycode=res.qr_code_url;
                     })

                }else if(type=="wechat"){
                    state.paycodeTitle="微信二维码"
                     getPayOrders(orderOn,{type:"wechat"}).then(res=>{
                         state.paycode=res.qr_code_url;
                     })
                }
               
            })
            return{
                title,
                ...toRefs(state)
            }
        }
    }
</script>

<style lang="scss" scoped>
.pay-code{
    width:150px;
    margin: 100px auto;
    h6{
        text-align: center;
    }
    img{
        width: 100%;
    }
}
</style>