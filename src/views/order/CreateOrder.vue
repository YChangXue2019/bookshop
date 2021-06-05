<template>
    <div class="create-order">
        <nav-bar-item :title="title"></nav-bar-item>
        <div class="order-box">
            <div class="address-wrap"  @click="goTo">
                <div class="address-info">
                    <div class="name-info">
                        <span>{{address.name}}</span>
                        <span>{{address.phone}}</span>
                    </div>
                    <div class="addres-detail">
                        {{address.province}}{{address.city}}{{address.county}}{{address.address}}
                    </div>
                </div>
                <van-icon name="arrow" />
            </div>
            <div class="order-item" v-for="item in cartList" :key="item.id">
                <div class="goods-item">
                    <div class="goods-img">
                        <img :src="item.goods.cover_url"/>
                    </div>
                    <div class="goods-desc">
                        <div class="goods-title">
                            <span class="title">{{item.goods.title}}</span>
                            <span class="sales">x{{item.num}}</span>
                        </div>
                        <div class="good-price">
                            <div>￥{{item.goods.price}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <van-submit-bar 
                :price="totalPrice*100" 
                button-text="提交订单" 
                @submit="onSubmit"
                >
                  商品金额
            </van-submit-bar>
        </div>
        <van-popup v-model:show="showpay" position="bottom" closeable :style="{ height: '30%' }">
            <div class="popup-pay">
                <div class="pay-btn">
                    <van-button @click="aliyuClick()" round block type="primary">支付宝</van-button>
                </div>
                <div class="pay-btn">
                    <van-button @click="wechatClick()" round block type="primary">微信</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem'
import {useRouter,useRoute} from 'vue-router'
import {ref,reactive,onMounted,computed,toRefs} from 'vue'
import {useStore} from 'vuex'
import { Toast,Notify } from 'vant';
import {
        getOrderPreview,
        createOrders,
        getOrdersDetail,
        getPayOrders,
        getOrdersStatus,
        getOrdersList,
        confirmOrders,
        confirmOrdersExpress
} from 'network/createorder'
    export default {
        name:"CreateOrder",
        components:{
            NavBarItem
        },
        setup(props) {
            let title="我的订单";
            const router=useRouter();
            const route=useRoute();
            const store=useStore();
            const state=reactive({
                cartList:[],
                address:[],
                showpay:false,
                orderOn:null,
            });
            const init=()=>{
                Toast.loading("加载中");
                getOrderPreview().then(res=>{
                    let address=res.address.filter(n=>n.is_default=='1');
                    if(address.length==0){
                        state.address={
                            address:"请选择或填写地址信息"
                        }
                    }else{
                        state.address=address[0]
                    }
                    console.log(res);
                    state.cartList=res.carts;
                })
            };
            onMounted(()=>{
                init();
            })
            const totalPrice=computed(()=>{
                let sum=0;
                state.cartList.forEach(item=>{
                    sum+=item.goods.price;
                });
                return sum;

            })
            const onSubmit=()=>{
                const params={
                    address_id:state.address.id
                }
                createOrders(params).then(res=>{
                    Toast.success("创建订单成功");
                    store.dispatch("updateCart");
                    state.showpay=true;
                    state.orderOn=res.id;
                    console.log(res.id);
                })
            }
            const onEdit=()=>{

            }
            const goTo=()=>{
                router.push('/adderss')
            }
            const showPopup=()=>{
                show=true
            }
            const wechatClick=()=>{
                // console.log(state.orderOn)
                router.push({path:'/payorder',query:{type:"wechat",orderOn:state.orderOn}})
            }
            const aliyuClick=()=>{
                // console.log(state.orderOn)
                router.push({path:'/payorder',query:{type:"aliyun",orderOn:state.orderOn}})
            }
            return{
                title,
                onSubmit,
                onEdit,
                ...toRefs(state),
                goTo,
                totalPrice,
                aliyuClick,
                wechatClick
            }
        }
    }
</script>

<style lang="scss" scoped>
.order-box{
    margin-top:45px;
    padding: 0px 5px;
}
.goods-item{
    width: 100%;
    display: flex;
    font-size: 12px;
    .goods-img{
        width: 100px;
        padding: 5px;
        img{
            width: 100%;
        }
    }
    .goods-desc{
        flex: 1;
        line-height: 50px;
        width: 100%;
        .goods-title{
            display: flex;
            width: 100%;
            span{
                display: inline-block;
                flex: 1;
            }
            .title{
                width: 80%;  
            }
            .sales{
                text-align: center;
            }
        }
        .good-price{
            // flex: 1;
            div{
                margin-left: 20px;
            }
        }
    }
}
.address-wrap{
    position: relative;
    display: flex;
    height: 80px;
    line-height: 25px;
    padding:10px;
    font-size: 12px;
    .address-info{
        width: 80%;
    }
    .van-icon{
        flex:1;
        text-align: right;
        line-height: 40px;
    }
    &::before {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2px;
        background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background-size: 80px;
        content: '';
    }

}
.van-submit-bar{
    bottom: 50px;
}
.popup-pay{
    width:100%;
    height: 100%;
    line-height: 50px;
    padding: 20px 50px;
    .pay-btn{
        margin:20px 0;
    }
}

</style>