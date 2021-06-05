<template>
    <div class="shop-cart-item">
        <van-checkbox-group ref="checkboxGroup" @change="changeGroup" v-model="result">
            <van-swipe-cell class="shop-cart-item" v-for="item in list" :key="item.id">
                <div class="good-item">
                    <van-checkbox :name="item.id"></van-checkbox>
                    <div class="good-img">
                        <!-- <img src="~assets/images/11.png"/> -->
                        <img :src="item.goods.cover_url"/>
                    </div>
                    <div class="good-desc">
                        <div class="good-title">
                            <span class="title">{{item.goods.title}}</span>
                            <span class="sales">x{{item.goods.stock}}</span>
                        </div>
                        <div class="good-btn">
                            <div class="price"><small>￥</small>{{item.goods.price}}</div>
                            <van-stepper integer :min="1" :max="item.goods.stock" :model-value="item.num" 
                            @change="onChange" :name="item.goods.id" async-change />
                        </div>
                    </div>
                </div>
                <template #right>
                    <van-button @click="deleteItem(item.id)" square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </van-checkbox-group>
    </div>
</template>

<script>
import {addCart,getCart,modifyCart,deleteCartItem,checkedCart} from 'network/cartshop'
import {ref} from 'vue'
import { Toast } from 'vant'
import {useStore} from 'vuex'
    export default {
        name:'ShopCartItem',
        props:{
            list:{
                type:Array,
                default(){
                    return []
                }
            },
            result:{
                type:Array,
                default(){
                    return[]
                }
            },
            checkAll:{
                type:Boolean,
                default(){
                    return true
                }
            },
        },
        setup(props,{emit}){
            let itemResult=ref([]);
            let itemcheckAll=ref(null);
            let store=useStore();
            const onChange=(value,detail)=>{
                Toast.loading("修改中....")
                modifyCart(detail.name,"{num:value}").then(res=>{
                    state.list.forEach(item=>{
                        if(item.id==detail.name){
                            item.num=value;
                        }
                    });
                    Toast.clear();
                }).catch(err=>{
                    console.log(err);
                })
            };
            const changeGroup=(result,checkAll)=>{
                itemResult=props.result;
                if(props.result.length==props.list.length){
                    checkAll=true;
                }else{
                    checkAll=false;
                }
                itemcheckAll=checkAll;
                checkedCart({cart_ids:result}).then(res=>{
                    // console.log(res);
                });
                // console.log(result);
                emit("itemClick",itemResult,itemcheckAll);
            };
            const deleteItem=(id)=>{
                deleteCartItem(id).then(res=>{
                    emit("deleteItem");
                    store.dispatch('updateCart');
                })

            };
            return{
                onChange,
                changeGroup,
                itemResult,
                itemcheckAll,
                deleteItem
            }
        }  
    }
</script>

<style lang="scss" scoped>
.shop-cart-item{
    border-bottom: 1px solid #eeeeee;
}
.good-item{
        display: flex;
        width: 100%;
        height: 100px;
        margin: 5px;
        background: #ffffff;;
        .good-img{
            width: 30%;
            padding: 0 5px;
            img{
                width:100%;
                height: auto;
                margin-top: 10px;
            }
        }
        .good-desc{
            // line-height: 50px;
            display: flex;
            text-align: center;
            flex-direction: column;
            padding:5px;
            padding-left: 5px;
            font-size: 12px;
            .good-title{
                flex: 1;
                display: flex;
                .title{
                    text-align: left;
                    flex: 1;
                }
                .sales{
                    text-align: right;
                    width: 15%;
                }
            }
            .good-btn{
                display: flex;
                flex: 1;
                .price{
                    flex: 1;
                    margin-right:30px;
                    text-align: left;
                    color: red;
                }
            }
        }
}
.delete-button {
    height: 100%;
}
</style>