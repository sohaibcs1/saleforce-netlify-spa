<template>
  <div>
    <q-btn @click="getData">Get Data</q-btn>
    <ul v-if="data">
      <li v-for="item in data" :key="item">{{ item.Name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async getData() {
      try {
        // Redirect the user to the authorization endpoint
        window.location.href = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=3MVG9DREgiBqN9Wmlb9Hnby7AUEJb.iiEalt328_cNrVl6IHo8mzw1RpoyJWeypdCAZnm9zrb_7..azvf73l3&redirect_uri=https://zingy-gingersnap-8c57f7.netlify.app/#/login`;
        // https://login.salesforce.com/services/oauth2/authorize?client_id=client_id&redirect_uri=redirect_uri&response_type=code
        // https://login.salesforce.com/services/oauth2/authorize?client_id=3MVG9DREgiBqN9Wmlb9Hnby7AUNpQD9QxvcveUs7jKTZ8cuRwCe.ZRPqPhSWbUXkVXsASwuxH2kgsD7dGsxMz&redirect_uri=https://13ef-176-32-21-209.eu.ngrok.io/callback&response_type=code
        // Get the authorization code from the query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        // Use the authorization code to request an access token
        const accessTokenResponse = await axios.post(
          "https://login.salesforce.com/services/oauth2/token",
          {
            grant_type: "authorization_code",
            client_id:
              "3MVG9DREgiBqN9Wmlb9Hnby7AUEJb.iiEalt328_cNrVl6IHo8mzw1RpoyJWeypdCAZnm9zrb_7..azvf73l3",
            client_secret:
              "62F4A81CC57C95EA82B3B824035D2ABCB732B53154E2F96A62B685FE66A985D6",
            redirect_uri: "https://zingy-gingersnap-8c57f7.netlify.app/#/login",
            code: code,
          }
        );
        const accessToken = accessTokenResponse.data.access_token;
        const apiResponse = await axios.get(
          "https://UM8.salesforce.com/services/data/v57.0/query",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              q: "SELECT Name FROM Account LIMIT 10",
            },
          }
        );

        this.data = apiResponse.data.records;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
