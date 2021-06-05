<template>
    <div class="collect">
        <nav-bar-item :title="title"></nav-bar-item>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem'
    export default {
        name:'Collect',
        components:{
            NavBarItem
        },
        setup(props) {
            let title="我的收藏";
            return{
                title
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>