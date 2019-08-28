<template>
  <div>
    <h1>ログインページ</h1>
    <p>
      <button type="button" @click="login">ログイン</button>
      <nuxt-link to="/">トップページへ戻る</nuxt-link>
    </p>
  </div>
</template>

<script>
import Cookies from "universal-cookie";
import moment from "moment";
export default {
  methods: {
    login() {
      const cookies = new Cookies();
      // const currentTime = new Date();
      // const expires = currentTime.getDate();

      // console.log();

      // console.log(expires);

      cookies.set("credential", "true", {
        path: "/",
        expires: new Date(
          moment()
            .add(10, "days")
            .format()
        )
      });
      this.$router.push("/");
    }
  }
};
</script>
