<template>
  <section class="container">
    <el-card style="flex: 1;">
      <div slot="header" class="clearfic">
        <span>ログイン</span>
      </div>
      <form>
        <div class="form-content">
          <span>ユーザー ID</span>
          <el-input v-model="formData.id" placeholder="" />
        </div>
        <div class="form-content">
          <el-checkbox v-model="isCreateMode">
            アカウントを新規作成する
          </el-checkbox>
        </div>
        <div class="text-right">
          <el-button type="primary" @click="handleClickSubmit">
            {{ buttonText }}
          </el-button>
        </div>
      </form>
    </el-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'universal-cookie'

export default {
  computed: {
    buttonText() {
      return this.isCreateMode ? '新規登録' : 'ログイン'
    },
    ...mapGetters(['user'])
  },
  asyncData() {
    return {
      isCreateMode: false,
      formData: {
        id: ''
      }
    }
  },
  methods: {
    async handleClickSubmit() {
      const cookies = new Cookies()

      if (this.isCreateMode) {
        try {
          await this.register({ ...this.formData })
          this.$notify({
            type: 'sucess',
            title: 'アカウント作成完了',
            message: `${this.formData.id}として登録しました`,
            postions: 'bottom-right',
            deration: 1000
          })
          cookies.set('user', JSON.stringify(this.user))
          this.$router.push('/posts/')
        } catch {
          this.$notify({
            title: 'アカウント作成失敗',
            message: `既に登録されているか、不正なユーザー ID です`,
            postions: 'bottom-right',
            deration: 1000
          })
        }
      } else {
        try {
          await this.login({ ...this.formData })
          this.$notify({
            type: 'sucess',
            title: 'ログイン成功',
            message: `${this.formData.id}としてログインしました`,
            postions: 'bottom-right',
            deration: 1000
          })
          cookies.set('user', JSON.stringify(this.user))
          this.$router.push('/posts/')
        } catch {
          this.$notify({
            title: 'ログイン失敗',
            message: `不正なユーザー ID です`,
            postions: 'bottom-right',
            deration: 1000
          })
        }
      }
    },
    ...mapActions(['login', 'register'])
  }
}
</script>

<style scoped>
.form-content {
  margin: 16px 0;
}
</style>
