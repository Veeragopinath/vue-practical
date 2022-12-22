<template>
  <v-app>
    <v-card
      class="ma-auto rounded-xl pa-6"
      color="#F2F2F2"
      max-width="auto"
      elevation="0"
    >
      <v-card-title>
        <v-flex>
          <v-row class="d-flex justify-center"> TEKEGE</v-row>
        </v-flex>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>Sign in with your username and password:</p>
        <v-form ref="form">
          <v-text-field
            outline
            label="Username"
            type="text"
            :rules="[rules.required, rules.email]"
            v-model="username"
          ></v-text-field>
          <v-text-field
            outline
            hide-details
            label="Password"
            type="password"
            :rules="[rules.required]"
            v-model="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="info" @click="submittingLoginCredential"> Login </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import { rules } from "~/helpers/formValidation.js";
import { mapState, mapActions } from "vuex";
import { endpoints } from "~/constants/endpoints";

export default {
  auth: false,
  layout: "empty",
  data() {
    return {
      rules,
      requestUrl: "https://qa5.devaavaz.biz/361-api/v3/users/auth",
      username: "",
      password: "",
    };
  },

  methods: {
    ...mapActions(["userLogin"]),
    async submittingLoginCredential() {
      if (this.$refs.form.validate()) {
        this.$store.commit("setUserDetails", {
          username: this.username,
          password: this.password,
        });
        try {
          this.userLogin().then((res) => {
            
            if (res.status === "login") {
              this.$router.push(`/Skills`);
            }
          });
        } catch {
          alert("Please check the username/password");
        }
      } else {
        alert("Please correct the error(s) in the form to proceed further");
      }
    },
  },
};
</script>
<style>
/* html {
    overflow: hidden;
  } */
.form {
  width: 320px;
  margin: 0px 40px;
}

.login {
  margin-top: 20px;
}

#text {
  /* margin-top: 100px;
  margin-left: 56px;
  margin-bottom: 40px; */
  min-height: 30%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  font-size: 30px;
  margin-left: 40px;
}
/* 960px > < 1264px* */
@media screen and (min-width: 850px) and (max-width: 2000px) {
  .imgContent {
    display: flex;
    justify-content: center;
    height: 100vh;
  }
}
@media screen and (max-width: 850px) {
  .imgContent {
    display: none;
  }
}
</style>
