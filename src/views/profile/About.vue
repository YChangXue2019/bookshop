<template>
    <div class="about">
        <nav-bar-item :title="title"></nav-bar-item>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem'
    export default {
        name:'about',
        components:{
            NavBarItem
        },
        setup(props) {
            let title="关于我们";
            return{
                title
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>