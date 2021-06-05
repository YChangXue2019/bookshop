<template>
    <div class="category">
       <nav-bar-item :title='title'></nav-bar-item>
       <div id="minbox">
           <div class="order-tab">
               <tab-category @tabClick="tabClick"></tab-category>
           </div>
           <div class="left-menu">
               <side-bar :categories="categories" @sideClick="sideClick"></side-bar>
           </div>
           <div class="good-list">
               <div class="content">
                   <good-list :showGoods="showGoods"></good-list>
               </div>
           </div>
       </div>
       <back-top v-show="isShowBackTop" @backTop="backTop"></back-top>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem';
import BackTop from 'components/common/backtop/BackTop'

import SideBar from './childComps/SideBar'
import TabCategory from './childComps/TabCategory'
import GoodList from './childComps/GoodList'

import {getCategory,getCategoryGoods} from 'network/category'
import {ref,reactive,onMounted,computed,watchEffect,nextTick} from 'vue'
import BScroll from 'better-scroll'
    export default {
        name:"Category",
        components:{
            NavBarItem,
            SideBar,
            TabCategory,
            GoodList,
            BackTop
        },
        setup() {
            let title="图书分类";
            let categories=ref([]);
            let active=ref(2);
            let currentOrder=ref("sales");
            let currentCid=ref(0);
            let bscroll=ref(null);
            let isShowBackTop=ref(false);
            // 数据模型
            let goods = reactive({
                sales:{page:1,list:[]},
                price:{page:1,list:[]},
                comments_count:{page:1,list:[]},
            });
            onMounted(()=>{
                getCategory().then(res=>{
                    categories.value=res.categories;
                }).catch(err=>{
                    console.log(err);
                });
                getCategoryGoods("sales",currentCid.value).then(res=>{
                    goods.sales.list=res.goods.data;
                }).catch(err=>{
                    console.log(err);
                });
                bscroll=new BScroll(document.querySelector(".good-list"),{
                    probeType:3,
                    click:true,
                    pullUpLoad:true
                });
                bscroll.on("scroll",(position)=>{
                     isShowBackTop.value=-position.y>300;
                });
                bscroll.on("pullingUp",()=>{
                    let page=goods[currentOrder.value].page+1;
                    getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
                        console.log(res);
                    goods[currentOrder.value].list.push(...res.goods.data);
                    goods[currentOrder.value].page+1
                }).catch(err=>{
                    console.log(err);
                });
                   //上拉完成
                   bscroll.finishPullUp();
                   // 重新刷新
                   nextTick(()=>{
                       bscroll&&bscroll.refresh();
                   })
                })
            });
            const showGoods=computed(()=>{
                return goods[currentOrder.value].list;
            });
            // 初始化数据
            const init=()=>{
                getCategoryGoods("sales",currentCid.value).then(res=>{
                    goods.sales.list=res.goods.data;
                }).catch(err=>{
                    console.log(err);
                });
                getCategoryGoods("price",currentCid.value).then(res=>{
                    goods.price.list=res.goods.data;
                }).catch(err=>{
                    console.log(err);
                });
                getCategoryGoods("comments_count",currentCid.value).then(res=>{
                    goods.comments_count.list=res.goods.data;
                }).catch(err=>{
                    console.log(err);
                })
            };
            const tabClick=(index)=>{
                let orders=["sales","price","comments_count"];
                currentOrder.value=orders[index];
                getCategoryGoods(currentOrder.value,currentCid.value).then(res=>{
                    goods[currentOrder.value].list=res.goods.data;
                    nextTick(()=>{
                        bscroll&&bscroll.refresh();
                    })
                }).catch(err=>{
                    console.log(err);
                });
            };
            const sideClick=(id)=>{
                currentCid.value=id;
                init();
            };
            const backTop=()=>{
                bscroll.scrollTo(0,0,1000);
            };
            watchEffect(()=>{
                nextTick(()=>{
                    bscroll&&bscroll.refresh();
                })
            })
            return{
                title,
                categories,
                active,
                tabClick,
                sideClick,
                goods,
                showGoods,
                backTop,
                isShowBackTop
            }
        }
        
    }
</script>

<style lang="scss" scoped>
#minbox{
    .order-tab{
        height: 45px;
        position: fixed;
        left: 120px;
        right: 0px;
        top: 45px;
        z-index: 100;
    }
    .left-menu{
        width: 120px;
        position:fixed;
        top: 90px;
        left:0;
    }
    .good-list{
        position: absolute;
        top: 95px;
        left: 130px;
        right: 0px;
        // height:100vh;
        bottom: 0;
        padding: 5px;
        text-align: center;
        overflow: hidden;
    }
}
</style>