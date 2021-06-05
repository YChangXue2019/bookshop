<template>
    <div class="adderss-edit">
        <nav-bar-item :title="title"></nav-bar-item>
        <div class="adderss-edit-box">
            <van-address-edit
                :area-list="areaList"
                :show-delete='type=="edit"'
                :address-info="addressInfo"
                show-set-default
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
            />
        </div>
    </div>
</template>

<script>
import NavBarItem from 'components/content/navbaritem/NavBarItem'
import {reactive,onMounted,toRefs,computed} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {addAdderss,editAdderss,deleteAdderss,getAdderssList,getAdderssDetail} from 'network/adderss'
import {tdist} from 'utils/address'
import { Toast,Notify } from 'vant';
    export default {
        name:"AdderssEdit",
        components:{
            NavBarItem
        },
        setup(props) {
            const router=useRouter();
            const route=useRoute();
            const state=reactive({
                areaList:{
                    province_list:{},
                    city_list:{},
                    county_list:{}
                },
                searchResult:[],
                addressInfo:{},
                type:"",
                adderssId:''
            });
            onMounted(()=>{
                let _provice_list={};
                let _city_list={};
                let _county_list={};
                tdist.getLev1().forEach(p=>{
                   _provice_list[p.id]=p.text;
                   tdist.getLev2(p.id).forEach(c=>{
                       _city_list[c.id]=c.text;
                       tdist.getLev3(c.id).forEach(q=>{
                           _county_list[q.id]=q.text;
                       })
                   })
                });
                state.areaList.province_list=_provice_list;
                state.areaList.city_list= _city_list;
                state.areaList.county_list=_county_list;
                const{ type,adderssId}=route.query;
                state.type=type;
                state.adderssId=adderssId;
                if(type=="edit"){
                    getAdderssDetail(adderssId).then(res=>{
                        const addressDetail=res;
                        let _areaCode="";
                        const province=tdist.getLev1();
                        // console.log(res);
                        Object.entries(state.areaList.county_list).forEach(([id, text]) => {
                            // 先找出当前对应的区
                            if (text == addressDetail.county) {
                                // 找到区对应的几个省份
                                const provinceIndex = province.findIndex(item => item.id.substr(0, 2) == id.substr(0, 2))
                                // 找到区对应的几个市区
                                // eslint-disable-next-line no-unused-vars
                                const cityItem = Object.entries(state.areaList.city_list).filter(([cityId, city]) => cityId.substr(0, 4) == id.substr(0, 4))[0]
                                // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
                                if (province[provinceIndex].text == addressDetail.province && cityItem[1] == addressDetail.city) {
                                     _areaCode = id
                                }
                            }
                        });
                        state.addressInfo={
                            name:addressDetail.name,
                            tel:addressDetail.phone,
                            province:addressDetail.province,
                            city:addressDetail.city,
                            county:addressDetail.county,
                            addressDetail:addressDetail.address,
                            isDefault:addressDetail.is_default,
                            areaCode:_areaCode
                        }
                    })
                }
            });
            const title=computed(()=>{
                return state.type=='add'?'新增地址':'编辑地址';
            });
            const onSave=(content)=>{
                let params={
                    name:content.name,
                    province:content.province,
                    city:content.city,
                    county:content.county,
                    address:content.addressDetail,
                    phone:content.tel,
                    is_default:content.isDefault?"1":"0"
                }
                if(state.type=="edit"){
                    editAdderss(state.adderssId,params).then(res=>{
                         Toast.success("编辑成功");
                         router.push("/adderss");
                    })
                }else if(state.type="add"){
                    addAdderss(params).then(res=>{
                        Toast.success("保存成功");
                        router.push("/adderss");
                    })

                }
            };
            const onDelete=()=>{
                // console.log(state.adderssId);
                deleteAdderss(state.adderssId).then(res=>{
                    Toast.success("删除成功");
                    setTimeout(() => {
                        router.push('/adderss')
                    }, 500);
                });
            };
            return{
                title,
                onSave,
                onDelete,
                ...toRefs(state)
            }
        }
    }
</script>

<style lang="scss" scoped>
.adderss-edit-box{
    margin-top:50px;
}
</style>