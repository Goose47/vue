<template>
  <div>
    <h1>Posts Page</h1>

    <my-input
        v-model="searchQuery"
        placeholder="Search..."
    />

    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Add post
      </my-button>

      <my-select
          v-model="selectedSort"
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

    <!--    <my-pagination-->
    <!--      v-model:page="page"-->
    <!--      :pagesTotal="pagesTotal"-->
    <!--    />-->

  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from "@/components/PostList";
import axios from 'axios'

export default {
  components: {
    PostForm, PostList
  },
  data() {
    return{
      posts: [],
      dialogVisible: false,
      postsLoading: false,
      page: 1,
      limit: 10,
      pagesTotal: 0,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'By title'},
        {value: 'body', name: 'By description'},
      ],
      searchQuery: ''
    }
  },
  methods: {
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

    async fetchPosts() {
      try {
        this.postsLoading = true
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: 10,
                _page: this.page
          }
        });
        this.posts = res.data

        this.pagesTotal = Math.ceil(res.headers['x-total-count'] / this.limit)
      } catch (e) {
        alert('Error');
      } finally {
        this.postsLoading = false;
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: 10,
            _page: this.page
          }
        });

        this.posts = [...this.posts, ...res.data]

        this.pagesTotal = Math.ceil(res.headers['x-total-count'] / this.limit)
      } catch (e) {
        alert('Error');
      }
    },
  },

  mounted() {
    this.fetchPosts();
  },

  computed: {
    sortedPosts(newValue) {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },

    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },

  watch: {
    // page() {
    //   this.fetchPosts();
    // }
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