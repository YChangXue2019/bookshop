<template>
    <div class="detail">
        <nav-bar-item :title="title"></nav-bar-item>
        <van-image
            width="100%"
            lazy-load
            :src="details.cover_url"
        />
        <van-card
            :num="details.sales"
            :price="details.price"
            :desc="details.description"
            :title="details.title"
        >
            <template #tags>
              <van-tag plain type="danger">新书</van-tag>
              <van-tag plain type="danger">推荐</van-tag>
            </template>
            <template #footer>
              <van-button @click="handleAddCart(details.id)" type="warning" size="small">加入购物车</van-button>
              <van-button @click="goToCart(details.id)" type="danger" size="small">立即购买</van-button>
            </template>
        </van-card>
        <van-tabs v-model="active">
            <van-tab title="概述">
                <div v-html="details.details"></div>
            </van-tab>
            <van-tab title="热评">
                <div v-html="details.comments"></div>
                <div v-for="(item,index) in comends" :key="index">{{item}}</div>
            </van-tab>
            <van-tab title="相关图书">
                <good-list :goods="like_goods"></good-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem'
import GoodList from 'components/content/goods/GoodList';
import { Toast,Notify } from 'vant';


import {getDetails} from 'network/detail'
import {addCart} from 'network/cartshop'
import {useRoute,useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ref,reactive,onMounted,toRefs} from 'vue'
    export default {
        name:"Detail",
        components:{
            NavBarItem,
            GoodList
        },
        setup() {
           const title="图书详情";
           let id=ref(null);
           let active=ref(2);
           const route=useRoute();
           const router=useRouter();
           const store=useStore();
           let comends=ref([
               "相关评论",
               "相关评论",
               "相关评论",
               "相关评论",
               "相关评论",
               "相关评论",
               "相关评论",
               "相关评论",
               "相关评论",
               "相关评论"])
           let book= reactive({
               details:{},
               like_goods:[]
           });
           onMounted(()=>{
               id.value=route.query.id;
               getDetails(id.value).then(res=>{
                   console.log(res);
                   book.details=res.goods;
                   book.like_goods=res.like_goods;
               }).catch(err=>{
                   console.log(err);
               })
           });
            //添加到购物车
           const handleAddCart=(id)=>{
               addCart({
                   goods_id:id,
                   num:1
               }).then(res=>{
                   if(res.status==201||res.status==204){
                       Toast.success("添加成功");
                       store.dispatch('updateCart')
                   }else{
                       Toast.success("添加失败");
                   }
                   console.log(res);
               }).catch(err=>{
                   console.log(err);
               })
           };
           //立即购买
           const goToCart=(id)=>{
              addCart({
                   goods_id:id,
                   num:1
               }).then(res=>{
                   if(res.status==201||res.status==204){
                    //    Toast.success("添加成功");
                       store.dispatch('updateCart')
                       router.push("/shopcart")
                   }else{
                       Toast.success("立即购买失败");
                   }
               }).catch(err=>{
                   console.log(err);
               })
           };
           return{
               title,
               id,
               ...toRefs(book),
               active,
               comends,
               handleAddCart,
               goToCart
           }
        }
    }
</script>

<style lang="scss" scoped>
.van-image{
    margin-top: 45px;
}

</style>