<template>
  <div class="home">
    <div class="header">
      <div @click="$router.push({name: 'address',params: {city: city}})"
           class="address-map">
        <van-icon name="location-o"/>
        <span>{{address}}</span>
        <van-icon name="arrow-down"/>
      </div>
      <div class="shop_search">
        <van-icon name="search" style="top: 2px"/>
        搜索商家或商家名称
      </div>
    </div>
    <Tabbar :active="0"></Tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Tabbar from "@/components/Tabbar/Tabbar";
import {storage} from "@/util/util";

export default {
  name: 'Home',
  components: {
    Tabbar,
    HelloWorld
  },
  created() {
    console.log(storage.get('address'))
  },
  computed: {
    address() {
      let str = this.$store.getters.address
      console.log(str.split("省")[0].split("区")[0].split("市")[0])
      return str.includes('市') ? str.replace(/市/, ' ').split(' ')[1] : str
    },
    city() {
      return (
          this.$store.getters.location.addressComponent.city ||
          this.$store.getters.location.addressComponent.province
      );
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  .header {
    background-color: #009eef;
    padding: 10px 16px;

    .address-map {
      color: #fff;
      font-weight: bold;
      margin: 10px 0 10px 0;

      i {
        margin: 0 3px;
        font-size: 18px;
      }

      span {
        display: inline-block;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        top: 2px;
      }
    }

    .shop_search {
      //margin-top: 10px;
      background-color: #fff;
      padding: 10px 0;
      border-radius: 4px;
      text-align: center;
      color: #aaa;
    }
  }
}
</style>
