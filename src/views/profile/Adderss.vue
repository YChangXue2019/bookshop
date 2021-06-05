<template>
    <div class="adderss">
        <nav-bar-item :title="title"></nav-bar-item>
        <div class="empty-list" v-show="!list.length"> 
            还没有地址信息，去添加吧
        </div>
        <div class="adderss-list">
            <van-address-list
              v-model="chosenAddressId"
              :list="list"
              default-tag-text="默认"
              @add="onAdd"
              @edit="onEdit"
            />
        </div>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem'
import {ref,reactive,onMounted,toRefs,computed} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {addAdderss,editAdderss,deleteAdderss,getAdderssList,getAdderssDetail} from 'network/adderss'
import { Toast,Notify } from 'vant';

    export default {
        name:'Adderss',
        components:{
            NavBarItem
        },
        setup(props) {
            let title="地址管理";
            const router=useRouter();
            const route=useRoute();
            const state=reactive({
                chosenAddressId:'1',
                list:[]
            });
            onMounted(()=>{
                getAdderssList().then(res=>{
                    // console.log(res);
                   if(!res.data.length){
                       state.list=[];
                       return
                   }
                   state.list=res.data.map(item=>{
                       return{
                           id:item.id,
                           name:item.name,
                           tel:item.phone,
                           address:`${item.province}${item.city}${item.county}${item.address}`,
                           isDefault:item.is_default,
                       }
                   })
                })
            });
            const onAdd=()=>{
                router.push({path:"/addressedit",query:{type:"add"}})
            }
            const onEdit=(item)=>{
                router.push({path:'/addressedit',query:{type:"edit",adderssId:item.id}})
            }
            // const select=(item)=>{
            //     router.push({path:'/createorder',query:{adderssId:item.id}})
            // }

            return{
                title,
                ...toRefs(state),
                onAdd,
                onEdit,
            }
        }
    }
</script>

<style lang="scss" scoped>
.adderss{
    height: 300px;
    // background: purple;
    .empty-list{
        position: absolute;
        width: 100%;
        height: 100px;
        line-height: 100px;
        top: 0;
        bottom: 0;
        margin: auto;
        text-align: center;

    }
    .adderss-list{
         margin-top: 50px;
         padding:0px 10px;
    }
}

</style>