<template>
    <div class="home-swiper">
        <van-swipe v-if="banners.length" class="my-swipe"  :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in banners" :key="item.id">
                <img class="banner-img" v-lazy="item.img_url" alt="">
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    export default {
        name:"HomeSwiper",
        props:{
            banners:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.banner-img{
    width: 100%;
    height: 180px;
}
</style>