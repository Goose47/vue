<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vuee</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')" >Posts</my-button>
      <my-button @click="$router.push('/posts_store')" style="margin-left: 20px" >Posts Store</my-button>
      <my-button @click="$router.push('/posts_capi')" style="margin-left: 20px" >Posts Composition api</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 20px">About</my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar"
}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.navbar__btns {
  margin-left: auto;
}
</style>