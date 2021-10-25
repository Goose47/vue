import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            })
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setPostsLoading(state, bool) {
            state.postsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setPagesTotal(state, pagesTotal) {
            state.pagesTotal = pagesTotal
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setPostsLoading', true)
                const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page
                    }
                });
                commit('setPosts', res.data)

                commit('setPagesTotal', Math.ceil(res.headers['x-total-count'] / state.limit))
            } catch (e) {
                alert('Error');
            } finally {
                commit('setPostsLoading', false)
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1)
                const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: state.limit,
                        _page: state.page
                    }
                });

                commit('setPosts', [...state.posts, ...res.data])

                commit('setPagesTotal', Math.ceil(res.headers['x-total-count'] / state.limit))
            } catch (e) {
                alert('Error');
            }
        },
    },
    namespaced: true
}