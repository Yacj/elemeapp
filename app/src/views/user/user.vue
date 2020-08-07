<template>
  <div id="user">
    user
    <Tabbar :active="2"></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar/Tabbar";
export default {
  name: "user",
  components: {Tabbar}
}
</script>

<style scoped lang="scss">

</style>