<template>
  <section class="container post-page">
    <el-card style="flex: 1;">
      <div slot="header" class="clearfix">
        <el-input v-model="formData.title" placeholder="タイトル入力" />
      </div>
      <div>
        <el-input
          v-model="formData.body"
          placeholder="本文を入力..."
          type="textarea"
          rows="15"
        />
      </div>
      <div class="text-right" style="margin-top: 16px;">
        <el-button type="primary" round @click="publish">
          <span class="el-icon-upload2" />
          <span>Publish</span>
        </el-button>
      </div>
    </el-card>
  </section>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['user'])
  },
  asyncData({ redirect, store }) {
    return {
      formData: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    async publish() {
      const payload = {
        user: this.user,
        ...this.formData
      }

      await this.publishPost(payload)
      this.$router.push('/posts')
    },
    ...mapActions('users', ['updateUser']),
    ...mapActions('posts', ['publishPost'])
  }
}
</script>

<style scoped>
.posts-page >>> .el-table__row {
  cursor: pointer;
}
</style>
