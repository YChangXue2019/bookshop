<template>
    <div class="shop-cart">
        <nav-bar-item :title="title"></nav-bar-item>
        <div class="cart-check">
            <shop-cart-item :list="list" :result="result" 
                @itemClick="itemClick" :checkAll="checkAll"
                @deleteItem="deleteItem">
            </shop-cart-item>
        </div>
        <div class="cart-empty" v-show="!list.length">
            <van-empty image="search" description="购物车空空如也" />
            <div class="empty-btn">
                <van-button round block type="primary" @click="goToShoping">前往选购</van-button>
            </div>
        </div>
        <!-- <div class="cart-account">
           <cart-account :checkedAll="checkedAll" :list="list"></cart-account>
        </div> -->
    <div class="cart-account">
        <van-submit-bar :price="totalPrice*100" button-text="结算" @submit="onSubmit">
            <van-checkbox v-model:checked="checkAll" @click="allCheck">全选</van-checkbox>
        </van-submit-bar>
    </div>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem'
import ShopCartItem from './childComps/ShopCartItem'
import CartAccount from './childComps/CartAccount'

import {addCart,getCart,modifyCart,deleteCartItem,checkedCart} from 'network/cartshop'
import {ref,onMounted,reactive,computed,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import { Toast,Notify } from 'vant';

    export default {
        name:'ShopCart',
        components:{
           NavBarItem,
           ShopCartItem,
           CartAccount
        },
        setup(){
            let title="购物车";
            let result=ref(['a', 'b']);
            let router=useRouter();
            let store=useStore();
            // 数据模型
            const state = reactive({
                list:[],
                result:[],
                checkAll:true
            });
            // 初始化商品
            const init=()=>{
                Toast.loading("数据加载中");
                getCart("include=goods").then(res=>{
                    state.list=res.data;
                    state.result=res.data.filter(n=>n.is_checked==1).map(item=>item.id);
                    Toast.clear();
                })
            };
            onMounted(()=>{
                init();
            });
            // 去选购商品
            const goToShoping=()=>{
                router.push("/home")
            };
            const itemClick=(itemResult,itemcheckAll)=>{
                state.result=itemResult;
                state.checkAll=itemcheckAll;
                // console.log(state.result);
            };
            const onSubmit=()=>{
                if(!state.result.length){
                    Toast.fail("请选择商品")
                    return
                }else{
                    router.push("/myorder");
                }
            };
            const allCheck=()=>{
                if(!state.checkAll){
                    state.result=state.list.map(item=>item.id);
                    state.checkAll=true;
                }else{
                    state.result=[];
                    state.checkAll=false;
                }
            };
            const deleteItem=()=>{
                init()
            };
            const totalPrice=computed(()=>{
                let sum=0;
                state.list.filter(item=>state.result.includes(item.id)).forEach(item=>{
                    sum+=parseInt(item.num)*parseFloat(item.goods.price);
                });
                return sum;
            });
            return{
                title,
                result,
                ...toRefs(state),
                goToShoping,
                onSubmit,
                allCheck,
                itemClick,
                deleteItem,
                totalPrice
            }
        }

    }
</script>

<style lang="scss" scoped>
.cart-check{
    margin-top:45px;
    padding:5px;
}

.empty-btn{
    padding: 0px 20%;
}
.van-submit-bar{
    bottom: 49px;
}
</style>