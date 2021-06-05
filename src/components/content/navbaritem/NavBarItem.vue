<template>
    <div class="nav-bar-item">
        <nav-bar>
            <template v-slot:left @click='goback'>
                <img src="~assets/images/left.png" alt="">
            </template>
            <template v-slot:center>
                 <h6>{{title}}</h6>
            </template>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import {useRouter} from 'vue-router'
    export default {
        name:'NavBarItem',
        props:{
            title:{
                type:String,
                default:'图书兄弟'
            }
        },
        components:{
            NavBar
        },
    }
</script>

<style lang="scss" scoped>
img{
    width: 24px;
    margin-top:10px;
}
</style>