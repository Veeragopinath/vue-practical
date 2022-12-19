<template>
  <v-app id="inspire">
    <v-navigation-drawer class="grey lighten-2" v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h4 font-weight-bold ml-7 ">
            TEKEGE
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item @click="navigation(item)" v-for="item in navItems" :key="item.title" link>
          <v-list-item-icon>
            <v-icon >{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class=" text-h6" >{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="grey lighten-2 ">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

  
      <v-spacer></v-spacer>

      
      <v-btn fab dark x-small color="blue" class="mr-6" v-bind="attrs" v-on="on">
        
          <v-icon dark> mdi-bell </v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <v-main app fluid>
     
  
       
        <v-container class="innerContainer grey lighten-2 mt-n2  pa-8" style="height: 100%">
          <v-container  style="max-height: 80vh">
            <Nuxt />
          </v-container>
        </v-container>
     
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    navItems: [
      { title: 'Users', path: '/Users', icon: 'mdi-view-dashboard' },
      { title: 'Skills',path: '/Skills', icon: 'mdi-image' },
    ],
   
  }),
  methods:{
    navigation(item){
      this.$router.push(item.path);
    }
  }
}
</script>
<style>

.outerContainer {
  background-color: white;
}
/* .innerContainer {
  background-color: red;
} */
</style>
