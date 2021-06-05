<template>
    <div class="side-bar">
        <van-sidebar class="left-menu-item" v-model="activeKey">
            <van-collapse v-model="activeName" accordion>
                <van-collapse-item v-for="item in categories.slice(0,6)" :key="item.id" 
                    :title="item.name">
                    <van-sidebar-item v-for="child in item.children"
                     :key="child.id" :title="child.name" @click="sideClick(child.id)"/>
                </van-collapse-item>
            </van-collapse>
        </van-sidebar>
    </div>
</template>

<script>
import {ref,active,onMounted} from 'vue'
    export default {
        name:"SideBar",
        props:{
            categories:{
                type:Array,
                default(){
                    return[]
                }
            }
        },
        setup(props,{emit}) {
            let activeKey=ref(0);
            let activeName=ref(2);
            const sideClick=(index)=>{
                emit("sideClick",index)
            }
            return{
                activeKey,
                activeName,
                sideClick
            }
        }
    }
</script>

<style lang="scss" scoped>
.left-menu-item{
    width: 100%;
    padding-left: 5px;
}
</style>