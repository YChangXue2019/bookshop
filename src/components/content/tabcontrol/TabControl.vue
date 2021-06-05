<template>
    <div class="tab-control">
        <div class="tab-control-item" v-for="(item,index) in titles" 
        :key="index" @click="itemClick(index)">
            <a :class="{active:index==currentIndex}">{{item}}</a>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
    export default {
        name:"TabControl",
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        setup(props,{emit}){
            let currentIndex=ref(0);
            const itemClick=(index)=>{
                currentIndex.value=index;
                //发送自定义事件到home组件中,
                //第一个参数为事件名称，第二个参数发送事件时传递的参数
                emit('tabClick',index)
            };
            return{
                itemClick,
                currentIndex
            }
        }
    }
</script>

<style lang="scss" scoped>
.tab-control{
    position: sticky;
    top: 45px;
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: #ffffff;
    z-index: 100;
    .tab-control-item{
        flex:1
    }
    .active{
        padding: 6px;
       border-bottom: 2px solid var(--color-high-text);
    }
}
</style>