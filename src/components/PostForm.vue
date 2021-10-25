<template>
  <h4>Create a post</h4>
  <form @submit.prevent>
    <my-input
        v-focus
        v-model="post.title"
        type="text"
        placeholder="Title"/>
    <my-input
        v-model="post.body"
        type="text"
        placeholder="Body of the post"/>
    <my-button
        @click="createPost"
        style="align-self: flex-end; margin-top: 15px;"
    >
      Create a post
    </my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },

  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post)
      this.post ={
        body: '',
        title: '',
      }
    }
  },

  // watch: {
  //   post: {
  //     handler(newVal) {
  //       console.log(newVal);
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>