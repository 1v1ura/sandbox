<template>
  <div>
    <el-row v-if="user">
      <el-col :span="6">
        <el-card class="text-center" style="margin-right: 16px">
          <div>
            <img
              src="https://placehold.it/150x150"
              style="width: 100%; margin-bottom: 16px; border-radius:2px"
              alt=""
            />
          </div>
          <h2>{{ user.id }}</h2>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div slot="header" class="clearfix">
            <span>{{ user.id }}さんの投稿</span>
          </div>
          <el-table :data="userPosts" style="width:100%" class="table">
            <el-table-column prop="title" label="タイトル" />
            <el-table-column prop="created_at" label="投稿日時" width="160" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from '@/plugins/moment'
export default {
  computed: {
    user() {
      const user = this.users.find(user => user.id === this.$route.params.id)
      if (!user) return null
      return { posts: [], ...JSON.parse(JSON.stringify(user)) }
    },
    userPosts() {
      return Object.entries(this.user.posts).map(([id, post]) => {
        post.created_at = moment(post.created_at).format('YYYY/MM/DD HH:mm:ss')
        return { id, ...post }
      })
    },
    ...mapGetters('users', ['users'])
  },
  async fetch({ store, route, error }) {
    const { id } = route.params
    try {
      await store.dispatch('users/fetchUser', { id })
    } catch {
      error({ statusCode: 404 })
    }
  }
}
</script>
