<template>
    <div class="tab-category">
        <van-tabs v-model="active" @click="tabClick">
            <van-tab title="销量"></van-tab>
            <van-tab title="价格"></van-tab>
            <van-tab title="评论"></van-tab>
        </van-tabs>
    </div>
</template>

<script>
import {ref} from 'vue'
    export default {
        name:'TabCategory',
        setup(props,{emit}) {
            let active=ref(2);
            const tabClick=(index)=>{
                // console.log(index);
                emit("tabClick",index);
            };
            return{
                active,
                tabClick
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>