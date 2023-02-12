<template>
  <q-page class="q-pa-md">
    <!-- outer div responsive -->
    <div
      class="fit row wrap justify-start items-start content-start q-col-gutter-none"
    >
      <!-- 2 col -->
      <div class="col-1 col-xs-1 q-col-gutter-none" style="overflow: hidden">
        <div class="text-blck q-gutter-xs" style="font-size: 2em">
          <!-- q-gutter-xs for margin between icons -->
          <div class="q-pa-xs q-gutter-sm">
            <div
              style="font-size: 43%; font-weight: bold"
              class="q-pa-xs no-margin"
            >
              <q-list>
                <q-item
                  group="somegroup"
                  label="Summary"
                  default-opened
                  header-class="text-black"
                >
                  <q-card class="bg-grey-1 color-grey-">
                    <q-card-section>
                      <div class="hoo" @click="ab()">
                        <q-icon name="people" size="40px" />
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <div class="hoo" @click="show_dialog = true">
                        <q-icon name="visibility" size="40px" />
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <div class="hoo" @click="week = true">
                        <q-icon name="settings" size="40px" />
                      </div>
                    </q-card-section>
                  </q-card>
                </q-item>

                <!-- <q-separator /> -->
              </q-list>
            </div>

            <!-- left pannel ENd       -->

            <!-- <q-dialog v-model="allRoute">
              <q-card style="width:2000px;max-width:3000px;">
                <q-card-section class="row items-center q-pb-none">
                  <q-space />
                  <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-h6 text-center">Search Route</div>
                  <searchAllroute></searchAllroute>

                </q-card-section>
              </q-card>
            </q-dialog> -->
          </div>
        </div>
      </div>
      <!-- 2 col END-->

      <!-- 10 col START-->
      <div class="col-10 col-xs-11 q-col-gutter-none" style="overflow: hidden">
        <!--  importent START-->
        <ul>
          {{
            records
          }}
          <li v-for="item in data" :key="item">
            {{ item.Name }}
          </li>
        </ul>
        <leads></leads>
        <!-- NOt importent END -->
      </div>
      <!-- 10 col END -->
    </div>

    <q-dialog v-model="show_dialog">
      <q-card class="text-center">
        <q-card-section>
          <div class="text-h6 text-center">WATCHERS</div>
        </q-card-section>

        <!-- Details Start -->

        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card text-center" style="width: 250px">
            <q-card-section>
              <div class="text-h6 bg-warning" outine>TITLE WITCHER</div>
            </q-card-section>
            <q-option-group
              v-model="group1"
              :options="options1"
              color="positive"
              type="toggle"
            />
            <q-card-actions vertical align="center">
              <p>
                We'll monitor the job title of your leads on linkedin and flag
                them for any change
              </p>
            </q-card-actions>
            <div style="font-size: 12px">
              <q-icon name="watch_later" /> Every 3 Hours
            </div>
          </q-card>
          <q-card class="my-card text-center" style="width: 250px">
            <q-card-section>
              <div class="text-h6 bg-warning" outine>COMPANY WITCHER</div>
            </q-card-section>
            <q-option-group
              v-model="group2"
              :options="options2"
              color="positive"
              type="toggle"
            />
            <q-card-actions vertical align="center">
              <p>
                We'll monitor the Company of leads at on linkedin, and flag them
                for any change
              </p>
            </q-card-actions>
            <div style="font-size: 12px">
              <q-icon name="watch_later" /> Every 3 Hours
            </div>
          </q-card>
        </div>
        <!-- Details END -->
        <q-card-actions align="center">
          <!-- <q-btn flat label="OK" color="primary" v-close-popup @click="addRow" ></q-btn> -->
          <div class="text-center">
            <q-btn
              outline
              dense
              color="grey-8"
              v-close-popup
              label="Close"
              @click="addRow"
            ></q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
// import API, { REAL_TIME } from 'src/api'
import leads from "src/components/leadsCom.vue";
import { ref } from "vue";
import axios from "axios";

export default {
  components: {
    leads,
  },

  data() {
    return {
      records: [],
      data: null,
      show_dialog: ref(false),
      group1: ref(["op1"]),
      group2: ref(["op1"]),
      options1: [
        {
          label: "ON",
          value: "op1",
        },
      ],
      options2: [
        {
          label: "ON",
          value: "op1",
        },
      ],
    };
  },
  mounted() {
    // REAL_TIME('update_frame', (res) => {
    //   this.priority1 = res;
    // });
    // API('home.getNumbers', {});
    // API("auth.createCam", { last_checked: "12:30 PM", full_name: "Michael Oddoye",email_address:"Michael.Oddoye@gmail.com",job_title:"Team Lead",company:"Salesforce"});
    this.getRecords();
  },

  methods: {
    async getRecords() {
      try {
        const response = await axios.get("/auth");
        this.records = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getData() {
      try {
        // Redirect the user to the authorization endpoint

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
        console.log(apiResponse + "kkkkkkk");
        this.data = apiResponse.data.records;
      } catch (error) {
        console.error(error);
      }
    },
    ab() {
      var conn = new jsforce.Connection();
      conn.login("test@winrate.io", "Michael123!", function (err, res) {
        if (err) {
          return console.error(err);
        }
        conn.query("SELECT Id, Name FROM Account", function (err, res) {
          if (err) {
            return console.error(err);
          }
          console.log(res);
        });
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.example-item
  height: 49%
  width: 49%
.example-itemImp
  height: 49%
  width: 49%
.hoo:hover
  color: #8AC7DB

  cursor: pointer

.hoo2:hover
  color: red
  cursor: pointer
</style>
