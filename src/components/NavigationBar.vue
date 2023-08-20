<!-- NavigationBar.vue -->

<template>
    <nav class='.navigation-bar'>
    <el-menu mode="horizontal" background-color="#E4E7ED" router>
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/book">Book</el-menu-item>
    <el-menu-item index="/product">Product</el-menu-item>
    <el-menu-item index="/allproducts">All Product</el-menu-item>

    </el-menu>
    </nav>
  </template>
  
  <script>
export default {
  name: 'NavigationBar'
};
</script>

<style scoped>
.navigation-bar {
  background-color: #0f0f0f;
  color: #5e5b5b;
}

.navigation-bar .el-menu-item {
  color: #333232;
}
</style>
