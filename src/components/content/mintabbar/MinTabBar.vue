<template>
    <div>
        <tab-bar>
            <tab-bar-item path="/home" activeColor="#42bBaa">
                <template v-slot:item-icon>
                    <span class="iconfont">&#xe73b;</span>
                </template>
                <template v-slot:item-text >
                    <h6>首页</h6>
                </template>
            </tab-bar-item>
            <tab-bar-item path="/category" activeColor="#42bBaa">
                <template v-slot:item-icon>
                   <span class="iconfont">&#xe743;</span>
                </template>
                <template v-slot:item-text>
                   <h6>分类</h6>
                </template>
            </tab-bar-item>
            
                <tab-bar-item path="/shopcart" activeColor="#42bBaa">
                    <template v-slot:item-icon>
                        <van-badge :content="$store.state.cartCount" max="99">
                            <span class="iconfont">&#xe742;</span>
                        </van-badge>
                    </template>
                    <template v-slot:item-text>
                        <h6>
                            购物车
                        </h6>
                    </template>
                </tab-bar-item>
          
            <tab-bar-item path="/profile" activeColor="#42bBaa"> 
                <template v-slot:item-icon>
                   <span class="iconfont">&#xe6ef;</span>
                </template>
                <template v-slot:item-text>
                    <h6>我的</h6>
                </template>
            </tab-bar-item>
        </tab-bar>
    </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar';
import TabBarItem from 'components/common/tabbar/TabBarItem';
    export default {
        name:'MinTabBar',
        components:{
            TabBar,
            TabBarItem
        }
    }
</script>

<style lang="scss" scoped>
.iconfont{
    font-size: 24px;
    // color: var(--color-text);
}
h6{
    // font-size: 14px;
    // color: var(--color-text);
}
</style>