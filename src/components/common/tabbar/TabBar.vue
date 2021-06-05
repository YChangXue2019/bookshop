<template>
    <div class="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'TabBar'
    }
</script>

<style lang="scss" scoped>
.tab-bar{
    display:flex;
    position: fixed;
    width: 100%;
    height: 49px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f6f6f6;
    box-shadow: 0px -1px 5px rgba(100,100,100,0.3);
}
</style>