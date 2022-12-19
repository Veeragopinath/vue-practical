<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card style="border-radius: 8px" class="pa-4">
      <v-card-title>
        <span class="text-h6 text-center"
          >Are you sure want to delete <br />
          the user {{ userName }}</span
        >
      </v-card-title>
      <v-card-actions>
        <v-btn
          class="crudButtonPrimary px-8"
          style="border-radius: 8px"
          @click="$emit('agree')"
          >Yes</v-btn
        >
        <v-btn
          class="px-8"
          color="grey"
          style="border-radius: 8px"
          @click="$emit('close')"
          >No</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },

    userName: {
      type: String,
      require: 'user',
    },
  },
  computed: {
    dialog: {
      get() {
        return this.show
      },
      set(value) {
        return value
      },
    },
  },
}
</script>

<style scoped>
.v-card__title {
  justify-content: center;
}

.v-card__actions {
  justify-content: center;
  gap: 6px;
}
.deletebutton {
  background-color: blue !important;
  color: white;
}
</style>
