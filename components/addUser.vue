<template>
  <div>
    <v-form id="addIssueForm" ref="form">
      <v-card class="pa-6">
        <v-card-title class="text-h5 font-weight-bold">{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-row class="mt-2">
          <v-col md="4">
            <v-text-field
              v-model="form.first_name"
              outlined
              dense
              :rules="[rules.required, rules.name, rules.nameCase]"
              label="Name"
              required
            ></v-text-field>
          </v-col>
          <v-col md="4">
            <v-text-field
              v-model="form.last_name"
              outlined
              dense
              :rules="[rules.required, rules.name, rules.nameCase]"
              label="Sur Name"
              required
            ></v-text-field>
          </v-col>
          <v-col md="4">
            <v-text-field
              v-model.number="form.extension"
              outlined
              dense
              :rules="[rules.required, rules.number, rules.extension]"
              label="extension"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="7">
            <v-text-field
              v-model="form.login_id"
              outlined
              dense
              :rules="[rules.required, rules.email]"
              label="Login Id"
              required
            ></v-text-field>
          </v-col>
          <v-col md="5">
            <v-text-field
              v-model="form.password"
              outlined
              dense
              :rules="[rules.required]"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <v-combobox
              outlined
              dense
              class="mb-2"
              v-model="form.role"
              label="Role"
              :items="Roles"
              :rules="[rules.required]"
              required
            ></v-combobox>
          </v-col>
          <v-col md="6"
            ><v-text-field
              v-model="form.phone"
              outlined
              dense
              :rules="[rules.required, rules.mobile, rules.mobileLength]"
              label="Phone Number"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <v-combobox
              v-model="form.location"
              :items="locations"
              outlined
              dense
              :rules="[rules.required, rules.alphabet]"
              label="Location"
              required
            ></v-combobox>
          </v-col>
          <v-col md="6">
            <v-combobox
              v-model="form.timezone"
              outlined
              dense
              :items="timezones"
              :rules="[rules.required]"
              label="Time zone"
              required
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="12">
            <v-select
              v-model="form.user_skills"
              :items="listOfSkills"
              item-text="name"
              item-value="id"
              chips
              label="Select Skills"
              multiple
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <v-footer class="d-flex bg justify-end white">
          <v-btn class="mr-5 crudButtonPrimary white--text" depressed @click="saveUser()"
            >Save</v-btn
          >
          <v-btn color="grey lighten-1" class="mr-5 white--text" depressed @click="cancel"
            >Cancel</v-btn
          >
        </v-footer>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { rules } from "~/helpers/formValidation.js";
export default {
  props: {
    title: {
      type: String,
      default: " ADD USER",
    },
  },
  data() {
    return {
      rules,
      form: {},
      Roles: ["admin", "caller"],
      timezones: ["AMERICA/NEW_YORK"],
      locations: ["Default"],
    };
  },
  computed: {
    ...mapState({
      listOfSkills: (state) => state.listOfSkills,
    }),
  },
  mounted() {
    this.initialise();
  },

  methods: {
    ...mapActions(["getSkillList", "createUser"]),
    initialise() {
      this.getSkillList();
    },
    saveUser() {
      
      if (this.$refs.form.validate()) {
        this.$emit("submitForm", this.form);
        this.$refs.form.reset();
      }
    },
    cancel() {
      this.$refs.form.reset();
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss" scoped></style>
