<template>
  <div>
    <q-btn @click="getav">Get Data</q-btn>
    <ul v-if="data">
      <li v-for="item in data" :key="item">{{ item.Name }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getav() {
      window.location.href = `https://login.salesforce.com/services/oauth2/authorize?client_id=3MVG9DREgiBqN9Wmlb9Hnby7AUEJb.iiEalt328_cNrVl6IHo8mzw1RpoyJWeypdCAZnm9zrb_7..azvf73l3&response_type=code&redirect_uri=https://zingy-gingersnap-8c57f7.netlify.app/#/login`;
    },
    async getData() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        const accessTokenResponse = await fetch(
          "https://login.salesforce.com/services/oauth2/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=authorization_code&client_id=3MVG9DREgiBqN9Wmlb9Hnby7AUEJb.iiEalt328_cNrVl6IHo8mzw1RpoyJWeypdCAZnm9zrb_7..azvf73l3&client_secret=62F4A81CC57C95EA82B3B824035D2ABCB732B53154E2F96A62B685FE66A985D6&redirect_uri=https://zingy-gingersnap-8c57f7.netlify.app/#/login&code=${code}`,
          }
        );

        const accessTokenData = await accessTokenResponse.json();
        const accessToken = accessTokenData.access_token;

        const apiResponse = await fetch("/api/services/data/v57.0/query", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: "SELECT Name FROM Account LIMIT 10",
          },
        });

        const apiData = await apiResponse.json();
        this.data = apiData.records;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
