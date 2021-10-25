<template>
  <div class="post">
    <div>
      <div><strong>{{ post.id }}</strong></div>
      <div><strong>Post name: </strong>{{ post.title }}</div>
      <div><strong>Description: </strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button
          @click="$emit('removePost', post)"
      >
        Delete
      </my-button>

      <my-button
          @click="$router.push(`/posts/${post.id}`)"
      >
        Open
      </my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btns {
  display: flex;
}
</style>