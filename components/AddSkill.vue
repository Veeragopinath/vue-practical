<template>
  <div>
    <v-form id="addIssueForm" ref="form">
      <v-card class="pa-6">
        <v-card-title class="text-h5 font-weight-bold">{{ title }}</v-card-title>
        <v-divider></v-divider>

        <v-row>
          <v-col md="6">
            <v-text-field
              v-model="form.name"
              outlined
              dense
              :rules="[rules.required]"
              label="Skill"
              required
            ></v-text-field>
          </v-col>

          <v-col md="6"
            ><v-select
              outlined
              dense
              class="mb-2"
              v-model="form.category_id"
              label="select category"
              :items="listOfCategories"
              item-text="name"
              item-value="id"
              :rules="[rules.required]"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="6">
            <v-text-field
              v-model="form.description"
              outlined
              dense
              :rules="[rules.required]"
              label="description"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-footer class="d-flex bg justify-end white">
          <v-btn class="mr-5 crudButtonPrimary white--text" depressed @click="saveSkill()"
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
      default: " ADD SKILL",
    },
  },
  data() {
    return {
      rules,
      form: {},
    };
  },
  computed: {
    ...mapState({
      listOfCategories: (state) => state.listOfCategories,
    }),
  },
  mounted() {
    this.initialise();
  },

  methods: {
    ...mapActions(["getCategoryList", "createskill"]),
    initialise() {
      this.getCategoryList();
    },
    saveSkill() {
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
