<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {}
  },
  created() {
    this.getLocation()
  },
  methods: {
    getLocation() {
      const that = this
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete(data) {
          console.log(data)
          that.$store.dispatch('setLocation',data)
          that.$store.dispatch('setAddress',data.formattedAddress)
        }

        function onError(data) {
          that.getLngLatLocation()
          // 定位出错
        }
      })
    },
    getLngLatLocation(){
      const that = this
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            AMap.plugin('AMap.Geocoder', function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              })
              let lanLat = result.rectangle.split(";")[0].split(",");
              geocoder.getAddress(lanLat, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  that.$store.dispatch("setLocation", {
                    addressComponent: {
                      city: result.regeocode.addressComponent.city,
                      province: result.regeocode.addressComponent.province
                    },
                    formattedAddress: result.regeocode.formattedAddress
                  });

                  that.$store.dispatch(
                      "setAddress",
                      result.regeocode.formattedAddress
                  );
                  // result为对应的地理位置详细信息
                }
              })
            })
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">

</style>
