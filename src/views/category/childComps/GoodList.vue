<template>
    <div>
        <van-card
         v-for="(item,index) in showGoods" :key="index"
         @click="listClick(item.id)"
         :num="item.sales"
         :tag="item.sales>10?'畅销':'新款'"
         :price="item.price"
         :desc="item.updated_at"
         :title="item.title"
         :thumb="item.cover_url"
         :lazy-load="true"
        />
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
    export default {
        name:'GoodList',
        props:{
            showGoods:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        setup(props) {
            const router=useRouter();
            const listClick=(id)=>{
                router.push({path:'/detail',query:{id}});
                // console.log(id);
            };
            return{
                listClick
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>