<template>
  <section class="container posts-page">
    <el-card>
      <div slot="header" class="clearfix">
        <span>新規投稿</span>
      </div>
      <el-table :data="showPosts" style="width: 100%;" class="table">
        <el-table-column prop="title" label="タイトル"></el-table-column>
        <el-table-column
          prop="user.id"
          label="投稿者"
          witdh="180"
        ></el-table-column>
        <el-table-column
          prop="created_at"
          label="投稿日時"
          witdh="240"
        ></el-table-column>
      </el-table>
    </el-card>
  </section>
</template>

<script>
export default {
  computed: {
    showPosts() {
      return [
        {
          id: '001',
          title: 'How to development Nuxt.js Application',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ....',
          created_at: '2018/08/10 12:00:00',
          user: {
            id: 'potato4d'
          }
        },
        {
          id: '002',
          title: 'Development Nuxt.js Application to Heroku',
          body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ....',
          created_at: '2018/08/10 13:00:00',
          user: {
            id: 'potato4d'
          }
        }
      ]
    }
  }
}
</script>

<style scoped>
.posts-page >>> .el-table__row {
  cursor: pointer;
}
</style>
