<template>
  <div id="app">
    <router-view></router-view>
    <min-tab-bar></min-tab-bar>
  </div>
</template>
<script>
// import Home from 'views/home/Home';
import MinTabBar from 'components/content/mintabbar/MinTabBar'
import {onMounted} from 'vue'
import {useStore} from 'vuex'
export default {
  name:"App",
  setup(props) {
    const store=useStore();
    onMounted(()=>{
      store.dispatch('updateCart');
    })
  },
  components:{
    MinTabBar,
  }
}
</script>

<style lang='scss'>
@import 'assets/css/base.css';
</style>
