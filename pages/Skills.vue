<template>
  <div>
    <v-card class="mainPage mx-3 px-8 pt-7 pb-4">
      <v-row class="px-3 py-2">
        <v-col class="font-weight-bold heading-4"> Skills </v-col>
        <v-spacer> </v-spacer>
        <v-btn class="blue white--text px-3 py-1" @click="skillAddMode = true"
          >Create Skill</v-btn
        >
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-3">
        <v-col md="5">
          <v-text-field
            v-model="search"
            label="search by text"
            outlined
            dense
            hint="Search by Name, Surname, email, username, phonenumber"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-sheet outlined class="mt-1">
        <v-data-table
          :headers="Headers"
          :items="listOfSkills"
          fixed-header
          :search="search"
          hide-default-footer
          :items-per-page="itemsPerPage"
          :page.sync="page"
          @page-count="pageCount = $event"
        >
          <template #[`item.number`]="{ item }">
            <span class="number-style">
              {{ listOfSkills.indexOf(item) + 1 }}
            </span>
          </template>
          <!-- <template #[`item.category_id`]="{ item }">
          <span> getCategoryById(item) </span>
        </template> -->
        </v-data-table></v-sheet
      >
      <div class="pt-1 pb-1">
        <v-pagination
          class="mt-2 mb-2"
          v-model="page"
          :total-visible="5"
          :length="pageCount"
        >
        </v-pagination>
      </div>
      <v-dialog
        v-if="skillAddMode"
        v-model="skillAddMode"
        persistent
        max-width="600"
        :retain-focus="false"
      >
        <add-skill @submitForm="addSkill" @cancel="skillAddMode = false"></add-skill
      ></v-dialog>
      <delete-dialog
        :show="deleteDialog"
        :userName="userName"
        @agree="deleteUser"
        @close="deleteDialog = false"
      ></delete-dialog>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { skillHeaders } from "~/helpers/tableHeaders.js";

import DeleteDialog from "~/components/deleteDialog.vue";
export default {
  components: { DeleteDialog },
  layouts: "default",
  data() {
    return {
      Headers: skillHeaders,

      search: "",
      pageCount: 10,
      skillAddMode: false,
      deleteDialog: false,
      userName: "",
      itemsPerPage: 5,
      page: 1,
    };
  },
  computed: {
    ...mapState({
      listOfSkills: (state) => state.listOfSkills,
      listOfCategories: (state) => state.listOfCategories,
    }),
  },
  mounted() {
    this.initialise();
  },
  methods: {
    ...mapActions(["getSkillList", "createSkill", "getCategoryList"]),
    initialise() {
      this.getSkillList();
    },
    addSkill(skill) {
      this.createSkill(skill).then((res) => {
        this.skillAddMode = false;
        if (res.status === 201) {
          alert("skill created succesfully");
        } else {
          alert("something went wrong");
        }
      });
    },
  },
};
</script>

<style>
.mainPage {
  background-color: #ffffff;
}
.crudButtonPrimary {
  background-color: #3497fa !important ;
  color: #ffffff !important;
}
</style>
