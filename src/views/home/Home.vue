<template>
    <div class="home">
        <nav-bar-item :title="title"></nav-bar-item>
        <tab-control v-show="isShow" :titles="tabTitles" @tabClick="tabClick"></tab-control>
        <div class="wrapper">
            <div class="content">
                <div ref="banref"> 
                    <div class="banners">
                        <home-swiper :banners="banners"></home-swiper>
                    </div>
                    <recomend-view :recomends="recomends"></recomend-view>
                </div>
                <tab-control :titles="tabTitles" @tabClick="tabClick"></tab-control>
                <good-list :goods="goodShow"></good-list>
            </div>
        </div>
       <back-top v-show="isShow" @backTop="backTop"></back-top>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem';
import TabControl from 'components/content/tabcontrol/TabControl';
import GoodList from 'components/content/goods/GoodList';
import BackTop from 'components/common/backtop/BackTop'

import RecomendView from './childComps/recomend/RecomendView';
import HomeSwiper from './childComps/homeswiper/HomeSwiper';

import {ref,reactive,onMounted,computed,watchEffect,nextTick} from 'vue';
import BScroll from 'better-scroll';

import {getHomeAllData,getHomeGoods} from 'network/home';
    export default {
        name:'Home',
        components:{
            NavBarItem,
            RecomendView,
            TabControl,
            GoodList,
            BackTop,
            HomeSwiper
        },
        setup() {
           let title="图书兄弟";
           let tabTitles=["畅销","新书","精选"];
           let recomends=ref([]);
           let isShow=ref(false);
           let banref=ref(null);
           let bscroll=ref(null);
           let banners=ref([]);
         //存储获取到的商品数据
           let goods = reactive({
               sales:{page:1,list:[]},
               recomend:{page:1,list:[]},
               new:{page:1,list:[]},
           });
           let currentType=ref("sales");
           let goodShow=computed(()=>{
               return goods[currentType.value].list;
           })
           onMounted(()=>{
               getHomeAllData().then(res=>{
                //    console.log(res);
                   recomends.value=res.goods.data;
                   banners.value=res.slides;
               }).catch(err=>{
                   console.log(err);
               });
               getHomeGoods().then(res=>{
                   goods.sales.list=res.goods.data;
                //    console.log(res);
               }).catch(err=>{
                   console.log(err);
               });
                getHomeGoods("recomend").then(res=>{
                   goods.recomend.list=res.goods.data;
                //    console.log(res);
               }).catch(err=>{
                   console.log(err);
               });
                getHomeGoods("new").then(res=>{
                   goods.new.list=res.goods.data;
                //    console.log(res);
               }).catch(err=>{
                   console.log(err);
               });
            //   创建better-scorll
            bscroll=new BScroll(document.querySelector(".wrapper"),{
                probeType:3,
                click:true,//允许点击事件
                pullUpLoad:true,//允许上拉加载
            });
            // 触发滚动事件
            bscroll.on("scroll",(position)=>{
                isShow.value=-position.y>banref.value.offsetHeight;
            });
            // 下拉加载更多
            bscroll.on("pullingUp",()=>{
                // 每次上拉加载,goods对象中的page+1
                let page=goods[currentType.value].page+1;
                // 根据新的page和currentType重新调用方法请求数据
                getHomeGoods(currentType.value,page).then(res=>{
                    // 将新请求回来的数据追加到goods对应的对象中
                    goods[currentType.value].list.push(...res.goods.data);
                    // 数据追加完成后，当前数据的page+1
                    goods[currentType.value].page+1;
                }).catch(err=>{
                    console.log(err);
                });
                //上拉完成
                bscroll.finishPullUp();
                // 重新刷新
                bscroll.refresh();

                // console.log("contentheight:"+document.querySelector(".content").clientHeight);
            })
           });
        //接收TabControl传递过来的自定义事件
           const tabClick=(index)=>{
               let types=["sales","new","recomend"];
               currentType.value=types[index];
               nextTick(()=>{
                   bscroll && bscroll.refresh();
               })
           };
           const backTop=()=>{
               bscroll.scrollTo(0,0,1000);
           };
           watchEffect(()=>{
                nextTick(()=>{
                   bscroll && bscroll.refresh();
               })
           })

           return{
               recomends,
               title,
               tabTitles,
               tabClick,
               goods,
               goodShow,
               isShow,
               banref,
               backTop,
               banners
           }
        },
    }
</script>

<style lang="scss" scoped>
.home{
    height: 100vh;
    position: relative;
}
.banners img{
    width: 100%;
    height: auto;
    // margin-top: 45px;
}
.wrapper{
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    // background: red;
    overflow: hidden;
}

</style>