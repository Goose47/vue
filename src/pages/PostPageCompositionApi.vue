<template>
  <div>
    <h1>Posts Page</h1>

    <my-input
        v-model="searchQuery"
        placeholder="Search..."
    />

    <div class="app__btns">
<!--      <my-button-->
<!--          @click="showDialog"-->
<!--      >-->
<!--        Add post-->
<!--      </my-button>-->

      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>

    <my-dialog
        v-model:show="dialogVisible"
        :show="true"
    >
<!--      <post-form-->
<!--          @create="addPost"-->
<!--      />-->
    </my-dialog>

    <post-list
        v-if="!postsLoading"
        :posts="sortedAndSearchedPosts"
    />
<!--    @removePost="removePost"-->

    <h2 v-else>Posts are loading...</h2>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from "@/components/PostList";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return{
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'By title'},
        {value: 'body', name: 'By description'},
      ],
    }
  },
  setup(props) {
    const {posts, postsLoading, pagesTotal} = usePosts(10)
    const {sortedPosts, selectedSort} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts,
      postsLoading,
      pagesTotal,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
    }
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