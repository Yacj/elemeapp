<template>
  <div id="City">
    <div class="search-wrap">
      <van-search
          v-model="search_val"
          show-action
          placeholder="请输入城市名"
          @input="onSearch"
      />
    </div>
    <div class="Location">
      <Location :address="city"></Location>
    </div>
    <div class="city-list">
      <van-index-bar :sticky="false" highlight-color="#fb6463">
        <van-index-anchor    v-for="(item,index) in cityData" :key="index" :index="index">
          <span class="indexWord">{{index}}</span>
          <van-cell @click="chooseCity(citem)" v-for="(citem,cindex) in item" :key="cindex"  :title="citem"/>
        </van-index-anchor>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import Location from "@/components/Location/Location";
import {City} from "@/api/city/city";

let cityData = require('../../json/city.json')
export default {
  name: "City",
  data() {
    return {
      search_val: '',
      cityData:[],
      FirstPin: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
    }
  },
  components: {Location},
  computed: {
    city() {
      return (
          this.$store.getters.location.addressComponent.city ||
          this.$store.getters.location.addressComponent.province
      );
    }
  },
  created() {
    this.getCity()
  },
  methods: {
    getCity() {
      City.cityList().then((res) => {
        let pinyin = require('js-pinyin')
        pinyin.setOptions({
          checkPolyphone: false,
          charCase: 0
        })
        let list = res.data.results
        let cityList = []
        for (let i in list) {
          cityList.push(list[i].district_name)
        }
        let firstName = {}
        this.FirstPin.forEach((item) => {
          firstName[item] = [];
          cityList.forEach((el) => {
            let first = pinyin.getFullChars(el).substring(0,1);
            if( first === item ){
              firstName[item].push(el)
            }
          })
        })
        this.cityData = firstName
      })
    },
    chooseCity() {

    },
    onSearch() {
      let name = this.search_val
      let data = {
        name
      }
      City.citySearch(data).then((res) => {
        console.log(res)
      })
    },
  }
}
</script>

<style scoped lang="scss">
#City {
  .Location {
    background: #fff;
    padding: 2px 16px;
    box-sizing: border-box;
  }
}
</style>