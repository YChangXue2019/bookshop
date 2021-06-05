<template>
    <div class="back-top" @click="backClick"></div>
</template>

<script>
    export default {
        name:'back-top',
        setup(props,{emit}) {
            const backClick=()=>{
                 emit("backTop")
            };
            return{
                backClick,
            }
        }
    }
</script>

<style lang="scss" scoped>
.back-top{
    position: absolute;
    right: 20px;
    bottom: 69px;
    width:40px;
    height: 40px;
    border-radius: 50%;
    background: url("~assets/images/up.png") center center no-repeat;
}
</style>