<template>
    <div class="good-list-item" @click="itemClick(product.id)">
        <div class="good-img">
            <img v-lazy="product.cover_url" alt="">
        </div>
        <div class="good-info">
            <h6 class="title">{{product.title}}</h6>
            <p class=content>
                <span class="price">￥{{product.price}}</span>
                <span class="collect">{{product.collects_count}}</span>
            </p>
        </div>
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
    export default {
        name:"GoodListItem",
        props:{
            product:Object,
            default(){
                return{}
            }
        },
        setup(){
            const router=useRouter();
            const itemClick=(id)=>{
                router.push({path:'/detail',query:{id}});
                console.log(id);
            };
            return{
                itemClick
            }
        }
    }
</script>

<style lang="scss" scoped>
.good-list-item{
    width:46%;
    margin-bottom:30px;
    .good-img img{
        width:100%;
    };
    .good-info{
        margin-top: 5px;
        .title{
            font-size:12px;
            letter-spacing: 5px;
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        }
        .content{
            position: relative;
            margin-top: 5px;
            font-size: 12px;
            .price{
                padding: 0px 20px 0px 0px;
                color: red;
            }
            .collect::before{
                content: "";
                display: inline-block;
                position: absolute;
                left: 78px;
                top: 1px;
                width: 10px;
                height: 10px;
                background: url('~assets/images/collect.png') 0 0/10px no-repeat;
            }
        }
    }
}
</style>