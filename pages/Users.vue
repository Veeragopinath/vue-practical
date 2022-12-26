<template>
  <div>
    <v-card class="mainPage mx-3 px-8 py-8">
      <v-row class="px-3 py-2">
        <v-col class="font-weight-bold heading-4"> Users </v-col>
        <v-spacer> </v-spacer>
        <v-btn class="blue white--text px-3 py-1" @click="userAddMode = true"
          >Create User</v-btn
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
          :items="listOfUsers"
          fixed-header
          :search="search"
          hide-default-footer
          :page.sync="page"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
        >
          <template #[`item.name`]="{ item }">
            <span class="number-style">
              {{ `${item.first_name} ${item.last_name}` }}
            </span>
          </template>
          <template #[`item.is_api_user`]="{ item }">
            <span>
              {{ item.is_api_user === true ? "Yes" : "No" }}
            </span>
          </template>
          <template #[`item.actions`]="{ item }">
            <div class="d-flex">
              <v-btn color="grey" class="px-3 py-0" @click="deleteUserDialog(item)">
                Delete
              </v-btn>
            </div>
          </template></v-data-table
        ></v-sheet
      >
      <div class="pt-1 pb-1">
        <v-pagination class="mt-2 mb-2" v-model="page" :length="pageCount">
        </v-pagination>
      </div>
      <v-dialog
        v-if="userAddMode"
        v-model="userAddMode"
        persistent
        max-width="600"
        :retain-focus="false"
        ><add-user @submitForm="addUser" @cancel="userAddMode = false"></add-user
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
import { userHeaders } from "~/helpers/tableHeaders.js";
import addUser from "~/components/addUser.vue";
import DeleteDialog from "~/components/deleteDialog.vue";
export default {
  components: { addUser, DeleteDialog },
  layouts: "default",
  data() {
    return {
      Headers: userHeaders,

      search: "",

      userAddMode: false,
      deleteDialog: false,
      userName: "",
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
    };
  },
  computed: {
    ...mapState({
      listOfUsers: (state) => state.listOfUsers,
    }),
  },
  mounted() {
    this.initialise();
  },
  methods: {
    ...mapActions(["getUserList", "createUser", "deleteUserFromUsers"]),
    initialise() {
      try {
        this.getUserList();
      } catch {
        alert("something went wrong");
      }
    },
    addUser(user) {
      this.createUser(user).then((res) => {
        this.userAddMode = false;
        if (res.status === 201) {
          alert("user created succesfully");
        } else {
          alert("something went wrong");
        }
      });
    },

    deleteUserDialog(item) {
      this.userName = item.name;
      this.deleteDialog = true;
      this.userToBeDeletedId = item.id;
    },
    deleteUser() {
      this.deleteUserFromUsers(this.userToBeDeletedId).then((res) => {
        if (res === 200) {
          alert("user deleted sucessfully");
        } else {
          alert("something went wrong");
        }
        this.userToBeDeletedId = "";
        this.deleteDialog = false;
        this.initialise();
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
