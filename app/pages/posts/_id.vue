<template>
  <section class="container posts-page">
    <div class="flex: 1;">
      <el-card v-if="post">
        <div slot="header">
          <h2>{{ post.title }}</h2>
          <small>by {{ post.user.id }}</small>
        </div>
        <p>{{ post.body }}</p>
        <p class="text-right" style="margin-top: 16px;">
          {{ post.created_at | time }}
        </p>
      </el-card>
      <p style="margin-top: 16px;">
        <nuxt-link to="/">&lt; 投稿一覧へ戻る</nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from '@/plugins/moment'
export default {
  filters: {
    time(val) {
      return moment(val).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  computed: {
    post() {
      return this.posts.find(post => {
        return post.id === this.$route.params.id
      })
    },
    ...mapGetters('posts', ['posts'])
  },
  async fetch({ route, store, redirect }) {
    const { id } = route.params
    const postData = store.getters['posts/posts'].find(post => post.id === id)

    if (!postData) {
      try {
        await store.dispatch('posts/fetchPost', { id })

        if (!store.mapGetters['posts/posts'].find(post => post.id === id)) {
          throw new Error('post no found')
        }
      } catch (error) {
        redirect('/posts/')
      }
    }
  }
}
</script>
