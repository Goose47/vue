<template>
  <div class="page__wrapper">
    <div
        class="page"
        v-for="numPage in pagesTotal"
        :key="numPage"
        :class="{
            'current-page': numPage === page
          }"
        @click="changePage(numPage)"
    >
      {{ numPage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "my-pagination",
  props: {
    page: {
      type: Number,
      default: 1
    },
    pagesTotal: {
      type: Number
    }
  },

  methods: {
    changePage(numPage) {
      this.$emit('update:page', numPage)
    }
  }
}
</script>

<style scoped>
.page__wrapper {
  display: flex;
  margin: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 3px solid teal;
}
</style>