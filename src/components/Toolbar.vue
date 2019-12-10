<template>
    <v-toolbar clipped-left color="primary" dark app>
      <v-toolbar-title class="headline font-italic">
         <router-link to="/" >
          <span style="color:white">Firebird Fitness</span>
         </router-link>
      </v-toolbar-title>

      <v-toolbar-items>

        <!-- <v-btn to="/generate" flat class="text-none">
          Generate Workout
        </v-btn> -->

      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
         <!--<v-btn active-class="none" to="/create" flat class="text-none ">-->
          <!--Create Workout-->
        <!--</v-btn>-->
        <!-- <v-btn active-class="none" to="/workouts" flat class="text-none font-weight-light">
          About
        </v-btn> -->
        <!-- {{authStatus}} -->
        <v-btn active-class="none" to="/workouts" flat class="text-none font-weight-light">
          <!-- <v-badge color="red">
            <template v-slot:badge>
              <span>New</span>
            </template> -->
           Workouts
          <!-- </v-badge> -->
        </v-btn>
        <!-- <v-btn flat @click="signOut()">Sign out</v-btn> -->
        <v-dialog
          v-model="loginDialog"
          width="500"
          v-if="!authStatus"
        >
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" active-class="none" flat class="text-none font-weight-light">
              Sign in
            </v-btn>
          </template>
          <Login v-on:close-dialog="closeLoginDialog"/>
        </v-dialog>
        
        <v-divider vertical></v-divider>

         <v-menu v-if="authStatus" offset-y>
           <template v-slot:activator="{ on }">
        <v-btn  v-on="on" flat><v-icon>account_circle</v-icon><v-icon>arrow_drop_down</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-tile
              to="/profile/user-information"
            >
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
               @click="signOut()"
            >
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
         </v-menu>

        <v-dialog
          v-model="registerDialog"
          width="500"
          v-if="!authStatus"
        >
          <template v-slot:activator="{ on }">
            <v-btn  v-on="on" active-class="none" flat class="text-none font-weight-light">
              Register
            </v-btn>
          </template>
          <Register v-on:close-dialog="closeRegisterDialog"/>
        </v-dialog>
        

      </v-toolbar-items>
        <span class="mr-2">v 1.1.0</span>
    </v-toolbar>
</template>

<script>
import Login from './auth/Login'
import Register from './auth/Register'
import {bus} from '../main'
export default {
    components: {
        Login,
        Register,
    },
    data(){
        return{
            loginDialog: false,
            registerDialog: false,
            message: ""
        }
    },
    methods: {
      showSnackbar(){
        bus.$emit('show-snackbar', this.message)
      },
        signOut(){
            let vm = this
            this.$store.dispatch('auth/userSignOut').then(function(){
              console.log("Sign out Success")
            }).catch(function(e){
              console.log(e)
              vm.message = "There was an issue with Singing out."
              vm.showSnackbar()
            }).finally(function(){
              vm.message = "You have successfully Signed out."
              vm.showSnackbar()
            })
        },
        closeLoginDialog(){
            this.loginDialog = false
        },
        closeRegisterDialog(){
            this.registerDialog = false
        },
    },
     computed:{
        authStatus(){
            return this.$store.getters['auth/getAuthStatus']
        }
    }
}
</script>

<style>

</style>
