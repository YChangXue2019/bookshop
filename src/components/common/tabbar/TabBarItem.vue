<template>
    <div class="tab-bar-item" @click="itemClick" :style="activeStyle">
        <div><slot name="item-icon"></slot></div>
        <div><slot name="item-text"></slot></div>
    </div>
</template>

<script>
import {useRouter,useRoute} from 'vue-router'
    export default {
        name:'TabBarItem',
        props:{
            path:String,
            activeColor:{
                type:String,
                defult:"#42bBaa",
            }
        },
        setup() { 
        // const router = useRouter();
		// const route = useRoute();
        },
        methods: {
            itemClick(){
                this.$router.replace(this.path);
            }
        },
        computed:{
            isActive(){
                return this.$route.path.indexOf(this.path)!==-1;
            },
            activeStyle(){
                return this.isActive?{color:this.activeColor}:{color:'#666'};
            }

        }
    }
</script>

<style lang="scss" scoped>
.tab-bar-item{
    flex:1;
    margin-top: 3px;
    text-align: center;
}
</style>