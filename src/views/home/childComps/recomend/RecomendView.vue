<template>
    <div class="recomends-view">
        <div class="recomend-item" v-for="item of recomends.slice(0,4)" :key="item.id">
            <a href="" @click.prevent="goDetail(item.id)">
                <img v-lazy="item.cover_url" alt="">
                <p>{{item.title}}</p>
            </a>
        </div>
    </div>
</template>

<script>
import {onMounted} from 'vue';
import {useRouter} from 'vue-router'
    export default {
        name:'RecomendView',
        props:{
            recomends:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        setup() {
           const router=useRouter();
           const goDetail=(id)=>{
               router.push({path:'/detail',query:{id}})
           };
           return{
               goDetail
           }
        }
    }
</script>

<style lang="scss" scoped>
.recomends-view{
    display: flex;
}
.recomend-item{
    flex: 1;
    width: 80px;
    height: 80px;
    padding: 5px 5px 40px 5px;
    text-align: center;
    border-bottom: 8px solid #eeeeee;
    box-sizing: content-box;
    img{
        width: 100%;
    };
    p{
        font-size: 5px;
        margin-top: 2px;
    }
}
</style>