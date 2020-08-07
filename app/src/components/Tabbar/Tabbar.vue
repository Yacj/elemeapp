<template>
  <div id="Tabbar">
    <van-tabbar v-model="actives">
      <van-tabbar-item
          v-for="(item,index) in footerList"
          :icon="item.icon"
          :info="item.info"
          :dot="item.dot"
          @click="footerNavigateTo(item)"
          :key="index">{{ item.name }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
let footerList = [
  {
    index: 0,
    name: '首页',
    path: '/home',
    icon: 'wap-home-o',
    dot: false,
    info: ''// 此处为空时 dom不显示
  },
  {
    index: 1,
    name: '订单',
    path: '/order',
    icon: 'orders-o',
    dot: false,
    info: ''
  },
  {
    index: 2,
    name: '我的',
    path: '/user',
    icon: 'contact',
    dot: false,
    info: ''
  }
]
export default {
  name: "Tabbar",
  data() {
    return {
      actives: this.active,
      footerList
    }
  },
  props: ['active'],
  methods: {
    // 点击底部跳转到对应的path
    footerNavigateTo(obj) {
      this.$router.push({path: obj.path})
    }
  },
}
</script>

<style scoped lang="scss">
#Tabbar{
  z-index: 101;
}
</style>