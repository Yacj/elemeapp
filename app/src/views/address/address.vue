<template>
  <div id="address">
    <van-sticky>
      <navbar class="">
        <div slot="left" @click="back">
          <van-icon name="arrow-left" style="top:2px;" color="#fff"/>
          返回
        </div>
        <div slot="title" style="color: #fff">
          选择收货地址
        </div>
      </navbar>
    </van-sticky>
    <div class="city-search">
      <div class="search">
        <span class="city" @click="$router.push('/city')">
          {{city}}
            <van-icon name="arrow-down"/>
        </span>
        <van-icon name="search" style="top: 2px"/>
        <input type="text" v-model="search_val" placeholder="小区/写字楼/学校等">
      </div>
      <Location :address="address"></Location>
    </div>
    <div class="area">
      <ul class="area_list" v-for="(item,index) in areaList" :key="index">
        <li @click="selectAddress(item)" class="van-hairline--bottom">
          <h4>{{item.name}}</h4>
          <p>
            {{item.district === "" ? '暂无地址' : item.district}}
            {{item.address.length === 0 ? '.' : item.address}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar";
import Location from "@/components/Location/Location";
import {isUndef} from "@/util/util";

export default {
  name: "Address",
  components: {Location, Navbar},
  data() {
    return {
      city: '地址加载中',
      search_val: '',
      areaList: []
    }
  },
  created() {
    this.getCity()
  },
  watch: {
    search_val() {
      this.searchPlace()
    }
  },
  computed: {
    address() {
      return this.$store.getters.address
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    getCity() {
      if (Object.keys(this.$store.getters.location).length === 0) {
        return this.$dialog.confirm({
          message: '获取地址失败，请手动选择'
        })
            .then(() => {
              this.$router.push("/city")
            })
            .catch(() => {
              this.$router.back()
            })
      }
      let routeCity = this.$route.params.city
      let storeCity = this.$store.getters.location.addressComponent.city
      if (isUndef(routeCity)) {
        this.city = storeCity
      } else {
        this.city = routeCity
      }
    },
    searchPlace() {
      const that = this
      const val = this.search_val
      AMap.plugin('AMap.Autocomplete', function () {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: that.city
        }
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(val, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (result === 'NO_PARAMS') {
            that.areaList = []
            return
          }
          that.areaList = result.tips
        })
      })
    },
    selectAddress(item) {
      this.$store.dispatch("setAddress", item.district + item.address + item.name)
      this.$router.back();
    }
  },
}
</script>

<style scoped lang="scss">
#address {
  width: 100%;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;

  .city-search {
    background-color: #fff;
    padding: 10px 20px;
    color: #333;

    .search {
      background-color: #eee;
      height: 40px;
      border-radius: 10px;
      box-sizing: border-box;
      line-height: 40px;

      .city {
        padding: 0 10px;

        i {
          margin-right: 10px;
          top: 3px;
        }
      }

      input {
        margin-left: 5px;
        background-color: #eee;
      }
    }
  }

  .area {
    margin-top: 16px;
    background: #fff;

    li {
      padding: 8px 16px;
      color: #aaa;

      h4 {
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
      }
    }
  }
}
</style>