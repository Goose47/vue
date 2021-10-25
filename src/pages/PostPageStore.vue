<template>
  <div>
    <h1>Posts Page</h1>

    <my-input
        :modelValue="searchQuery"
        @update:modelValue="setSearchQuery"
        placeholder="Search..."
    />

    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Add post
      </my-button>

      <my-select
          :modelValue="selectedSort"
          @update:modelValue="setSelectedSort"
          :options="sortOptions"
      />
    </div>

    <my-dialog
        v-model:show="dialogVisible"
        :show="true"
    >
      <post-form
          @create="addPost"
      />
    </my-dialog>

    <post-list
        v-if="!postsLoading"
        :posts="sortedAndSearchedPosts"
        @removePost="removePost"
    />
    <h2 v-else>Posts are loading...</h2>
    <div v-intersection="loadMorePosts" class="observer"></div>

  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from "@/components/PostList";
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts'
    }),

    ...mapMutations({
       setPage: 'post/setPage',
       setSearchQuery: 'post/setSearchQuery',
       setSelectedSort: 'post/setSelectedSort'
    }),

    addPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },

    showDialog() {
      this.dialogVisible = true;
    },
  },

  mounted() {
    this.fetchPosts();
    this.setPage(0);
  },

  computed: {
    ...mapState({
      posts: state => state.post.posts,
      postsLoading: state => state.post.postsLoading,
      page: state => state.post.page,
      limit: state => state.post.limit,
      pagesTotal: state => state.post.pagesTotal,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPost',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },

  watch: {

  }
}

</script>

<style>

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 30px;
  background: green;
}
</style>