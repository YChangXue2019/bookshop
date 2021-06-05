<template>
    <div class="cart-account">
        <van-submit-bar :price="3050" button-text="结算" @submit="onSubmit">
            <van-checkbox @click="allCheck">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>

<script>
    export default {
        name:"CartAccount",
        props:{
            checkedAll:{
                type:Boolean,
                default(){
                    return true
                }
            },
            list:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        setup(props) {
            const onSubmit=()=>{

            };
            const allCheck=(checkedAll)=>{
                if(!checkedAll){
                    // checkedAll=list.map(item=>item.id);
                    checkedAll=true;
                }else{
                    checkedAll=false;
                }
            };
            return{
                onSubmit,
                allCheck
            }
            
        }
    }
</script>

<style lang="scss" scoped>
.van-submit-bar{
    bottom: 49px;
}
</style>