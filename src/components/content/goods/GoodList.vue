<template>
    <div class="good-list">
        <good-list-item v-for="(item,index) in goods" :product="item" :key="index"></good-list-item>
    </div>
</template>

<script>
import GoodListItem from './GoddListItem'
    export default {
        name:'GoodList',
        props:{
            goods:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            GoodListItem
        }

    }
</script>

<style lang="scss" scoped>
.good-list{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 5px;
    text-align: center;
}
</style>