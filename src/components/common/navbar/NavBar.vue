<template>
    <div class="nav-bar">
        <div class="left" @click="goback"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
    export default {
        name:"NavBar",
        setup() {
            const router=useRouter();
            const goback=()=>{
                router.back(-1);
            };
            return{
                 goback
            }
        },
    }
</script>

<style lang="scss" scoped>
.nav-bar{
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color:#fff;
    background: var(--color-tint);
    z-index: 100;
}
.left,.right{
    width: 60px;
    height: 100%;
}
.center{
    flex: 1;
    font-size: 25px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    letter-spacing: 5px;
}
</style>