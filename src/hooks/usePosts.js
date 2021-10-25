import axios from "axios";
import {ref, onMounted} from 'vue';

export function usePosts(limit) {
    const posts = ref([])
    const pagesTotal = ref(0)
    const postsLoading = ref(true)
    const fetching = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _limit: limit,
                    _page: 1
                }
            });
            posts.value = res.data

            pagesTotal.value = Math.ceil(res.headers['x-total-count'] / limit)
        } catch (e) {
            alert('Error');
        } finally {
            postsLoading.value = false;
        }
    }

    onMounted(fetching)

    return {
        posts, postsLoading, pagesTotal
    }
}