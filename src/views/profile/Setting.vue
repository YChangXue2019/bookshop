<template>
    <div class="setting">
        <nav-bar-item :title="title"></nav-bar-item>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem'
    export default {
        name:'Setting',
        components:{
            NavBarItem
        },
        setup(props) {
            let title="账号管理";
            return{
                title
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>