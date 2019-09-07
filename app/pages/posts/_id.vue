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
          <el-button
            v-if="isLiked"
            :disabled="!isLoggedIn"
            type="warning"
            round
            @click="unLike"
          >
            <span class="el-icon-star-on" />
          </el-button>
          <el-button
            v-else
            :disabled="!isLoggedIn"
            type="warning"
            round
            @click="like"
          >
            <span class="el-icon-star-off" />
            <span>{{ post.likes.lenght }}</span>
          </el-button>
        </p>
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
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { mapGetters, mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
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
        console.log(post)
        return post.id === this.$route.params.id
      })
    },
    isLiked() {
      if (!this.user) return false
      return this.post.likes.find(like => like.user_id === this.user.id)
    },
    ...mapGetters(['user', 'isLoggedIn']),
    ...mapGetters('posts', ['posts'])
  },
  async fetch({ route, store, redirect }) {
    const { id } = route.params
    const postData = store.getters['posts/posts'].find(post => post.id === id)

    if (!postData) {
      await store.dispatch('posts/fetchPost', { id })
    }
  },
  methods: {
    like() {
      if (!this.isLoggedIn) {
        return false
      }

      const likePayload = { user: this.user, post: this.post }

      this.addLikeToPost(cloneDeep(likePayload))
      this.addLikeLogToUser(cloneDeep(likePayload))
    },
    unLike() {
      if (!this.isLoggedIn) {
        return false
      }

      console.log('unLike!!!!')
    },
    ...mapActions(['addLikeLogToUser']),
    ...mapActions('posts', ['addLikeToPost'])
  }
}
</script>
