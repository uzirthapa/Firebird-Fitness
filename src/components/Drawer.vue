<template>
    <v-navigation-drawer :mini-variant="this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm" v-model="drawer" fixed stateless clipped app>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
            <v-list-tile-avatar>
                <v-avatar
                    color="grey lighten-4"
                    :size="35"
                    >
                    <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
                </v-avatar>
            </v-list-tile-avatar>
          <v-list-tile-title v-show="this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.lg" class="title">
            Profile
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile
        to="/profile/user-information"
        @click=""
      >
       <v-list-tile-action>
                <v-icon>account_circle</v-icon>
            </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
      to="/profile/favorites"
        @click=""
      >
       <v-list-tile-action>
                <v-icon>star</v-icon>
            </v-list-tile-action>
        <v-list-tile-content>
            <v-list-tile-title>Favorites</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data(){
        return {
            drawer: false
        }
    },
    watch:{
        $route (){
            console.log(this.$router.currentRoute.path.indexOf('/profile'))
            if (this.$router.currentRoute.path.indexOf('/profile') != -1){
                this.drawer = true
            } else {
                this.drawer = false
            }
          
        }
    },
}
</script>

<style>

</style>
