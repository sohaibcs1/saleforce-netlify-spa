const express = require("express");
const axios = require("axios");
const querystring = require("querystring");

const app = express();

app.get("/auth", async (req, res) => {
  try {
    // Get the authorization code from the query parameters
    const code = req.query.code;

    // Use the authorization code to request an access token
    const accessTokenResponse = await axios.post(
      "https://login.salesforce.com/services/oauth2/token",
      querystring.stringify({
        grant_type: "authorization_code",
        client_id:
          "3MVG9DREgiBqN9Wmlb9Hnby7AUEJb.iiEalt328_cNrVl6IHo8mzw1RpoyJWeypdCAZnm9zrb_7..azvf73l3",
        client_secret:
          "62F4A81CC57C95EA82B3B824035D2ABCB732B53154E2F96A62B685FE66A985D6",
        redirect_uri: "https://zingy-gingersnap-8c57f7.netlify.app/#/login",
        code: code,
      })
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

    res.json(apiResponse.data.records);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving data.");
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
