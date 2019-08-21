export default ({ $axios }) => {
  $axios.onRequest(config => {
    if (process.env.QIITA_TOKEN) {
      config.headers.common["Authorization"] = `Bearer ${
        process.env.QIITA_TOKEN
      }`;
    }

    return config;
  });
};
