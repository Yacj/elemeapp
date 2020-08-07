<template>
  <div id="Navbar">
    <van-nav-bar>
      <slot slot="left" name="left"></slot>
      <slot slot="title" name="title"></slot>
      <slot slot="right" name="right"></slot>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped lang="scss">
.van-nav-bar {
  background-color: #009eef;
  color:#fff;
}
</style>